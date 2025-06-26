using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using InovasyonFikirHavuzu.Models;

namespace InovasyonFikirHavuzu.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Idea> Ideas { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<IdeaFile> IdeaFiles { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<IdeaTag> IdeaTags { get; set; }
        public DbSet<IdeaFollow> IdeaFollows { get; set; }
        public DbSet<IdeaFavorite> IdeaFavorites { get; set; }
        public DbSet<IdeaHistory> IdeaHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdeaTag>()
                .HasKey(it => new { it.IdeaId, it.TagId });
            modelBuilder.Entity<IdeaTag>()
                .HasOne(it => it.Idea)
                .WithMany(i => i.IdeaTags)
                .HasForeignKey(it => it.IdeaId);
            modelBuilder.Entity<IdeaTag>()
                .HasOne(it => it.Tag)
                .WithMany()
                .HasForeignKey(it => it.TagId);
        }
    }
} 