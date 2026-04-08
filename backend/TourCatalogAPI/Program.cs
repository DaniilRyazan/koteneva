using Microsoft.EntityFrameworkCore;
using TourCatalogAPI.Data;

var builder = WebApplication.CreateBuilder(args);
// Убедитесь, что приложение слушает на правильном порту
builder.WebHost.UseUrls("http://0.0.0.0:5058");

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();