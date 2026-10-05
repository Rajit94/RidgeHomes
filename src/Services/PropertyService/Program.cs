using Microsoft.EntityFrameworkCore;
using RealEstate.PropertyService.Data;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers with JSON reference loop handling
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddOpenApi();

// EF Core: Use InMemory for instant zero-dependency execution or SQL Server if connection string is set
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<PropertyDbContext>(options =>
        options.UseSqlServer(connectionString));
}
else
{
    builder.Services.AddDbContext<PropertyDbContext>(options =>
        options.UseInMemoryDatabase("PropertyDb"));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p =>
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Ensure Database Seeded
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PropertyDbContext>();
    db.Database.EnsureCreated();
    PropertyDbContext.SeedData(db);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

// Friendly Root Status & Navigation Endpoint
app.MapGet("/", () => Results.Ok(new
{
    service = "PropertyService (Projects & Ventures)",
    port = 5010,
    status = "Online & Healthy",
    endpoints = new[]
    {
        "GET /api/properties/projects (List all ventures)",
        "GET /api/properties/projects/kshetra (Kshetra details)",
        "GET /api/properties/projects/tranquilvalley (Tranquil Valley details)"
    },
    gatewayUrl = "http://localhost:5000/api/properties/projects"
}));

app.MapControllers();

app.Run();
