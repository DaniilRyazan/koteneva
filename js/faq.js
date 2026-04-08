async function loadFaq(topic, element){

const response = await fetch(`http://localhost:5058/api/faq/${topic}`);
const data = await response.json();

const answerBlock = element.nextElementSibling;

answerBlock.innerHTML = "";

data.forEach(p=>{
const line = document.createElement("p");
line.textContent = p;
answerBlock.appendChild(line);
});

answerBlock.style.display="block";

}