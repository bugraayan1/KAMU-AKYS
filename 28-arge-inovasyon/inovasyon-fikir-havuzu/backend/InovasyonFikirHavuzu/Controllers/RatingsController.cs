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
    public class RatingsController : ControllerBase
    {
        private readonly IRatingService _ratingService;
        public RatingsController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpPost]
        public async Task<IActionResult> Rate([FromBody] Rating rating)
        {
            var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
            await _ratingService.RateAsync(rating, userId);
            return Ok();
        }

        [HttpGet("idea/{ideaId}/average")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAverage(int ideaId)
        {
            var (average, count) = await _ratingService.GetAverageAsync(ideaId);
            return Ok(new { average, count });
        }
    }
} 