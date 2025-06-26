using System.Threading.Tasks;
using InovasyonFikirHavuzu.DTOs;
using InovasyonFikirHavuzu.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    public async Task<(bool Success, IEnumerable<string> Errors)> RegisterAsync(RegisterDto dto)
    {
        var userName = dto.Email.Split('@')[0];
        var user = new ApplicationUser {
            UserName = userName,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            PhoneNumber = dto.PhoneNumber,
            Email = dto.Email
        };
        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description));
        return (true, null);
    }

    public async Task<(bool Success, string Token)> LoginAsync(LoginDto dto)
    {
        ApplicationUser user = null;
        // Önce e-posta ile bulmayı dene
        if (!string.IsNullOrEmpty(dto.Email) && dto.Email.Contains("@"))
            user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            user = await _userManager.FindByNameAsync(dto.Email);
        if (user == null) return (false, null);
        var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
        if (!result.Succeeded) return (false, null);
        var token = GenerateJwtToken(user);
        return (true, token);
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
} 