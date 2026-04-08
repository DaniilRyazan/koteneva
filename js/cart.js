function openOrderModal(){
const modal = document.getElementById("orderModal");
modal.style.display="block";
}

function closeOrderModal(){
const modal = document.getElementById("orderModal");
modal.style.display="none";
}

async function submitOrder(event){

event.preventDefault();

const userName=document.getElementById("user-name").value.trim();
const email=document.getElementById("email").value.trim();
const country=document.getElementById("country").value;
const city=document.getElementById("city").value;
const phone=document.getElementById("user-phone").value.trim();

const order={
name:userName,
email:email,
country:country,
city:city,
phone:phone
};

const response=await fetch("http://localhost:5058/api/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(order)

});

const result=await response.json();

document.getElementById("order-summary").innerHTML=`
<strong>Номер заявки:</strong> ${result.id}<br>
<strong>Имя:</strong> ${userName}<br>
<strong>Email:</strong> ${email}
`;

closeOrderModal();

document.getElementById("orderConfirmation").style.display="block";

}

function closeConfirmation(){
document.getElementById("orderConfirmation").style.display="none";
}