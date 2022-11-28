// DOM ELEMENTS ===========================================================
const dom_dialog = document.querySelector("#dialog");
let getName = document.querySelector("#pdt-name");
let getType = document.querySelector("#pdt-type");
let getPrice = document.querySelector("#pdt-price");
let getDiscription = document.querySelector("#pdt-discription");
let getComment = document.querySelector("#pdt-comment");
let getImage = document.querySelector("#pdt-image");

// DATABASE ===============================================================
let products = [];

// FUNCTIONS ==============================================================
// Show dialog ------------------------------------------------------------
function onShow(event) {
    dom_dialog.style.display = "block";
}

// Hide dialog ------------------------------------------------------------
function onHide(event) {
    dom_dialog.style.display = "none";
}

// Create product ------------------------------------------------------------
function createProduct() {
    let checkDataField = getName.value && getType.value && getPrice.value && getDiscription.value && getComment.value && getImage.value;
    if (checkDataField) {
        let product = {};
        product.name = getName.value;
        product.type = getType.value;
        product.price = getPrice.value;
        product.discription = getDiscription.value;
        product.comment = getComment.value;
        product.image = getImage.value;
    
        products.push(product);
    }
    else {
        window.alert("Please fill all the fields!");
    }
}

// ADD EVENTS =============================================================
const btn_create = document.querySelector("#create");
btn_create.addEventListener("click", onShow);

const btn_cancel = document.querySelector("#btn-cancel");
btn_cancel.addEventListener("click", onHide);

const btn_add = document.querySelector("#btn-create");
btn_add.addEventListener("click", createProduct);