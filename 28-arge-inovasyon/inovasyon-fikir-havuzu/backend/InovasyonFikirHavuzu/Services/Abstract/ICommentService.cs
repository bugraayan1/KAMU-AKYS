using InovasyonFikirHavuzu.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICommentService
{
    Task<List<Comment>> GetByIdeaAsync(int ideaId);
    Task<Comment> AddAsync(Comment comment, string userId, string userName);
    Task<bool> DeleteAsync(int id, string userId);
} 