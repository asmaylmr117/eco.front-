// // Open & Close Cart
var cart = document.querySelector('.cart');

function open_cart() {
    if (cart) {
        cart.classList.add("active");
    }
}

function close_cart() {
    if (cart) {
        cart.classList.remove("active");
    }
}

// Open & Close Menu
var menu = document.querySelector('#menu');

function open_menu() {
    if (menu) {
        menu.classList.add("active");
    }
}

function close_menu() {
    if (menu) {
        menu.classList.remove("active");
    }
}

// Change Item Image
let bigImage = document.getElementById("bigimg");

function changeItemImage(img) {
    if (bigImage) {
        bigImage.src = img;
    }
}

// Add Items in Cart
let items_in_cart = document.querySelector(".items_in_cart");
let cart_count = document.querySelector(".top_cart span");
let product_cart = [];

// Fetch products from the server
fetch('https://eco-back.vercel.app/api/v1/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            all_products_json = data.reduce((acc, product) => {
                acc[product.id] = product;
                return acc;
            }, {});
        } else {
            console.error('Data is not an array:', data);
        }
    })
    .catch(error => console.error('Error fetching products:', error));

function addToCart(id, btn) {
    if (!product_cart.some(product => product.id === id)) {
        product_cart.push(all_products_json[id]);
        btn.classList.add("active");
        console.log(product_cart);
        getCartItems();
    } else {
        console.log("Product already in cart");
    }
}

let count_item = document.querySelector('.count_item');
let count_item_cart = document.querySelector('.count_item_cart');
let price_cart_total = document.querySelector('.price_cart_total');
let price_cart_head = document.querySelector('.price_cart_head');

function getCartItems() {
    let total_price = 0;
    let items_c = "";

    for (let i = 0; i < product_cart.length; i++) {
        items_c += `
        <div class="item_cart">
            <img src="${product_cart[i].img}" alt="">
            <div class="content">
                <h4>${product_cart[i].name}</h4>
                <p class="price_cart">$${product_cart[i].price}</p>
            </div>
            <button onclick="remove_from_cart(${i})" class="delete_item">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        `;
        total_price += product_cart[i].price;
    }
    if (items_in_cart) items_in_cart.innerHTML = items_c;
    if (price_cart_head) price_cart_head.innerHTML = "$" + total_price.toFixed(2);
    if (count_item) count_item.innerHTML = product_cart.length;

    if (count_item_cart) count_item_cart.innerHTML = `(${product_cart.length} Item${product_cart.length !== 1 ? 's' : ''} in cart)`;
    if (price_cart_total) price_cart_total.innerHTML = "$" + total_price.toFixed(2);
    if (cart_count) cart_count.innerHTML = `(${product_cart.length} Item${product_cart.length !== 1 ? 's' : ''} in cart)`;
    if (document.querySelector(".price_cart_total")) document.querySelector(".price_cart_total").innerText = `$${total_price.toFixed(2)}`;
}

function remove_from_cart(index) {
    product_cart.splice(index, 1);
    getCartItems();
    let addToCartButtons = document.querySelectorAll(".fa-cart-plus");
    addToCartButtons.forEach(button => button.classList.remove("active"));
    product_cart.forEach(product => {
        let button = document.querySelector(`.fa-cart-plus[data-id="${product.id}"]`);
        if (button) button.classList.add("active");
    });
}

// Preloader
window.addEventListener('load', function () {
    setTimeout(function () {
        let preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }
    }, 3000);
});

// Back to Top
let back_to_top = document.querySelector(".back_to_top");

if (back_to_top) {
    back_to_top.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
