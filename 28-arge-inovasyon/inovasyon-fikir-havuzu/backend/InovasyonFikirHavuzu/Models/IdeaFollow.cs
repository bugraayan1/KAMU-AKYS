using System;

namespace InovasyonFikirHavuzu.Models
{
    public class IdeaFollow
    {
        public int Id { get; set; }
        public int IdeaId { get; set; }
        public string UserId { get; set; }
        public DateTime FollowedAt { get; set; }
        public Idea Idea { get; set; }
    }
} 