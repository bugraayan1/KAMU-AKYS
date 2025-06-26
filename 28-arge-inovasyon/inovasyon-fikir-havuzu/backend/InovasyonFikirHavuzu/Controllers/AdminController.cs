using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Services;

namespace InovasyonFikirHavuzu.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAdminService _adminService;
        public AdminController(UserManager<ApplicationUser> userManager, IAdminService adminService)
        {
            _userManager = userManager;
            _adminService = adminService;
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromQuery] string userName, [FromQuery] string role)
        {
            var result = await _adminService.AssignRoleAsync(userName, role);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok();
        }

        [HttpGet("user-roles/{userName}")]
        public async Task<IActionResult> GetUserRoles(string userName)
        {
            var roles = await _adminService.GetUserRolesAsync(userName);
            if (roles == null || roles.Count == 0) return NotFound();
            return Ok(roles);
        }
    }
} 