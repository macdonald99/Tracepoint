using Microsoft.EntityFrameworkCore;
using VenatorVeritatis.Models;

namespace VenatorVeritatis.Data
{
    public class VenatorVeritatisDbContext : DbContext
    {
        public VenatorVeritatisDbContext(DbContextOptions<VenatorVeritatisDbContext> options)
            : base(options)
        {
        }

        public DbSet<Case> Cases { get; set; }
        public DbSet<Suspect> Suspects { get; set; }
        public DbSet<Evidence> Evidence { get; set; }
        public DbSet<Investigation> Investigations { get; set; }
        public DbSet<InvestigationSuspect> InvestigationSuspects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Investigation>()
                .HasMany(i => i.Suspects)
                .WithMany(s => s.Investigations)
                .UsingEntity<InvestigationSuspect>(
                    link => link
                        .HasOne(x => x.Suspect)
                        .WithMany()
                        .HasForeignKey(x => x.SuspectId)
                        .OnDelete(DeleteBehavior.NoAction),
                    link => link
                        .HasOne(x => x.Investigation)
                        .WithMany()
                        .HasForeignKey(x => x.InvestigationId)
                        .OnDelete(DeleteBehavior.Cascade),
                    link =>
                    {
                        link.HasKey(x => new { x.InvestigationId, x.SuspectId });
                        link.ToTable("InvestigationSuspects");
                    });
        }
    }
}