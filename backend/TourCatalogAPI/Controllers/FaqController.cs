using Microsoft.AspNetCore.Mvc;

namespace TourCatalogAPI.Controllers
{
    [ApiController]
    [Route("api/faq")]
    public class FaqController : ControllerBase
    {
        [HttpGet("{topic}")]
        public IActionResult GetFaq(string topic)
        {
            var faqData = new Dictionary<string, List<string>>()
            {
                {
                    "booking", new List<string>()
                    {
                        "Выберите тур в каталоге.",
                        "Нажмите кнопку 'Забронировать'.",
                        "Заполните форму заявки.",
                        "Подтвердите бронирование."
                    }
                },

                {
                    "documents", new List<string>()
                    {
                        "Заграничный паспорт.",
                        "Виза (если требуется).",
                        "Медицинская страховка."
                    }
                },

                {
                    "payment", new List<string>()
                    {
                        "Оплата производится банковской картой.",
                        "Возможна оплата частями.",
                        "После оплаты на почту приходит подтверждение."
                    }
                }
            };

            if (!faqData.ContainsKey(topic))
            {
                return NotFound();
            }

            return Ok(faqData[topic]);
        }
    }
}