using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using InovasyonFikirHavuzu.Models;

public interface IAdminService
{
    Task<IdentityResult> AssignRoleAsync(string userName, string role);
    Task<IList<string>> GetUserRolesAsync(string userName);
} 