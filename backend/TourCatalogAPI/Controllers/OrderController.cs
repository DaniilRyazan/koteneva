using Microsoft.AspNetCore.Mvc;

namespace TourCatalogAPI.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {
        static int orderCounter = 1;

        [HttpPost]
        public IActionResult CreateOrder([FromBody] object order)
        {
            var result = new
            {
                id = orderCounter++,
                message = "Заявка успешно создана"
            };

            return Ok(result);
        }
    }
}