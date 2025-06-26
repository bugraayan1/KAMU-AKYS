using System;

namespace InovasyonFikirHavuzu.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int IdeaId { get; set; }
        public string UserId { get; set; }
        public int Value { get; set; } // 1-5 arası puan
        public DateTime RatedAt { get; set; }
    }
} 