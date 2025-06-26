using InovasyonFikirHavuzu.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync();
    Task<Category> AddAsync(Category category);
    Task<Category> UpdateAsync(int id, Category category);
    Task<bool> DeleteAsync(int id);
} 