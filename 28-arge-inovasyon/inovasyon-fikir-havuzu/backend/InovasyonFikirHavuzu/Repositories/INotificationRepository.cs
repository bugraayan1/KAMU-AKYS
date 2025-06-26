using System.Collections.Generic;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;

namespace InovasyonFikirHavuzu.Repositories
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetByUserIdAsync(string userId);
        Task<Notification> AddAsync(Notification notification);
        Task MarkAsReadAsync(int id);
    }
} 