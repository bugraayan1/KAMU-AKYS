using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

public class CommentService : ICommentService
{
    private readonly AppDbContext _context;
    public CommentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Comment>> GetByIdeaAsync(int ideaId)
    {
        return await _context.Comments.Where(c => c.IdeaId == ideaId).OrderByDescending(c => c.CreatedAt).ToListAsync();
    }

    public async Task<Comment> AddAsync(Comment comment, string userId, string userName)
    {
        comment.UserId = userId;
        comment.UserName = userName;
        comment.CreatedAt = DateTime.Now;
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();
        return comment;
    }

    public async Task<bool> DeleteAsync(int id, string userId)
    {
        var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
        if (comment == null) return false;
        if (comment.UserId != userId) return false;
        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
        return true;
    }
} 