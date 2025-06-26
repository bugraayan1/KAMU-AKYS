using System.Threading.Tasks;
using InovasyonFikirHavuzu.DTOs;
using InovasyonFikirHavuzu.Models;

public interface IAuthService
{
    Task<(bool Success, IEnumerable<string> Errors)> RegisterAsync(RegisterDto dto);
    Task<(bool Success, string Token)> LoginAsync(LoginDto dto);
} 