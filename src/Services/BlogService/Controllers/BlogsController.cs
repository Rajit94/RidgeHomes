using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.BlogService.Data;
using RealEstate.BlogService.Models;

namespace RealEstate.BlogService.Controllers;

[ApiController]
[Route("api/blogs")]
public class BlogsController : ControllerBase
{
    private readonly BlogDbContext _context;

    public BlogsController(BlogDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogs()
    {
        var list = await _context.BlogPosts
            .OrderByDescending(b => b.PublishedDate)
            .ToListAsync();
        return Ok(list);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPost>> GetBlogBySlug(string slug)
    {
        var blog = await _context.BlogPosts
            .FirstOrDefaultAsync(b => b.Slug.ToLower() == slug.ToLower());

        if (blog == null) return NotFound(new { message = $"Blog post '{slug}' not found" });

        return Ok(blog);
    }

    [HttpGet("team")]
    public async Task<ActionResult<IEnumerable<TeamMember>>> GetTeam()
    {
        var team = await _context.TeamMembers.ToListAsync();
        return Ok(team);
    }
}
