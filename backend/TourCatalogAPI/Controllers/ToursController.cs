using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TourCatalogAPI.Data;
using TourCatalogAPI.Models;

namespace TourCatalogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToursController(AppDbContext context)
        {
            _context = context;
        }

        // Получить все туры
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tour>>> GetTours()
        {
            var tours = await _context.Tours.ToListAsync();
            return Ok(tours);
        }

        // Получить тур по ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Tour>> GetTour(int id)
        {
            var tour = await _context.Tours.FindAsync(id);

            if (tour == null)
            {
                return NotFound();
            }

            return Ok(tour);
        }
        [HttpPost]
        public async Task<ActionResult<Tour>> CreateTour([FromBody] Tour tour)
        {
            if (tour == null)
            {
                return BadRequest();
            }

            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();

            return Ok(tour);
        }
    }
}