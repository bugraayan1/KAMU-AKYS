using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Data;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

public class RatingService : IRatingService
{
    private readonly AppDbContext _context;
    public RatingService(AppDbContext context)
    {
        _context = context;
    }

    public async Task RateAsync(Rating rating, string userId)
    {
        var existing = await _context.Ratings.FirstOrDefaultAsync(r => r.IdeaId == rating.IdeaId && r.UserId == userId);
        if (existing != null)
        {
            existing.Value = rating.Value;
            existing.RatedAt = DateTime.Now;
        }
        else
        {
            rating.UserId = userId;
            rating.RatedAt = DateTime.Now;
            _context.Ratings.Add(rating);
        }
        await _context.SaveChangesAsync();
    }

    public async Task<(double average, int count)> GetAverageAsync(int ideaId)
    {
        var ratings = await _context.Ratings.Where(r => r.IdeaId == ideaId).ToListAsync();
        if (!ratings.Any()) return (0, 0);
        var average = ratings.Average(r => r.Value);
        var count = ratings.Count;
        return (average, count);
    }
} 