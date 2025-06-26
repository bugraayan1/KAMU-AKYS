using InovasyonFikirHavuzu.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ITagService
{
    Task<List<Tag>> GetAllAsync();
    Task<Tag> AddAsync(Tag tag);
    Task<Tag> UpdateAsync(int id, Tag tag);
    Task<bool> DeleteAsync(int id);
} 