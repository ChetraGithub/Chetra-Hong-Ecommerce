// DATA =============================================================
let localDataUser = JSON.parse(localStorage.getItem("userData"));


// VARIABLES ========================================================
let dom_container = document.querySelector(".container");
let chek_out = document.querySelector("#chek-out");
let get_name = document.querySelector("#get-name");
let get_surname = document.querySelector("#surname");
let get_address = document.querySelector("#address");
let get_country = document.querySelector("#country");
let get_city = document.querySelector("#city");
let get_province = document.querySelector("#province");
let get_postal = document.querySelector("#postal");
let get_mobile = document.querySelector("#mobile");
let fields = [get_name, get_surname, get_address, get_country, get_city, get_province, get_postal, get_mobile];
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
function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "flex";
}

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

// Check products shopping ------------------------------------------
function checkShopping(products){
    if (products.length > 0) {
        show(chek_out);
    }
}

// Check user input information -------------------------------------
function alertUserInfor() {
    let isFiels = true;
    for (let field of fields) {
        if (field.value) {
            field.style.border = "1px solid blue";
        }
        else {
            field.style.border = "1px solid red";
            isFiels = false;
        }
    };

    if (isFiels) {
        hide(chek_out);
        setAlertDefault(fields);
    }
}

// Set alert default ------------------------------------------------
function setAlertDefault(fields) {
    for (let field of fields) {
        field.value = "";
        field.style.border = "1px solid gray";
    };
}

// Display total price ----------------------------------------------

// EVENTS ==========================================================
const cancel = document.querySelector("#cancel");
cancel.addEventListener('click', function() {
    hide(chek_out);
    setAlertDefault(fields);
});

const on_buy = document.querySelector("#on-buy");
on_buy.addEventListener('click', function() {
    checkShopping(localDataUser);
});

const add = document.querySelector("#add");
add.addEventListener('click', alertUserInfor);

// MAIN ============================================================
displayMyProducts();