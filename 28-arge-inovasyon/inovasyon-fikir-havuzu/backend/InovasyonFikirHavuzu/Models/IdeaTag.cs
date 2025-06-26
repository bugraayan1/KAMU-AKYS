namespace InovasyonFikirHavuzu.Models
{
    public class IdeaTag
    {
        public int IdeaId { get; set; }
        public Idea Idea { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
} 