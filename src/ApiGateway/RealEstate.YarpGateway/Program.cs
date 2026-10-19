var builder = WebApplication.CreateBuilder(args);

// Configure YARP Reverse Proxy from appsettings.json
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Enable CORS for Frontend Client (Vite port 5173 or any dev origin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Health check endpoint for Gateway
app.MapGet("/", () => Results.Ok(new
{
    gateway = "RealEstate YARP API Gateway",
    status = "Healthy",
    services = new[]
    {
        new { service = "PropertyService", route = "/api/properties/projects", target = "http://localhost:5010" },
        new { service = "InquiryService", route = "/api/inquiries", target = "http://localhost:5020" },
        new { service = "BlogService", route = "/api/blogs", target = "http://localhost:5030" }
    }
}));

app.MapReverseProxy();

app.Run();
