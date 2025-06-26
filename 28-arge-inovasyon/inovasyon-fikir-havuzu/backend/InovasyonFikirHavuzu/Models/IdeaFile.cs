using System;

namespace InovasyonFikirHavuzu.Models
{
    public class IdeaFile
    {
        public int Id { get; set; }
        public int IdeaId { get; set; }
        public string FileType { get; set; } // image, video, pdf
        public string FileUrl { get; set; }
        public DateTime UploadedAt { get; set; }
    }
} 