using InovasyonFikirHavuzu.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class ReportService : IReportService
{
    private readonly AppDbContext _context;
    public ReportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<object>> MostRatedAsync()
    {
        var ideas = await _context.Ideas
            .Select(i => new {
                Idea = i,
                AvgRating = _context.Ratings.Where(r => r.IdeaId == i.Id).Any() ? _context.Ratings.Where(r => r.IdeaId == i.Id).Average(r => r.Value) : 0,
                RatingCount = _context.Ratings.Count(r => r.IdeaId == i.Id)
            })
            .OrderByDescending(x => x.AvgRating)
            .ThenByDescending(x => x.RatingCount)
            .Take(10)
            .ToListAsync();
        return ideas.Cast<object>().ToList();
    }

    public async Task<List<object>> MostCommentedAsync()
    {
        var ideas = await _context.Ideas
            .Select(i => new {
                Idea = i,
                CommentCount = _context.Comments.Count(c => c.IdeaId == i.Id)
            })
            .OrderByDescending(x => x.CommentCount)
            .Take(10)
            .ToListAsync();
        return ideas.Cast<object>().ToList();
    }

    public async Task<List<object>> LatestAsync()
    {
        var ideas = await _context.Ideas.OrderByDescending(i => i.CreatedAt).Take(10).ToListAsync();
        return ideas.Cast<object>().ToList();
    }

    public async Task<object> UserStatsAsync(string userName)
    {
        var total = await _context.Ideas.CountAsync(i => i.CreatedBy == userName);
        var approved = await _context.Ideas.CountAsync(i => i.CreatedBy == userName && i.Status == "Approved");
        var rejected = await _context.Ideas.CountAsync(i => i.CreatedBy == userName && i.Status == "Rejected");
        return new { total, approved, rejected };
    }

    public async Task<object> SummaryAsync()
    {
        var total = await _context.Ideas.CountAsync();
        var approved = await _context.Ideas.CountAsync(i => i.Status == "Approved");
        var rejected = await _context.Ideas.CountAsync(i => i.Status == "Rejected");
        var pending = await _context.Ideas.CountAsync(i => i.Status == "Pending");
        return new { total, approved, rejected, pending };
    }
} 