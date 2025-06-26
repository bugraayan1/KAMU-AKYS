using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Data;

namespace InovasyonFikirHavuzu.Repositories
{
    public class IdeaRepository : IIdeaRepository
    {
        private readonly AppDbContext _context;
        public IdeaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Idea>> GetAllAsync()
        {
            return await _context.Ideas.ToListAsync();
        }

        public async Task<Idea> GetByIdAsync(int id)
        {
            return await _context.Ideas.FindAsync(id);
        }

        public async Task<Idea> AddAsync(Idea idea)
        {
            _context.Ideas.Add(idea);
            await _context.SaveChangesAsync();
            return idea;
        }

        public async Task<Idea> UpdateAsync(Idea idea)
        {
            _context.Ideas.Update(idea);
            await _context.SaveChangesAsync();
            return idea;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var idea = await _context.Ideas.FindAsync(id);
            if (idea == null) return false;
            _context.Ideas.Remove(idea);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Idea>> GetByStatusAsync(string status)
        {
            return await _context.Ideas.Where(i => i.Status == status).ToListAsync();
        }
    }
} 