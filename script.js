// Product details
const products = [
    {
        id: 1,
        name: "T-Shirt",
        price: 499
    },
    {
        id: 2,
        name: "Shoes",
        price: 1499
    },
    {
        id: 3,
        name: "Backpack",
        price: 899
    },
    {
        id: 4,
        name: "Watch",
        price: 1999
    }
];

// Shopping cart
let cart = [];

// Add product to cart
function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

// Increase quantity
function increaseQuantity(productId) {

    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity++;
    }

    displayCart();
}

// Decrease quantity
function decreaseQuantity(productId) {

    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    displayCart();
}

// Remove product
function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    displayCart();
}

// Display cart
function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const totalItems = document.getElementById("totalItems");
    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty">Your cart is empty.</p>
        `;

        totalItems.textContent = 0;
        totalPrice.textContent = 0;

        return;
    }

    let itemsCount = 0;
    let priceTotal = 0;

    cart.forEach(item => {

        itemsCount += item.quantity;
        priceTotal += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>₹${item.price} each</p>
            </div>

            <div class="quantity">
                <button onclick="decreaseQuantity(${item.id})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>

            <div>
                <strong>₹${item.price * item.quantity}</strong>
            </div>

            <button 
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    totalItems.textContent = itemsCount;
    totalPrice.textContent = priceTotal;
}