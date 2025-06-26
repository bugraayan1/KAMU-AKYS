using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using InovasyonFikirHavuzu.Data;
using InovasyonFikirHavuzu.Services;

namespace InovasyonFikirHavuzu.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IReportService _reportService;
        public ReportsController(AppDbContext context, IReportService reportService)
        {
            _context = context;
            _reportService = reportService;
        }

        [HttpGet("most-rated")]
        [AllowAnonymous]
        public async Task<IActionResult> MostRated()
        {
            var result = await _reportService.MostRatedAsync();
            return Ok(result);
        }

        [HttpGet("most-commented")]
        [AllowAnonymous]
        public async Task<IActionResult> MostCommented()
        {
            var result = await _reportService.MostCommentedAsync();
            return Ok(result);
        }

        [HttpGet("latest")]
        [AllowAnonymous]
        public async Task<IActionResult> Latest()
        {
            var result = await _reportService.LatestAsync();
            return Ok(result);
        }

        [HttpGet("user-stats/{userName}")]
        public async Task<IActionResult> UserStats(string userName)
        {
            var result = await _reportService.UserStatsAsync(userName);
            return Ok(result);
        }

        [HttpGet("summary")]
        [AllowAnonymous]
        public async Task<IActionResult> Summary()
        {
            var result = await _reportService.SummaryAsync();
            return Ok(result);
        }
    }
} 