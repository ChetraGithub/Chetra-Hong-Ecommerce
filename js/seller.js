// DOM ELEMENTS ===========================================================
const dom_dialog = document.querySelector("#dialog");
let dom_container = document.querySelector("#container");
let dom_alert = document.querySelector("#alert");

// DATABASE ===============================================================
let products = [];

// VARIABLES ==============================================================
const imageFile = document.querySelector('#pdt-image');
const alert_message = document.querySelector("#alert");
let getName = document.querySelector("#pdt-name");
let getType = document.querySelector("#pdt-type");
let getPrice = document.querySelector("#pdt-price");
let getCurrency = document.querySelector("#currency");
let getDescription = document.querySelector("#pdt-description");
let getComment = document.querySelector("#pdt-comment");
let getImage = document.querySelector("#pdt-image");
let titleForm = document.querySelector("#form-title");
let listOfField = [getName, getType, getPrice, getCurrency, getDescription, getComment]
let indexOfProduct = products.length;
let maxRielsAmount = 16000000;
let maxDollarAmount = 4000;
let minimumAmount = 0;
let numberOfProduct = 0;
let imageURL = "";
let getRating = {};

// FUNCTIONS ==============================================================
// Save data to local storage ---------------------------------------------
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Get local data to update -----------------------------------------------
function loadData() {
    let localData = JSON.parse(localStorage.getItem("products"));
    if (localData != null) {
        products = localData;
    }
}

// Show dialog ------------------------------------------------------------
function onShow(element) {
    element.style.display = "flex";
}

// Hide dialog --------------------------------------------------------------
function onHide(element) {
    element.style.display = "none";
}

// Set field border gray ----------------------------------------------------
function defaultField(element) {
    element.style.border = "1px solid gray";
}

// Set field border red ----------------------------------------------------
function warningField(element) {
    element.style.border = "1px solid red";
}

// Check information in fields ----------------------------------------------
function checkFields() {
    let checkInformation = true;
    let allValues =  getName.value && getType.value && getPrice.value && getDescription.value && getComment.value;
    if (! allValues) {
        checkInformation = false;
    }

    return checkInformation;
}

// On create products --------------------------------------------------------
function uploadProduct() {
    let sellerPrice = parseInt(getPrice.value);

    let maxSell = 4000;
    if (getCurrency.value == "៛") {
        maxSell = 16000000;
    }

    if (! checkFields()) {
        for(let field of listOfField) {
            if (! field.value) {
                warningField(field);
            }
            else {
                defaultField(field);
            }
        };
    }
    else if (sellerPrice > maxSell) {
        warningField(getPrice);
    }
    else {
        let product = {
            name: getName.value,
            type: getType.value,
            price: parseFloat(getPrice.value),
            currency: getCurrency.value,
            description: getDescription.value,
            comment: getComment.value,
            image: imageURL,
            rating: getRating
        };

        // Add product to list
        products.splice(indexOfProduct, 0, product);

        onHide(dom_dialog);
        renderProducts();
    }
}

// Create product ----------------------------------------------------------
function onCreateProduct(event) {
    onShow(dom_dialog);
    getName.value = ""
    getType.value = "";
    getPrice.value = "";
    getCurrency.value = "";
    getDescription.value = "";
    getComment.value = "";
    imageURL = "";
    minimumAmount = 0;

    titleForm.textContent = "Create a Product";
    btn_add.textContent = "Create";

    getPrice.placeholder = "Enter price";

    indexOfProduct = products.length;
}

// Update product ---------------------------------------------------------
function onUpdateProduct(event) {
    let index = event.target.parentElement.parentElement.dataset.index;
    let product = products[index];

    indexOfProduct = index;
    titleForm.textContent = "Update a Product";
    btn_add.textContent = "Update";

    getName.value = product.name;
    getType.value = product.type;
    getPrice.value = product.price;
    getCurrency.value = product.currency;
    getDescription.value = product.description;
    getComment.value = product.comment;
    imageFile.value = "";

    if (product.image) {
        imageURL = product.image;
    }
    
    // Delete old product
    products.splice(index, 1);
    onShow(dom_dialog);
}

