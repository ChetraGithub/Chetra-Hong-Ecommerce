// DATA ==================================================================
let userData = [];
let products = JSON.parse(localStorage.getItem("products"));

let indexOfProduct = JSON.parse(localStorage.getItem("productIndex"));

let product = products[indexOfProduct];


let rating = document.querySelector("#rating");
// Display details products -----------------------------------------------
document.querySelector("#img").src = product.image;
document.querySelector("#name").textContent = product.name;
document.querySelector("#description").textContent = product.description;
document.querySelector("#comment").textContent = product.comment;
document.querySelector("#type").textContent = product.type;
document.querySelector("#price").textContent = product.price + product.currency;

// FUNCTIONS ==============================================================
// Save data user ---------------------------------------------------------
function saveData() {
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Load data user ---------------------------------------------------------
function loadData() {
    let localDataUser = JSON.parse(localStorage.getItem("userData"));
    if (localDataUser != null) {
        userData = localDataUser;
    }
}

// Get user add cart ------------------------------------------------------
function getProduct() {
    userData.push(product);
    saveData();
    my_cart.textContent = "MY CART   + " + userData.length;
    document.querySelector("#tolal-cart").style.color = "blue";
    document.querySelector("#tolal-cart").style.fontWeight = "bold";
}

function showRating() {
    let numberOfStar = product.rating.star;
    for (let i = 0; i < numberOfStar; i++) {
        let i = document.createElement("i");
        i.className = "fa fa-star";
        i.ariaHidden = "true";
        rating.appendChild(i);
    }
    // console.log(numberOfStar);
}
// ADD EVENTS =============================================================
const add_cart = document.querySelector("#buy");
add_cart.addEventListener("click", getProduct);

let my_cart = document.querySelector("#my-cart");

// MAIN ===================================================================
// saveData();

loadData();
showRating();