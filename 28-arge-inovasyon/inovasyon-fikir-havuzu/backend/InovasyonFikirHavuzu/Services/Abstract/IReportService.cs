using System.Collections.Generic;
using System.Threading.Tasks;

public interface IReportService
{
    Task<List<object>> MostRatedAsync();
    Task<List<object>> MostCommentedAsync();
    Task<List<object>> LatestAsync();
    Task<object> UserStatsAsync(string userName);
    Task<object> SummaryAsync();
} 