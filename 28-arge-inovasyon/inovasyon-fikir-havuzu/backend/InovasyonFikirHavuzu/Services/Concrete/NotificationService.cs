using System.Collections.Generic;
using System.Threading.Tasks;
using InovasyonFikirHavuzu.Models;
using InovasyonFikirHavuzu.Repositories;
using InovasyonFikirHavuzu.Services.Abstract;

namespace InovasyonFikirHavuzu.Services.Concrete
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<IEnumerable<Notification>> GetByUserIdAsync(string userId)
        {
            return await _notificationRepository.GetByUserIdAsync(userId);
        }

        public async Task<Notification> AddAsync(Notification notification)
        {
            return await _notificationRepository.AddAsync(notification);
        }

        public async Task MarkAsReadAsync(int id)
        {
            await _notificationRepository.MarkAsReadAsync(id);
        }
    }
}