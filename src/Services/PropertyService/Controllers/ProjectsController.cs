using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.PropertyService.Data;
using RealEstate.PropertyService.Models;

namespace RealEstate.PropertyService.Controllers;

[ApiController]
[Route("api/properties/projects")]
public class ProjectsController : ControllerBase
{
    private readonly PropertyDbContext _context;

    public ProjectsController(PropertyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects([FromQuery] string? status, [FromQuery] string? category)
    {
        var query = _context.Projects
            .Include(p => p.Stats)
            .Include(p => p.Amenities)
            .Include(p => p.LocationHighlights)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(p => p.Status.ToLower() == status.ToLower());
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(p => p.Category.ToLower().Contains(category.ToLower()));
        }

        var list = await query.OrderByDescending(p => p.Id).ToListAsync();
        return Ok(list);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<Project>> GetProjectBySlug(string slug)
    {
        var project = await _context.Projects
            .Include(p => p.Stats)
            .Include(p => p.Amenities)
            .Include(p => p.LocationHighlights)
            .FirstOrDefaultAsync(p => p.Slug.ToLower() == slug.ToLower());

        if (project == null)
        {
            return NotFound(new { message = $"Project '{slug}' not found" });
        }

        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
    {
        if (await _context.Projects.AnyAsync(p => p.Slug.ToLower() == project.Slug.ToLower()))
        {
            return BadRequest(new { message = "A project with this slug already exists." });
        }

        project.CreatedAt = DateTime.UtcNow;
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProjectBySlug), new { slug = project.Slug }, project);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
