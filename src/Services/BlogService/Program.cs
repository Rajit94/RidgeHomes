using Microsoft.EntityFrameworkCore;
using RealEstate.BlogService.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<BlogDbContext>(options =>
        options.UseSqlServer(connectionString));
}
else
{
    builder.Services.AddDbContext<BlogDbContext>(options =>
        options.UseInMemoryDatabase("BlogDb"));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p =>
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BlogDbContext>();
    db.Database.EnsureCreated();
    BlogDbContext.SeedData(db);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

// Friendly Root Status & Navigation Endpoint
app.MapGet("/", () => Results.Ok(new
{
    service = "BlogService (News & Team)",
    port = 5030,
    status = "Online & Healthy",
    endpoints = new[]
    {
        "GET /api/blogs (List all real estate blogs)",
        "GET /api/blogs/team (List leadership team bios)"
    },
    gatewayUrl = "http://localhost:5000/api/blogs"
}));

app.MapControllers();

app.Run();
