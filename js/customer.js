// DOM ELEMENTS ===========================================================
let dom_container = document.querySelector("#container");

// DATABASE ===============================================================
let products = JSON.parse(localStorage.getItem("products"));

// VARIABLES ==============================================================


// FUNCTIONS ==============================================================
// Show item --------------------------------------------------------------
function show(element) {
    element.style.display = "block";
}

// Hide item --------------------------------------------------------------
function hide(element) {
    element.style.display = "none";
}

// Display the products ---------------------------------------------------
function renderProducts() {
    document.querySelector("#product-display").remove();

    let dom_product_display = document.createElement("div");
    dom_product_display.id = "product-display";

    for (let index = 0; index < products.length; index++) {
        let product = products[index];

        let item = document.createElement("div");
        item.className = "item";
        item.dataset.index = index;
        item.addEventListener("click", getProductIndex)

        let hideBrand = document.createElement("span");
        hideBrand.id = "hide-brand";
        hideBrand.textContent = product.type;

        let a = document.createElement("a");
        a.href = "pages/detail.html";

        let rating = document.createElement("div");
        rating.className = "rating";
        
        let peopleStar = document.createElement("span");
        peopleStar.textContent = product.rating.user;
        rating.appendChild(peopleStar);

        for (let j = 0; j < product.rating.star; j++) {
            let star = document.createElement("i");
            star.className = "fa fa-star";
            star.ariaHidden = "true";
            rating.appendChild(star);
        }

        let image = document.createElement("div");
        image.className = "image";

        let img = document.createElement("img");
        img.id = "computer-img"
        img.src = product.image;
        img.alt = "computer";
        image.appendChild(img);
        
        let detail = document.createElement("div");
        detail.className = "detail";

        let name = document.createElement("span");
        name.id = "name";
        name.textContent = product.name;
        detail.appendChild(name);

        let price = document.createElement("span");
        price.id = "price";
        price.textContent = product.price + product.currency;
        detail.appendChild(price);

        a.appendChild(rating);
        a.appendChild(image);
        a.appendChild(detail);

        item.appendChild(hideBrand);
        item.appendChild(a)

        dom_product_display.appendChild(item);
    }
    dom_container.appendChild(dom_product_display);
}

// Get product location ---------------------------------------------------
function getProductIndex(event) {
    let index = event.currentTarget.dataset.index;
    localStorage.setItem("productIndex", JSON.stringify(index));
}

// User choose brand name -------------------------------------------------
function getProductByBrand() {
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let typeOfProduct = item.firstChild.textContent.toLowerCase();
        let userType = brand_choose.value.toLowerCase();
        if (typeOfProduct.includes(userType) || userType == "other...") {
            show(item);
        }
        else {
            item.style.display = "none";
        }
    }
}

// User search products ---------------------------------------------------
function searchProducts() {
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let name = item.lastChild.lastChild.firstChild.textContent.toLocaleLowerCase();
        let inputText = searchInput.value.toLocaleLowerCase();

        if (name.includes(inputText)) {
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }

    };
}
// ADD EVENTS =============================================================
let searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", searchProducts);

let brand_choose = document.querySelector("#by-brand");
brand_choose.addEventListener("change", getProductByBrand);

// MAIN ===================================================================
renderProducts();