// Remove product ---------------------------------------------------------
function onRemoveProduct(event) {
    let index = event.target.parentElement.parentElement.dataset.index;
    products.splice(index, 1);

    renderProducts();
}

// On btn cancel ----------------------------------------------------------
function onCancel(event) {
    products = JSON.parse(localStorage.getItem("products"));
    onHide(dom_dialog);
    for(let field of listOfField) {
        defaultField(field);
    };
    getPrice.placeholder = "Enter price";
}

// Render products --------------------------------------------------------
function renderProducts() {
    // Remove old parent
    document.querySelector("#display-product").remove();

    let display_product = document.createElement("div");
    display_product.id = "display-product";

    numberOfProduct = 0;
    for (let index = 0; index < products.length; index++) {
        let product = products[index];

        numberOfProduct += 1;

        let item = document.createElement("div");
        item.className = "item";
        item.dataset.index = index;

        let number = document.createElement("div");
        number.className = "number";

        let uid = document.createElement("span");
        uid.id = "uid";
        uid.textContent = numberOfProduct;
        number.appendChild(uid);

        let name = document.createElement("span");
        name.id = "name";
        name.textContent = product.name;

        let type = document.createElement("span");
        type.id = "type";
        type.textContent = product.type;

        let price = document.createElement("span");
        price.id = "price";
        price.textContent = product.price + product.currency;

        let description = document.createElement("span");
        description.id = "description";
        description.textContent = product.description;

        let modify = document.createElement("div");
        modify.id = "modify";

        let btn_edit = document.createElement("img");
        btn_edit.src = "../images/edit.png";
        btn_edit.dataset.index = index;
        btn_edit.addEventListener('click', function (event) {
            let index = parseInt(event.target.dataset.index);
            let rating = products[index].rating;
            uploadRating(rating.user, rating.star);
            onUpdateProduct(event);
        });
        modify.appendChild(btn_edit);

        let btn_delete = document.createElement("img");
        btn_delete.src = "../images/delete.png";
        btn_delete.addEventListener('click', onRemoveProduct);
        modify.appendChild(btn_delete);

        // Add to item
        item.appendChild(number);
        item.appendChild(name);
        item.appendChild(type);
        item.appendChild(price);
        item.appendChild(description);
        item.appendChild(modify);

        // Add to Dom Display
        display_product.appendChild(item);
    };

    dom_container.appendChild(display_product);

    saveData();
}

// Change currency --------------------------------------------------------
function uploadRating(user, star) {
    getRating = {
        user: user,
        star: star,
    };
}

// Change currency --------------------------------------------------------
function uploadCurrency() {
    let currency = getCurrency.value;
    let sign = "៛";
    if (currency === "$") {
        minimumAmount = maxDollarAmount;
        sign = "$";
    }
    else if (currency === "៛") {
        minimumAmount = maxRielsAmount;
    }
    else {
        minimumAmount = 0;
    }
    getPrice.placeholder = minimumAmount + sign + " Down";
}

// Upload Image -----------------------------------------------------------
function uploadImage(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        imageURL = reader.result;
    }
    reader.readAsDataURL(file);
}

// ADD EVENTS =============================================================
const btn_create = document.querySelector("#create");
btn_create.addEventListener("click", function() {
    uploadRating(0, 0);
    onCreateProduct();
});

const btn_cancel = document.querySelector("#btn-cancel");
btn_cancel.addEventListener("click", onCancel);

let btn_add = document.querySelector("#btn-create");
btn_add.addEventListener("click", uploadProduct);

getCurrency.addEventListener("change", uploadCurrency);

getImage.addEventListener("change", function(event) {
    uploadImage(this);
});

// MAIN ===================================================================
// saveData();

loadData();
renderProducts();