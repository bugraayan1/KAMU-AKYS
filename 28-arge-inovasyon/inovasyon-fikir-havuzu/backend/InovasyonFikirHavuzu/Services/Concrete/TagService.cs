using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class TagService : ITagService
{
    private readonly AppDbContext _context;
    public TagService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Tag>> GetAllAsync()
    {
        return await _context.Tags.ToListAsync();
    }

    public async Task<Tag> AddAsync(Tag tag)
    {
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();
        return tag;
    }

    public async Task<Tag> UpdateAsync(int id, Tag tag)
    {
        var t = await _context.Tags.FirstOrDefaultAsync(x => x.Id == id);
        if (t == null) return null;
        t.Name = tag.Name;
        await _context.SaveChangesAsync();
        return t;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var t = await _context.Tags.FirstOrDefaultAsync(x => x.Id == id);
        if (t == null) return false;
        _context.Tags.Remove(t);
        await _context.SaveChangesAsync();
        return true;
    }
} 