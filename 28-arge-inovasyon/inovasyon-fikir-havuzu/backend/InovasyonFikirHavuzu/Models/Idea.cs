using System;
using System.Collections.Generic;

namespace InovasyonFikirHavuzu.Models
{
    public class Idea
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } // Pending, Approved, Rejected
        public string? AdminComment { get; set; }
        public int? CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<IdeaTag> IdeaTags { get; set; }
    }
} 