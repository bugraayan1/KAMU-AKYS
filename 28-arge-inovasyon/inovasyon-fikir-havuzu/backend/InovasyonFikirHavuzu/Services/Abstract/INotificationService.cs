using System.Collections.Generic;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;

namespace InovasyonFikirHavuzu.Services.Abstract
{
    public interface INotificationService
    {
        Task<IEnumerable<Notification>> GetByUserIdAsync(string userId);
        Task<Notification> AddAsync(Notification notification);
        Task MarkAsReadAsync(int id);
    }
}