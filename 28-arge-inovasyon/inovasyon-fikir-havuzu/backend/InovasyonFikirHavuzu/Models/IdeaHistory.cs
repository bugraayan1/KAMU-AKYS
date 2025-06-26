using System;

namespace InovasyonFikirHavuzu.Models
{
    public class IdeaHistory
    {
        public int Id { get; set; }
        public int IdeaId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string? AdminComment { get; set; }
        public int? CategoryId { get; set; }
        public DateTime ChangedAt { get; set; }
        public string ChangedBy { get; set; }
    }
} 