using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using InovasyonFikirHavuzu.Models;

public class AdminService : IAdminService
{
    private readonly UserManager<ApplicationUser> _userManager;
    public AdminService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IdentityResult> AssignRoleAsync(string userName, string role)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = "Kullanıcı bulunamadı." });
        return await _userManager.AddToRoleAsync(user, role);
    }

    public async Task<IList<string>> GetUserRolesAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null) return new List<string>();
        return await _userManager.GetRolesAsync(user);
    }
} 