namespace RealEstate.InquiryService.Models;

public class Inquiry
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string ProjectName { get; set; } = "General"; // e.g., Kshetra, Tranquil Valley
    public string PageUrl { get; set; } = string.Empty;
    public bool ConsentGiven { get; set; } = true;
    public string Status { get; set; } = "New"; // New, Contacted, FollowUp, Closed
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
