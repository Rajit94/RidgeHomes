using Microsoft.EntityFrameworkCore;
using RealEstate.InquiryService.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<InquiryDbContext>(options =>
        options.UseSqlServer(connectionString));
}
else
{
    builder.Services.AddDbContext<InquiryDbContext>(options =>
        options.UseInMemoryDatabase("InquiryDb"));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p =>
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<InquiryDbContext>();
    db.Database.EnsureCreated();
    InquiryDbContext.SeedData(db);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");

// Friendly Root Status & Navigation Endpoint
app.MapGet("/", () => Results.Ok(new
{
    service = "InquiryService (Leads & Site Visits)",
    port = 5020,
    status = "Online & Healthy",
    endpoints = new[]
    {
        "GET  /api/inquiries (View all customer leads)",
        "POST /api/inquiries/submit (Submit new site visit request)"
    },
    gatewayUrl = "http://localhost:5000/api/inquiries"
}));

app.MapControllers();

app.Run();
