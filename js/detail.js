let products = JSON.parse(localStorage.getItem("products"))

let indexOfProduct = JSON.parse(localStorage.getItem("productIndex"));

let product = products[indexOfProduct];

document.querySelector("#img").src = product.image;
document.querySelector("#name").textContent = product.name;
document.querySelector("#description").textContent = product.description;
document.querySelector("#comment").textContent = product.comment;
document.querySelector("#type").textContent = product.type;
document.querySelector("#price").textContent = product.price + product.currency;