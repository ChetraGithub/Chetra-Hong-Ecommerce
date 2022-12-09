// DATA =============================================================
let localDataUser = JSON.parse(localStorage.getItem("userData"));

// VARIABLES ========================================================
const credit_card = document.querySelector("#credit-card");
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
let card_number = document.querySelector("#card-number");
let card_name = document.querySelector("#card-name");
let card_expiration = document.querySelector("#card-expiration");
let fields = [get_name, get_surname, get_address, get_country, get_city, get_province, get_postal, get_mobile];
let userCardInfor = [card_number, card_name, card_expiration];
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
// Hide dom element -------------------------------------------------
function hide(element) {
    element.style.display = "none";
}

// Show dom element -------------------------------------------------
function show(element) {
    element.style.display = "flex";
}

// Set default field border -----------------------------------------
function fieldDefault(element) {
    element.style.border = "1px solid gray";
}

// Set alert field border (red) -------------------------------------
function fieldWarmming(element) {
    element.style.border = "1px solid red";
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

        let laptop = document.createElement("div");
        laptop.className = "laptop";

        // let image = document.createElement("img");
        // image.src = product.image;
        // details.appendChild(image);

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
function userCheckOut() {
    let completeFiels = true;
    for (let field of fields) {
        if (field.value) {
            fieldDefault(field);
        }
        else {
            completeFiels = false;
            fieldWarmming(field);
        }
    };

    if (completeFiels) {
        hide(chek_out);
        checkOutDefault(fields);
        show(credit_card);
    }
}

// Set alert default ------------------------------------------------
function checkOutDefault(fields) {
    for (let field of fields) {
        field.value = "";
        fieldDefault(field);
    };
}

//  ----------------------------------------------
function cardCorection() {
    // Set default check credit card
    let checkCard = true;
    for (let field of userCardInfor) {
        fieldDefault(field);
    };

    // Check user not input the values
    for (let field of userCardInfor) {
        if (! field.value) {
            checkCard = false;
            fieldWarmming(field);
        }
    };

    // Check card numbers
    let numbers = card_number.value;
    for (let num of numbers) { 
        let numberInt = parseInt(num);

        let checkValidCardNumber = numberInt.toString() == "NaN" || numbers.length != 16;
        if (checkValidCardNumber) {
            checkCard = false;
            fieldWarmming(card_number);
        }
    };

    // Check card expiration
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var year = dateObj.getUTCFullYear();

    
    let cardExpiration = card_expiration.value;
    let cardYear = parseInt(cardExpiration.slice(0, 4));
    let cardMonth = parseInt(cardExpiration.slice(5, 7));
    
    let checkMonthAndYear = cardYear < year || (cardYear === year && cardMonth < month);
    if (checkMonthAndYear) {
        checkCard = false;
        fieldWarmming(card_expiration);
    }

    // Credit card corect all
    if (checkCard) {
        hide(credit_card);
        checkOutDefault(userCardInfor);
    }
}
// EVENTS ==========================================================
const cancel = document.querySelector("#cancel");
cancel.addEventListener('click', function() {
    hide(chek_out);
    checkOutDefault(fields);
});

const on_buy = document.querySelector("#on-buy");
on_buy.addEventListener('click', function() {
    checkShopping(localDataUser);
});

const add = document.querySelector("#add");
add.addEventListener('click', userCheckOut);

const btn_pay = document.querySelector("#pay");
btn_pay.addEventListener('click', cardCorection);

const bth_cancel_pay = document.querySelector("#cancel-pay");
bth_cancel_pay.addEventListener('click', function() {
    hide(credit_card);
    checkOutDefault(userCardInfor);
});

// MAIN ============================================================
displayMyProducts();