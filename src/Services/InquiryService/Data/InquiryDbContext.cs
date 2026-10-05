using Microsoft.EntityFrameworkCore;
using RealEstate.InquiryService.Models;

namespace RealEstate.InquiryService.Data;

public class InquiryDbContext : DbContext
{
    public InquiryDbContext(DbContextOptions<InquiryDbContext> options) : base(options) { }

    public DbSet<Inquiry> Inquiries => Set<Inquiry>();

    public static void SeedData(InquiryDbContext context)
    {
        if (context.Inquiries.Any()) return;

        context.Inquiries.AddRange(
            new Inquiry
            {
                Name = "Rajesh Sharma",
                Email = "rajesh.sharma@example.com",
                Phone = "+91 98765 43210",
                Message = "Interested in Phase 1 villa plot at Kshetra. Please arrange a weekend site visit.",
                ProjectName = "Kshetra",
                Status = "New",
                CreatedAt = DateTime.UtcNow.AddHours(-3)
            },
            new Inquiry
            {
                Name = "Priya Varma",
                Email = "priya.varma@example.com",
                Phone = "+91 98480 12345",
                Message = "Looking for 200 sq. yard plot near Maheshwaram. Send price list.",
                ProjectName = "Tranquil Valley",
                Status = "Contacted",
                CreatedAt = DateTime.UtcNow.AddDays(-1)
            }
        );
        context.SaveChanges();
    }
}
