using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.InquiryService.Data;
using RealEstate.InquiryService.Models;

namespace RealEstate.InquiryService.Controllers;

[ApiController]
[Route("api/inquiries")]
public class InquiriesController : ControllerBase
{
    private readonly InquiryDbContext _context;
    private readonly ILogger<InquiriesController> _logger;

    public InquiriesController(InquiryDbContext context, ILogger<InquiriesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Inquiry>>> GetInquiries([FromQuery] string? status)
    {
        var query = _context.Inquiries.AsQueryable();
        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(i => i.Status.ToLower() == status.ToLower());
        }

        var list = await query.OrderByDescending(i => i.CreatedAt).ToListAsync();
        return Ok(list);
    }

    [HttpPost("submit")]
    public async Task<ActionResult<Inquiry>> SubmitInquiry([FromBody] Inquiry inquiry)
    {
        if (string.IsNullOrWhiteSpace(inquiry.Name) || string.IsNullOrWhiteSpace(inquiry.Phone))
        {
            return BadRequest(new { message = "Name and Phone number are required." });
        }

        inquiry.CreatedAt = DateTime.UtcNow;
        inquiry.Status = "New";

        _context.Inquiries.Add(inquiry);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New real estate inquiry received from {Name} for project {Project}", inquiry.Name, inquiry.ProjectName);

        return Ok(new { success = true, message = "Thank you! Your site visit request has been received. Our sales executive will contact you shortly.", inquiryId = inquiry.Id });
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        var inquiry = await _context.Inquiries.FindAsync(id);
        if (inquiry == null) return NotFound();

        inquiry.Status = dto.Status;
        await _context.SaveChangesAsync();

        return Ok(inquiry);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInquiry(int id)
    {
        var inquiry = await _context.Inquiries.FindAsync(id);
        if (inquiry == null) return NotFound();

        _context.Inquiries.Remove(inquiry);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class UpdateStatusDto
{
    public string Status { get; set; } = "Contacted";
}
