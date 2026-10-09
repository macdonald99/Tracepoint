using Microsoft.EntityFrameworkCore;
using VenatorVeritatis.Data;

var builder = WebApplication.CreateBuilder(args);

// Register CORS service for local development
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// Register DbContext
builder.Services.AddDbContext<VenatorVeritatisDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Enable CORS middleware (MUST be placed before UseAuthorization and MapControllers)
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();