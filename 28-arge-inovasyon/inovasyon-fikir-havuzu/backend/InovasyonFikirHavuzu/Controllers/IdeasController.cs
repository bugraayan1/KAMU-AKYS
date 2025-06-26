using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;
using InovasyonFikirHavuzu.Data;
using InovasyonFikirHavuzu.Services.Abstract;
using InovasyonFikirHavuzu.Services.Concrete;

namespace InovasyonFikirHavuzu.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdeasController : ControllerBase
    {
        private readonly IIdeaService _ideaService;
        private readonly INotificationService _notificationService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly EmailService _emailService;
        private readonly AppDbContext _context;
        public IdeasController(IIdeaService ideaService, INotificationService notificationService, UserManager<ApplicationUser> userManager, EmailService emailService, AppDbContext context)
        {
            _ideaService = ideaService;
            _notificationService = notificationService;
            _userManager = userManager;
            _emailService = emailService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Idea>>> GetAll()
        {
            var ideas = await _ideaService.GetAllAsync();
            return Ok(ideas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Idea>> GetById(int id)
        {
            var idea = await _ideaService.GetByIdAsync(id);
            if (idea == null) return NotFound();
            return Ok(idea);
        }

        [HttpPost]
        public async Task<ActionResult<Idea>> Create(Idea idea)
        {
            var created = await _ideaService.AddAsync(idea);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Idea>> Update(int id, Idea idea)
        {
            if (id != idea.Id) return BadRequest();
            // Eski sürümü kaydet
            var old = await _ideaService.GetByIdAsync(id);
            if (old != null)
            {
                _context.IdeaHistories.Add(new IdeaHistory
                {
                    IdeaId = old.Id,
                    Title = old.Title,
                    Description = old.Description,
                    Status = old.Status,
                    AdminComment = old.AdminComment,
                    CategoryId = old.CategoryId,
                    ChangedAt = DateTime.Now,
                    ChangedBy = User.Identity?.Name ?? "system"
                });
                await _context.SaveChangesAsync();
            }
            var updated = await _ideaService.UpdateAsync(idea);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _ideaService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpGet("by-status/{status}")]
        public async Task<ActionResult<IEnumerable<Idea>>> GetByStatus(string status)
        {
            var ideas = await _ideaService.GetByStatusAsync(status);
            return Ok(ideas);
        }

        [HttpPut("{id}/approve")]
        public async Task<ActionResult<Idea>> Approve(int id, [FromBody] string? comment)
        {
            var idea = await _ideaService.GetByIdAsync(id);
            if (idea == null) return NotFound();
            idea.Status = "Approved";
            idea.AdminComment = comment;
            var updated = await _ideaService.UpdateAsync(idea);

            // Bildirim ve e-posta gönder
            var user = await _userManager.FindByNameAsync(idea.CreatedBy);
            if (user != null)
            {
                await _notificationService.AddAsync(new Notification
                {
                    UserId = user.Id,
                    Message = $"Fikriniz onaylandı: {idea.Title}",
                    CreatedAt = DateTime.Now,
                    IsRead = false
                });
                await _emailService.SendEmailAsync(user.Email, "Fikriniz Onaylandı", $"Sayın {user.UserName},\n\n'{idea.Title}' başlıklı fikriniz onaylandı.\n\nYönetici Yorumu: {comment}");
            }
            return Ok(updated);
        }

        [HttpPut("{id}/reject")]
        public async Task<ActionResult<Idea>> Reject(int id, [FromBody] string? comment)
        {
            var idea = await _ideaService.GetByIdAsync(id);
            if (idea == null) return NotFound();
            idea.Status = "Rejected";
            idea.AdminComment = comment;
            var updated = await _ideaService.UpdateAsync(idea);

            // Bildirim ve e-posta gönder
            var user = await _userManager.FindByNameAsync(idea.CreatedBy);
            if (user != null)
            {
                await _notificationService.AddAsync(new Notification
                {
                    UserId = user.Id,
                    Message = $"Fikriniz reddedildi: {idea.Title}",
                    CreatedAt = DateTime.Now,
                    IsRead = false
                });
                await _emailService.SendEmailAsync(user.Email, "Fikriniz Reddedildi", $"Sayın {user.UserName},\n\n'{idea.Title}' başlıklı fikriniz reddedildi.\n\nYönetici Yorumu: {comment}");
            }
            return Ok(updated);
        }

        [HttpPost("{id}/upload-file")]
        public async Task<IActionResult> UploadFile(int id, IFormFile file)
        {
            var idea = await _ideaService.GetByIdAsync(id);
            if (idea == null) return NotFound();
            if (file == null || file.Length == 0) return BadRequest("Dosya seçilmedi.");

            var allowedTypes = new[] { "image/jpeg", "image/png", "video/mp4", "application/pdf" };
            if (!allowedTypes.Contains(file.ContentType))
                return BadRequest("Sadece jpg, png, mp4 ve pdf dosyalarına izin verilir.");
            if (file.Length > 10 * 1024 * 1024) // 10 MB
                return BadRequest("Maksimum dosya boyutu 10 MB olmalı.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);
            var ext = Path.GetExtension(file.FileName);
            var fileName = $"idea_{id}_{Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var fileType = file.ContentType.Contains("image") ? "image" : file.ContentType.Contains("video") ? "video" : "pdf";
            var ideaFile = new IdeaFile
            {
                IdeaId = id,
                FileType = fileType,
                FileUrl = $"/Uploads/{fileName}",
                UploadedAt = DateTime.Now
            };
            _context.IdeaFiles.Add(ideaFile);
            await _context.SaveChangesAsync();
            return Ok(ideaFile);
        }

        [HttpGet("{id}/files")]
        public async Task<IActionResult> GetFiles(int id)
        {
            var files = _context.IdeaFiles.Where(f => f.IdeaId == id).OrderByDescending(f => f.UploadedAt).ToList();
            return Ok(files);
        }

        [HttpGet("search")]
        public IActionResult Search(
            [FromQuery] string? keyword,
            [FromQuery] int? categoryId,
            [FromQuery] int? tagId,
            [FromQuery] string? status,
            [FromQuery] string? createdBy,
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to,
            [FromQuery] double? minRating)
        {
            var ideas = _context.Ideas.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
                ideas = ideas.Where(i => i.Title.Contains(keyword) || i.Description.Contains(keyword));
            if (categoryId.HasValue)
                ideas = ideas.Where(i => i.CategoryId == categoryId);
            if (!string.IsNullOrEmpty(status))
                ideas = ideas.Where(i => i.Status == status);
            if (!string.IsNullOrEmpty(createdBy))
                ideas = ideas.Where(i => i.CreatedBy == createdBy);
            if (from.HasValue)
                ideas = ideas.Where(i => i.CreatedAt >= from);
            if (to.HasValue)
                ideas = ideas.Where(i => i.CreatedAt <= to);
            if (tagId.HasValue)
            {
                var ideaIds = _context.IdeaTags.Where(it => it.TagId == tagId).Select(it => it.IdeaId).ToList();
                ideas = ideas.Where(i => ideaIds.Contains(i.Id));
            }
            var result = ideas.ToList();
            if (minRating.HasValue)
            {
                var filtered = new List<Idea>();
                foreach (var idea in result)
                {
                    var ratings = _context.Ratings.Where(r => r.IdeaId == idea.Id).ToList();
                    if (ratings.Any() && ratings.Average(r => r.Value) >= minRating)
                        filtered.Add(idea);
                }
                return Ok(filtered);
            }
            return Ok(result);
        }

        [HttpPost("{id}/follow")]
        public async Task<IActionResult> Follow(int id)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (_context.IdeaFollows.Any(f => f.IdeaId == id && f.UserId == userId))
                return BadRequest("Zaten takip ediyorsunuz.");
            _context.IdeaFollows.Add(new IdeaFollow { IdeaId = id, UserId = userId, FollowedAt = DateTime.Now });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}/unfollow")]
        public async Task<IActionResult> Unfollow(int id)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            var follow = _context.IdeaFollows.FirstOrDefault(f => f.IdeaId == id && f.UserId == userId);
            if (follow == null) return NotFound();
            _context.IdeaFollows.Remove(follow);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("my-follows")]
        public IActionResult MyFollows()
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            var ideas = _context.IdeaFollows.Where(f => f.UserId == userId).Select(f => f.Idea).ToList();
            return Ok(ideas);
        }

        [HttpPost("{id}/favorite")]
        public async Task<IActionResult> Favorite(int id)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (_context.IdeaFavorites.Any(f => f.IdeaId == id && f.UserId == userId))
                return BadRequest("Zaten favorilerinizde.");
            _context.IdeaFavorites.Add(new IdeaFavorite { IdeaId = id, UserId = userId, FavoritedAt = DateTime.Now });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}/unfavorite")]
        public async Task<IActionResult> Unfavorite(int id)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            var fav = _context.IdeaFavorites.FirstOrDefault(f => f.IdeaId == id && f.UserId == userId);
            if (fav == null) return NotFound();
            _context.IdeaFavorites.Remove(fav);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("my-favorites")]
        public IActionResult MyFavorites()
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            var ideas = _context.IdeaFavorites.Where(f => f.UserId == userId).Select(f => f.Idea).ToList();
            return Ok(ideas);
        }

        [HttpGet("{id}/history")]
        public IActionResult GetHistory(int id)
        {
            var history = _context.IdeaHistories.Where(h => h.IdeaId == id).OrderByDescending(h => h.ChangedAt).ToList();
            return Ok(history);
        }
    }
} 