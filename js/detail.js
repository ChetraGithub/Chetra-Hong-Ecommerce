// DATA ==================================================================
let userData = [];
let products = JSON.parse(localStorage.getItem("products"))

let indexOfProduct = JSON.parse(localStorage.getItem("productIndex"));

let product = products[indexOfProduct];

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

// ADD EVENTS =============================================================
const add_cart = document.querySelector("#buy");
add_cart.addEventListener("click", getProduct);

let my_cart = document.querySelector("#my-cart");

// MAIN ===================================================================
// saveData();

loadData();