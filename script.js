let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const count = document.getElementById("cart-count");
    const total = document.getElementById("total");

    cartItems.innerHTML = "";

    let sum = 0;

    cart.forEach(item => {
        sum += item.price;

        const div = document.createElement("div");
        div.textContent = `${item.name} — ${item.price}$`;
        cartItems.appendChild(div);
    });

    count.textContent = cart.length;
    total.textContent = "Итого: " + sum + "$";
}

function checkout() {
    alert("Заказ оформлен в TRADEDOME!");
    cart = [];
    updateCart();
}

function filterProducts(category) {
    document.querySelectorAll(".card").forEach(card => {
        card.style.display =
            category === "all" || card.dataset.category === category ?
            "block" :
            "none";
    });
}

/* animation */
gsap.from(".card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.15
});