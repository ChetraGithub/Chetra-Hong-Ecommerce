// DOM ELEMENTS ===========================================================
const dom_dialog = document.querySelector("#dialog");
let dom_container = document.querySelector("#container");

// VARIABLES ==============================================================
let getName = document.querySelector("#pdt-name");
let getType = document.querySelector("#pdt-type");
let getPrice = document.querySelector("#pdt-price");
let getDiscription = document.querySelector("#pdt-discription");
let getComment = document.querySelector("#pdt-comment");
let getImage = document.querySelector("#pdt-image");
let numberOfProduct = 0;

// DATABASE ===============================================================
let products = [{name: "Mac Book Pro 2022", type: "MSI",price: 1999.99, discription: "12G Ram, 1TB M1",comment: "From China",image: "C/"}, 
                {name: "MSI T 450", type: "MSI",price: 750, discription: "16G Ram, 2TB SSD",comment: "From China",image: "C/"},
                {name: "TUF Gaming Pro 2022", type: "MSI",price: 1020, discription: "12G SSD, 520G SSD",comment: "From China",image: "C/"}];

// FUNCTIONS ==============================================================
// Save data to local storage ---------------------------------------------
function saveProduct() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Get local data to update -----------------------------------------------
function dataRoading() {
    let localData = JSON.parse(localStorage.getItem("products"));
    if (localData != null) {
        products = localData;
    }
    console.log(localData)
}
// Show dialog ------------------------------------------------------------
function onShow(event) {
    dom_dialog.style.display = "block";
}
// Hide dialog ------------------------------------------------------------
function onHide(event) {
    dom_dialog.style.display = "none";
}

// Create products --------------------------------------------------------
function createProduct() {
    let checkDataField = getName.value && getType.value && getPrice.value && getDiscription.value && getComment.value && getImage.value;
    if (checkDataField) {
        let product = {};
        product.name = getName.value;
        product.type = getType.value;
        product.price = parseInt(getPrice.value);
        product.discription = getDiscription.value;
        product.comment = getComment.value;
        product.image = getImage.value;
    
        products.push(product);
        renderProducts();
        onHide();
    }
    else {
        window.alert("Please fill all the fields!");
    }
    saveProduct();
}

// Render products --------------------------------------------------------
function renderProducts() {
    // Remove old parent
    document.querySelector("#display-product").remove();

    let display_product = document.createElement("div");
    display_product.id = "display-product";

    numberOfProduct = 0;
    for (let i = 0; i < products.length; i++) {
        numberOfProduct += 1;

        let item = document.createElement("div");
        item.className = "item";
    
        let number = document.createElement("div");
        number.className = "number";
    
        let uid = document.createElement("span");
        uid.id = "uid";
        uid.textContent = numberOfProduct;
        number.appendChild(uid);
    
        let name = document.createElement("span");
        name.id = "name";
        name.textContent = products[i].name;
    
        let price = document.createElement("span");
        price.id = "price";
        price.textContent = products[i].price + " $";
        
        let discription = document.createElement("span");
        discription.id = "discription";
        discription.textContent = products[i].discription;

        let modify = document.createElement("div");
        modify.id = "modify";

        let btn_edit = document.createElement("img");
        btn_edit.src = "../images/edit.png";
        modify.appendChild(btn_edit);

        let btn_delete = document.createElement("img");
        btn_delete.src = "../images/delete.png";
        modify.appendChild(btn_delete);

        // Add to item
        item.appendChild(number);
        item.appendChild(name);
        item.appendChild(price);
        item.appendChild(discription);
        item.appendChild(modify);

        // Add to Dom Display
        display_product.appendChild(item)
    };

    dom_container.appendChild(display_product)
}

// ADD EVENTS =============================================================
const btn_create = document.querySelector("#create");
btn_create.addEventListener("click", onShow);

const btn_cancel = document.querySelector("#btn-cancel");
btn_cancel.addEventListener("click", onHide);

const btn_add = document.querySelector("#btn-create");
btn_add.addEventListener("click", createProduct);

// MAIN ===================================================================
dataRoading();
renderProducts();

// saveProduct();
