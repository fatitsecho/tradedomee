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
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const items = document.getElementById("cart-items");
    const total = document.getElementById("total");

    items.innerHTML = "";
    let sum = 0;

    cart.forEach((item, i) => {
        items.innerHTML += `
            <div>
                ${item.name} - ${item.price} $
                <button onclick="removeItem(${i})">❌</button>
            </div>
        `;
        sum += item.price;
    });

    total.innerText = sum;
}

function removeItem(i) {
    cart.splice(i, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("hidden");
}

function placeOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const msg = document.getElementById("msg");

    if (!name || !address) {
        msg.innerText = "Заполните данные!";
        return;
    }

    msg.innerText = "Заказ оформлен 🚀";
    cart = [];
    updateCart();
}