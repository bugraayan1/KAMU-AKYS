using System.Collections.Generic;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;

namespace InovasyonFikirHavuzu.Services.Abstract
{
    public interface IIdeaService
    {
        Task<IEnumerable<Idea>> GetAllAsync();
        Task<Idea> GetByIdAsync(int id);
        Task<Idea> AddAsync(Idea idea);
        Task<Idea> UpdateAsync(Idea idea);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Idea>> GetByStatusAsync(string status);
    }
}