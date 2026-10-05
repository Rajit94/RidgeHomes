namespace RealEstate.PropertyService.Models;

public class Project
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Category { get; set; } = "Plots"; // Plots, Villas, Apartments
    public string Status { get; set; } = "Ongoing"; // Ongoing, Completed, Upcoming
    public string Location { get; set; } = string.Empty;
    public string ReraNumber { get; set; } = string.Empty;
    public string ApprovalNumber { get; set; } = string.Empty; // DTCP or HMDA LP No
    public string Description { get; set; } = string.Empty;
    public string DetailedStory { get; set; } = string.Empty;
    public string HeroImage { get; set; } = string.Empty;
    public string ThumbnailImage { get; set; } = string.Empty;
    public string BrochureUrl { get; set; } = "#";
    public string GoogleMapsEmbedUrl { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<ProjectStat> Stats { get; set; } = new();
    public List<Amenity> Amenities { get; set; } = new();
    public List<LocationHighlight> LocationHighlights { get; set; } = new();
}

public class ProjectStat
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public class Amenity
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}

public class LocationHighlight
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
}
