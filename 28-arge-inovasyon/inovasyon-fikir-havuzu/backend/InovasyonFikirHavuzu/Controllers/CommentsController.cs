using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Data;
using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Services;

namespace InovasyonFikirHavuzu.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("idea/{ideaId}")]
        public async Task<IActionResult> GetByIdea(int ideaId)
        {
            var comments = await _commentService.GetByIdeaAsync(ideaId);
            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Comment comment)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            var userName = User.Identity.Name;
            var added = await _commentService.AddAsync(comment, userId, userName);
            return Ok(added);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            var result = await _commentService.DeleteAsync(id, userId);
            if (!result) return NotFound();
            return NoContent();
        }
    }
} 