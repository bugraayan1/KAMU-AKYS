using System;

namespace InovasyonFikirHavuzu.Models
{
    public class IdeaFavorite
    {
        public int Id { get; set; }
        public int IdeaId { get; set; }
        public string UserId { get; set; }
        public DateTime FavoritedAt { get; set; }
        public Idea Idea { get; set; }
    }
} 