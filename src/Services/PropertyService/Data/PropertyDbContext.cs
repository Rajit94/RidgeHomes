using Microsoft.EntityFrameworkCore;
using RealEstate.PropertyService.Models;

namespace RealEstate.PropertyService.Data;

public class PropertyDbContext : DbContext
{
    public PropertyDbContext(DbContextOptions<PropertyDbContext> options) : base(options) { }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectStat> ProjectStats => Set<ProjectStat>();
    public DbSet<Amenity> Amenities => Set<Amenity>();
    public DbSet<LocationHighlight> LocationHighlights => Set<LocationHighlight>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Project>()
            .HasIndex(p => p.Slug)
            .IsUnique();
    }

    public static void SeedData(PropertyDbContext context)
    {
        if (context.Projects.Any()) return;

        var kshetra = new Project
        {
            Id = 1,
            Slug = "kshetra",
            Title = "Kshetra",
            Tagline = "A community where nature-centric traditions make a grand comeback.",
            Category = "Theme Based Villas & Plots",
            Status = "Ongoing",
            Location = "Shankarpally, Hyderabad",
            ReraNumber = "P01100009098",
            ApprovalNumber = "DTCP LP No:- 135/2024/H",
            Description = "Kshetra is not just another residential area, but an amazing place enrooted to glorious traditions and facilitated with ultramodern amenities. You can choose from different plot ranges, individual homes and magnificent villas.",
            DetailedStory = "When you follow nature, happiness follows you. Nature had always been central to life for our ancestors. Festivities like Sankranthi and Jatara are celebrated authentically in community squares. Enjoy tranquil eco-ponds, lotus blooms, and landscaped parks.",
            HeroImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
            ThumbnailImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
            BrochureUrl = "/brochures/kshetra-brochure.pdf",
            GoogleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.6703459260993!2d78.016058!3d17.523243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbfdfd97e2f72b%3A0x4d35edd7977c529f!2sKshetra%20Farm%20Project!5e0!3m2!1sen!2sin!4v1668416729788",
            CreatedAt = DateTime.UtcNow
        };

        var tranquilValley = new Project
        {
            Id = 2,
            Slug = "tranquilvalley",
            Title = "Tranquil Valley",
            Tagline = "Nature-centric premium villa plots in Maheshwaram.",
            Category = "Open Plots & Villas",
            Status = "Ongoing",
            Location = "Maheshwaram, Hyderabad",
            ReraNumber = "P02400005589",
            ApprovalNumber = "HMDA LP No:- 000038/LO/PLG/HMDA/2023",
            Description = "Welcome to Tranquil Valley, a nature-centric premium villa plot development in Maheshwaram. Designed with sustainable development and serenity in mind, offering peaceful living with unmatched city connectivity.",
            DetailedStory = "With serene surroundings, Tranquil Valley promises a lifestyle of peace and convenience where vision transforms into reality, enriching residential communities near the international airport corridor.",
            HeroImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
            ThumbnailImage = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
            BrochureUrl = "/brochures/tranquil-valley.pdf",
            GoogleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.824982631024!2d78.4312!3d17.1352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDA4JzA2LjciTiA3OMKwMjUnNTIuMyJF!5e0!3m2!1sen!2sin!4v1668416729789",
            CreatedAt = DateTime.UtcNow
        };

        var sunriseCity = new Project
        {
            Id = 3,
            Slug = "sunrisecity",
            Title = "Sunrise City",
            Tagline = "Premium HMDA approved layout in Sultanpur.",
            Category = "Plots",
            Status = "Completed",
            Location = "Sultanpur, Hyderabad",
            ReraNumber = "P01100005222",
            ApprovalNumber = "HMDA LP No:- 000186/LO/PLG/HMDA/2022",
            Description = "A master-planned residential layout with 100% clear title, prime blacktop roads, underground cabling, and landscaped avenues near the Outer Ring Road.",
            DetailedStory = "Completed on schedule with full HMDA approvals. Over 100 families have invested in this flourishing green corridor with high appreciation potential.",
            HeroImage = "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80",
            ThumbnailImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
            BrochureUrl = "/brochures/sunrise-city.pdf",
            GoogleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2!2d78.3!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v1668416729790",
            CreatedAt = DateTime.UtcNow.AddMonths(-6)
        };

        var springCity = new Project
        {
            Id = 4,
            Slug = "springcity",
            Title = "Spring City",
            Tagline = "Delivered excellence in Hyderabad residential property market.",
            Category = "Residential Community",
            Status = "Completed",
            Location = "Hyderabad West Corridor",
            ReraNumber = "P02400001234",
            ApprovalNumber = "HMDA Approved",
            Description = "The property market in Hyderabad has been growing by leaps and bounds, making Spring City an ideal delivered destination for home buyers and investors.",
            DetailedStory = "A fully completed gated venture featuring avenue plantation, 24/7 security, grand arch entrance, and serene living surroundings.",
            HeroImage = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
            ThumbnailImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
            BrochureUrl = "/brochures/spring-city.pdf",
            GoogleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2!2d78.3!3d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v1668416729791",
            CreatedAt = DateTime.UtcNow.AddYears(-1)
        };

        context.Projects.AddRange(kshetra, tranquilValley, sunriseCity, springCity);
        context.SaveChanges();

        // Add Stats for Kshetra
        context.ProjectStats.AddRange(
            new ProjectStat { ProjectId = 1, Label = "Total Estimated Area", Value = "150 Acres" },
            new ProjectStat { ProjectId = 1, Label = "Phase 1 Area", Value = "31 Acres" },
            new ProjectStat { ProjectId = 1, Label = "Estimated Resort Area", Value = "4 Acres" },
            new ProjectStat { ProjectId = 1, Label = "Plot Units for Phase 1", Value = "151" },
            new ProjectStat { ProjectId = 1, Label = "Green Park Area", Value = "3 Acres" }
        );

        // Add Amenities for Kshetra
        context.Amenities.AddRange(
            new Amenity { ProjectId = 1, Title = "Cement Concrete (CC) Roads", ImageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
            new Amenity { ProjectId = 1, Title = "Paver Footpath Area", ImageUrl = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80" },
            new Amenity { ProjectId = 1, Title = "Rainwater Harvesting Pits", ImageUrl = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80" },
            new Amenity { ProjectId = 1, Title = "Traditional Mandua Homes", ImageUrl = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80" },
            new Amenity { ProjectId = 1, Title = "Central Park & Children Play Area", ImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
            new Amenity { ProjectId = 1, Title = "Modern LED Street Lights", ImageUrl = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80" }
        );

        // Add Location Highlights for Kshetra
        context.LocationHighlights.AddRange(
            new LocationHighlight { ProjectId = 1, Title = "20 Mins Drive to Shankarpally" },
            new LocationHighlight { ProjectId = 1, Title = "20 Mins Drive to Telangana Mobility Valley Cluster" },
            new LocationHighlight { ProjectId = 1, Title = "20 Mins Drive to Sangareddy" },
            new LocationHighlight { ProjectId = 1, Title = "40 Mins Drive to NEOPOLIS" },
            new LocationHighlight { ProjectId = 1, Title = "45 Mins Drive to Financial District" },
            new LocationHighlight { ProjectId = 1, Title = "50 Mins Drive to Hitech City" },
            new LocationHighlight { ProjectId = 1, Title = "1 Hour Drive to Rajiv Gandhi International Airport" },
            new LocationHighlight { ProjectId = 1, Title = "Walkable distance to Regional Ring Road (RRR)" }
        );

        context.SaveChanges();
    }
}
