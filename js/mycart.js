// DATA =============================================================
let localDataUser = JSON.parse(localStorage.getItem("userData"));

let dom_container = document.querySelector(".container");

// VARIABLES ========================================================
let dollar = 0;
let riels = 0;
// Get currency riels and dollar
for (let product of localDataUser) {
    if (product.currency === "$") {
        dollar += product.price;
    }
    else if (product.currency === "៛") {
        riels += product.price;

    }
};

// FUNCTIONS ========================================================
// Dispaly my products ----------------------------------------------
function displayMyProducts() {
    document.querySelector("#list").remove();

    let list = document.createElement("div");
    list.id = "list";

    for (let index = 0; index < localDataUser.length; index++) {
        let product = localDataUser[index];

        let item = document.createElement("div");
        item.className = "item";

        let close = document.createElement("div");
        close.id = "close";

        let i_fa = document.createElement("i");
        i_fa.className = "fa fa-times-circle";
        i_fa.ariaHidden = "true";
        close.appendChild(i_fa);
        i_fa.dataset.index = index;
        i_fa.addEventListener("click", deleteMyproduct)

        let details = document.createElement("div");
        details.className = "details";

        let brand = document.createElement("span");
        brand.id = "brand";
        brand.textContent = product.type;
        details.appendChild(brand);

        let name = document.createElement("span");
        name.id = "name";
        name.textContent = product.name;
        details.appendChild(name);

        let price = document.createElement("span");
        price.id = "price";
        price.textContent = product.price + product.currency;
        details.appendChild(price);

        item.appendChild(close);
        item.appendChild(details);

        list.appendChild(item);
    };

    dom_container.appendChild(list);
}

// Delete my product ------------------------------------------------
function deleteMyproduct(event) {
    let index = event.target.dataset.index;
    localDataUser.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(localDataUser));
    
    displayMyProducts();
}

// Display total price ----------------------------------------------

// EVENTS ==========================================================

// MAIN ============================================================
displayMyProducts();