namespace RealEstate.BlogService.Models;

public class BlogPost
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Author { get; set; } = "Ridge Homes Editorial";
    public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
}

public class TeamMember
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string SocialLinkedIn { get; set; } = "#";
}
