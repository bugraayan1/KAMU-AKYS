using InovasyonFikirHavuzu.Models;
using System.Threading.Tasks;

public interface IRatingService
{
    Task RateAsync(Rating rating, string userId);
    Task<(double average, int count)> GetAverageAsync(int ideaId);
} 