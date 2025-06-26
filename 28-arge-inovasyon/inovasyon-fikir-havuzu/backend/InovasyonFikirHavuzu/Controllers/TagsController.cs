using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Data;
using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Services;

namespace InovasyonFikirHavuzu.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TagsController : ControllerBase
    {
        private readonly ITagService _tagService;
        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var tags = await _tagService.GetAllAsync();
            return Ok(tags);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Tag tag)
        {
            var added = await _tagService.AddAsync(tag);
            return Ok(added);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Tag tag)
        {
            var updated = await _tagService.UpdateAsync(id, tag);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _tagService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
} 