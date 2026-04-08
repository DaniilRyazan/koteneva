let allTours = [];

async function loadTours(){

const response = await fetch("http://localhost:5058/api/tours");

allTours = await response.json();

renderTours(allTours);

}

function getImage(city){

const images = {

"Пекин":"/img/pekin_1.png",
"Москва":"/img/moscow_1.png",
"Стамбул":"/img/stambul_1.png",
"Стокгольм":"/img/stokgolm_1.png",
"Амстердам":"/img/amsterdam_1.png",
"Дубай":"/img/dubai_1.png"

};

return images[city] || "/img/pekin_1.png";

}

function renderTours(tours){

const container = document.getElementById("tours-container");

container.innerHTML="";

tours.forEach(tour=>{

const card=document.createElement("div");

card.className="tour";

card.style.cursor="pointer";

card.innerHTML=`

<img src="/img/${tour.imageUrl}">

<h2 class="country">${tour.country}</h2>

<p>${tour.description}</p>

<p>Цена: ${tour.price} рублей</p>
<p>Город: ${tour.city}</p>
<p>Длительность тура: ${tour.duration} месяцев</p>

`;

card.onclick=()=>{

window.location.href="/pages/tour.html?id="+tour.id;

};

container.appendChild(card);

});

}

function applyFilters(){

const duration=document.querySelector("input[name='duration']").value;

const price=document.querySelector("select[name='price']").value;

const countries=[];

document.querySelectorAll("input[name='country']:checked")
.forEach(c=>countries.push(c.id));

let filtered=allTours.filter(tour=>{

if(duration>0 && tour.duration>duration) return false;

if(countries.length>0 && !countries.includes(tour.country)) return false;

if(price==="low" && tour.price>1000000) return false;

if(price==="average" && (tour.price<1000000 || tour.price>2000000)) return false;

if(price==="high" && tour.price<2000000) return false;

return true;

});

renderTours(filtered);

}

document.addEventListener("DOMContentLoaded",()=>{

loadTours();

document.querySelector("input[name='duration']")
.addEventListener("input",applyFilters);

document.querySelector("select[name='price']")
.addEventListener("change",applyFilters);

document.querySelectorAll("input[name='country']")
.forEach(c=>c.addEventListener("change",applyFilters));


document.getElementById("add-tour-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const tour = {
    name: document.getElementById("name").value,
    country: document.getElementById("country").value,
    city: document.getElementById("city").value,
    duration: parseInt(document.getElementById("duration").value),
    price: parseInt(document.getElementById("price").value),
    description: document.getElementById("description").value,
    imageUrl: document.getElementById("imageUrl").value
    };

    const response = await fetch("http://localhost:5058/api/tours", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tour)
    });

    const result = await response.json();

    alert("Тур добавлен!");

    // сразу обновляем список
    loadTours();
});
});