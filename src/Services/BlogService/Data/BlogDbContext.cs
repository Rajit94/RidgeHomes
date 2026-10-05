using Microsoft.EntityFrameworkCore;
using RealEstate.BlogService.Models;

namespace RealEstate.BlogService.Data;

public class BlogDbContext : DbContext
{
    public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }

    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<TeamMember> TeamMembers => Set<TeamMember>();

    public static void SeedData(BlogDbContext context)
    {
        if (context.BlogPosts.Any()) return;

        context.BlogPosts.AddRange(
            new BlogPost
            {
                Slug = "iso-certified",
                Title = "Ridge Homes is Proudly ISO 9001:2015 Certified",
                Excerpt = "Ridge Homes is proudly ISO certified, which proves our commitment to quality construction, efficient processes, and exceptional customer service.",
                Content = "Ridge Homes is proudly ISO certified, which proves our commitment to quality construction, efficient processes, and exceptional customer service. Choose Ridge Homes - where peace of mind is your standard. Our ISO 9001:2015 certification reflects rigorous international benchmarks in real estate development, customer happiness, and structural integrity.",
                ImageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
                PublishedDate = DateTime.UtcNow.AddMonths(-1)
            },
            new BlogPost
            {
                Slug = "tranquil-valley-launch",
                Title = "Tranquil Valley: A Nature-Centric Community in Maheshwaram",
                Excerpt = "Welcome to Tranquil Valley, a nature-centric Premium Villa Plots venture in Maheshwaram, reflecting our commitment to sustainable development.",
                Content = "Welcome to Tranquil Valley, a nature-centric Premium Villa Plots in Maheshwaram. This project resembles our commitment to innovation, quality, and sustainable development. With its serene surroundings, tranquil valley promises a lifestyle of peace and convenience near Hyderabad's growth corridors.",
                ImageUrl = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
                PublishedDate = DateTime.UtcNow.AddDays(-15)
            },
            new BlogPost
            {
                Slug = "kshetra-theme-villas",
                Title = "Kshetra: Uplifting Traditions with Nature, Culture, and Art",
                Excerpt = "Welcome to Kshetra, a theme-based villa project in Shankarpally restoring ancient practices in its surroundings and amenities.",
                Content = "Welcome to Kshetra, a theme based villa project in Shankarpally. Kshetra is about uplifting the traditions with the theme - Nature, Culture, and Art. This theme based project restores ancient practices in its surroundings and amenities. With its rich cultural heritage, Kshetra promises a lifestyle of tradition and comfort.",
                ImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                PublishedDate = DateTime.UtcNow.AddDays(-5)
            }
        );

        context.TeamMembers.AddRange(
            new TeamMember
            {
                Name = "Srinivas Raju Vetukuri",
                Role = "Managing Partner",
                Bio = "Srinivas is the Managing Partner of Ridge with over 30 years of experience in the industry. With a proven track record of success and a deep understanding of the real estate market, Srinivas has established himself as a leading figure in the industry. Whether you are a first-time homebuyer or an experienced investor, Srinivas and his team have the expertise to help you achieve your goals.",
                ImageUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
                SocialLinkedIn = "https://linkedin.com"
            },
            new TeamMember
            {
                Name = "Kalyan Maddimsetti",
                Role = "AGM of Sales",
                Bio = "Mr. Kalyan has 9 years of experience in sales management, with a proven track record of driving revenue growth, building high-performing teams, and developing strategic client relationships across diverse markets.",
                ImageUrl = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
                SocialLinkedIn = "https://linkedin.com"
            },
            new TeamMember
            {
                Name = "Hema Penmetsa",
                Role = "Operations Manager",
                Bio = "Hema as the Operations Manager, is responsible for ensuring the seamless execution of our projects and daily business activities, process optimization, and maintaining high standards of quality and service.",
                ImageUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
                SocialLinkedIn = "https://linkedin.com"
            },
            new TeamMember
            {
                Name = "Siva Rama Raju Vegesna",
                Role = "Head of Legal",
                Bio = "Siva Rama Raju brings deep expertise in property law, regulatory compliance, contract negotiation, and RERA due diligence, ensuring all projects conform to sound industry guidelines.",
                ImageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
                SocialLinkedIn = "https://linkedin.com"
            },
            new TeamMember
            {
                Name = "Yamini",
                Role = "Human Resources",
                Bio = "Yamini contributes effectively to building an engaged, values-driven workforce aligning with the company's continuous growth.",
                ImageUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
                SocialLinkedIn = "https://linkedin.com"
            }
        );

        context.SaveChanges();
    }
}
