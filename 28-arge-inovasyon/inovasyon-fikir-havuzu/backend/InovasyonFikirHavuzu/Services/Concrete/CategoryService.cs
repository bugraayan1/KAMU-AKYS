using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;
    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category> AddAsync(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<Category> UpdateAsync(int id, Category category)
    {
        var cat = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (cat == null) return null;
        cat.Name = category.Name;
        await _context.SaveChangesAsync();
        return cat;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var cat = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (cat == null) return false;
        _context.Categories.Remove(cat);
        await _context.SaveChangesAsync();
        return true;
    }
} 