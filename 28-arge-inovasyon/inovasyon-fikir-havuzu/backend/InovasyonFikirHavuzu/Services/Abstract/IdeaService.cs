using System.Collections.Generic;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Repositories;

namespace InovasyonFikirHavuzu.Services.Abstract
{
    public class IdeaService : IIdeaService
    {
        private readonly IIdeaRepository _ideaRepository;
        public IdeaService(IIdeaRepository ideaRepository)
        {
            _ideaRepository = ideaRepository;
        }

        public async Task<IEnumerable<Idea>> GetAllAsync()
        {
            return await _ideaRepository.GetAllAsync();
        }

        public async Task<Idea> GetByIdAsync(int id)
        {
            return await _ideaRepository.GetByIdAsync(id);
        }

        public async Task<Idea> AddAsync(Idea idea)
        {
            return await _ideaRepository.AddAsync(idea);
        }

        public async Task<Idea> UpdateAsync(Idea idea)
        {
            return await _ideaRepository.UpdateAsync(idea);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _ideaRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Idea>> GetByStatusAsync(string status)
        {
            return await _ideaRepository.GetByStatusAsync(status);
        }
    }
}