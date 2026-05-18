// ===============================
// TRADEDOME - ADVANCED SCRIPT
// ===============================

// -------------------------------
// ЭЛЕМЕНТЫ
// -------------------------------
const cartBtn = document.querySelector('.btn-primary');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceEl = document.querySelector('.total-price');
const buyButtons = document.querySelectorAll('.product-card .btn-accent');
const checkoutBtn = document.querySelector('.checkout-btn');

// -------------------------------
// СОЗДАЕМ СЧЕТЧИК В КОРЗИНЕ
// -------------------------------
const cartCount = document.createElement('span');
cartCount.classList.add('cart-count');
cartCount.textContent = '0';
cartBtn.appendChild(cartCount);

// -------------------------------
// КНОПКА НАВЕРХ
// -------------------------------
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '↑';
backToTopBtn.classList.add('back-to-top');
document.body.appendChild(backToTopBtn);

// -------------------------------
// УВЕДОМЛЕНИЕ
// -------------------------------
const notification = document.createElement('div');
notification.classList.add('notification');
document.body.appendChild(notification);

// -------------------------------
// КОРЗИНА
// -------------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// -------------------------------
// СОХРАНЕНИЕ В LOCAL STORAGE
// -------------------------------
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// -------------------------------
// ОБНОВЛЕНИЕ СЧЕТЧИКА
// -------------------------------
function updateCartCount() {
    let totalCount = 0;

    cart.forEach(item => {
        totalCount += item.quantity;
    });

    cartCount.textContent = totalCount;
}

// -------------------------------
// ПОКАЗ УВЕДОМЛЕНИЯ
// -------------------------------
function showNotification(text) {
    notification.textContent = text;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// -------------------------------
// ОБНОВЛЕНИЕ КОРЗИНЫ
// -------------------------------
function updateCart() {

    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.classList.add('cart-item');

        div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${item.price} ₽</p>
      </div>

      <div class="cart-controls">
        <button class="decrease" data-index="${index}">-</button>
        <span>${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>

      <button class="remove-item" data-index="${index}">
        ✕
      </button>
    `;

        cartItemsContainer.appendChild(div);
    });

    totalPriceEl.textContent = total + ' ₽';

    updateCartCount();
    saveCart();
}

// -------------------------------
// ДОБАВЛЕНИЕ ТОВАРА
// -------------------------------
buyButtons.forEach(button => {

    button.addEventListener('click', e => {

        const productCard = e.target.closest('.product-card');

        const name = productCard.querySelector('h3').textContent;

        const priceText = productCard
            .querySelector('p')
            .textContent
            .replace(' ₽', '');

        const price = parseFloat(priceText);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        updateCart();

        showNotification(`${name} добавлен в корзину`);

    });

});

// -------------------------------
// ОТКРЫТЬ КОРЗИНУ
// -------------------------------
cartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('hidden');
});

// -------------------------------
// ЗАКРЫТЬ КОРЗИНУ
// -------------------------------
closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('hidden');
});

// -------------------------------
// КНОПКИ + - И УДАЛЕНИЕ
// -------------------------------
cartItemsContainer.addEventListener('click', e => {

    const index = e.target.dataset.index;

    // Увеличение
    if (e.target.classList.contains('increase')) {

        cart[index].quantity++;

        updateCart();
    }

    // Уменьшение
    if (e.target.classList.contains('decrease')) {

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        updateCart();
    }

    // Удаление
    if (e.target.classList.contains('remove-item')) {

        cart.splice(index, 1);

        updateCart();
    }

});

// -------------------------------
// ОФОРМЛЕНИЕ ЗАКАЗА
// -------------------------------
checkoutBtn.addEventListener('click', () => {

    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    alert('Спасибо за заказ!');

    cart = [];

    updateCart();

    cartOverlay.classList.add('hidden');

});

// -------------------------------
// ПЛАВНЫЙ СКРОЛЛ
// -------------------------------
document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', e => {

        e.preventDefault();

        const targetId = link
            .getAttribute('href')
            .substring(1);

        document
            .getElementById(targetId)
            .scrollIntoView({
                behavior: 'smooth'
            });

    });

});

// -------------------------------
// КНОПКА НАВЕРХ
// -------------------------------
window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }

});

backToTopBtn.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});

// -------------------------------
// ЗАГРУЗКА КОРЗИНЫ
// -------------------------------
updateCart();
// ==============================
// PREMIUM FEATURES - TRADEDOME
// ==============================

// ------------------------------
// PRELOADER
// ------------------------------
const preloader = document.createElement('div');

preloader.classList.add('preloader');

preloader.innerHTML = `
  <div class="loader"></div>
`;

document.body.appendChild(preloader);

window.addEventListener('load', () => {

    setTimeout(() => {

        preloader.classList.add('hide');

    }, 1200);

});

// ------------------------------
// ACTIVE MENU ON SCROLL
// ------------------------------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }

    });

});

// ------------------------------
// FADE-IN ANIMATION
// ------------------------------
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show-element');

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll('.product-card, .category, .about-item')
    .forEach(el => {

        el.classList.add('hidden-element');

        observer.observe(el);

    });

// ------------------------------
// SEARCH SYSTEM
// ------------------------------
const searchContainer = document.createElement('div');

searchContainer.classList.add('search-container');

searchContainer.innerHTML = `
  <input type="text" id="searchInput" placeholder="Поиск товаров...">
`;

document.querySelector('.header-container')
    .appendChild(searchContainer);

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {

    const value = searchInput.value.toLowerCase();

    document.querySelectorAll('.product-card')
        .forEach(card => {

            const title = card.querySelector('h3')
                .textContent
                .toLowerCase();

            if (title.includes(value)) {

                card.style.display = 'block';

            } else {

                card.style.display = 'none';

            }

        });

});

// ------------------------------
// DARK MODE
// ------------------------------
const darkModeBtn = document.createElement('button');

darkModeBtn.classList.add('dark-mode-btn');

darkModeBtn.innerHTML = '🌙';

document.querySelector('.header-container')
    .appendChild(darkModeBtn);

darkModeBtn.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {

        darkModeBtn.innerHTML = '☀️';

    } else {

        darkModeBtn.innerHTML = '🌙';

    }

});

// ------------------------------
// PRODUCT QUICK VIEW
// ------------------------------
document.querySelectorAll('.product-card img')
    .forEach(image => {

        image.addEventListener('click', () => {

            const popup = document.createElement('div');

            popup.classList.add('image-popup');

            popup.innerHTML = `
      <div class="popup-content">
        <img src="${image.src}">
      </div>
    `;

            document.body.appendChild(popup);

            popup.addEventListener('click', () => {

                popup.remove();

            });

        });

    });

// ------------------------------
// AUTO SLIDER HERO
// ------------------------------
const heroTexts = [
    'Все для строительства и ремонта',
    'Лучшие инструменты для мастеров',
    'Профессиональное оборудование',
    'TradeDome — качество и надежность'
];

let heroIndex = 0;

const heroTitle = document.querySelector('.hero h1');

setInterval(() => {

    heroIndex++;

    if (heroIndex >= heroTexts.length) {
        heroIndex = 0;
    }

    heroTitle.style.opacity = '0';

    setTimeout(() => {

        heroTitle.textContent = heroTexts[heroIndex];

        heroTitle.style.opacity = '1';

    }, 400);

}, 4000);

// ------------------------------
// PARTICLES BACKGROUND
// ------------------------------
const particles = document.createElement('div');

particles.classList.add('particles');

document.body.appendChild(particles);

for (let i = 0; i < 25; i++) {

    const particle = document.createElement('span');

    particle.style.left = Math.random() * 100 + '%';

    particle.style.animationDuration =
        (Math.random() * 10 + 5) + 's';

    particle.style.animationDelay =
        (Math.random() * 5) + 's';

    particles.appendChild(particle);

}
// =====================================
// TRADEDOME ULTIMATE STORE FEATURES
// =====================================

// -------------------------------------
// FAVORITES SYSTEM
// -------------------------------------
const favorites = JSON.parse(
    localStorage.getItem('favorites')
) || [];

document.querySelectorAll('.product-card')
    .forEach(card => {

        const favoriteBtn = document.createElement('button');

        favoriteBtn.classList.add('favorite-btn');

        favoriteBtn.innerHTML = '♡';

        card.appendChild(favoriteBtn);

        favoriteBtn.addEventListener('click', () => {

            const productName =
                card.querySelector('h3').textContent;

            if (favorites.includes(productName)) {

                const index = favorites.indexOf(productName);

                favorites.splice(index, 1);

                favoriteBtn.innerHTML = '♡';

            } else {

                favorites.push(productName);

                favoriteBtn.innerHTML = '♥';

            }

            localStorage.setItem(
                'favorites',
                JSON.stringify(favorites)
            );

        });

    });

// -------------------------------------
// PRODUCT RATING
// -------------------------------------
document.querySelectorAll('.product-card')
    .forEach(card => {

        const rating = document.createElement('div');

        rating.classList.add('rating');

        rating.innerHTML = `
    ★★★★★
  `;

        card.insertBefore(
            rating,
            card.querySelector('p')
        );

    });

// -------------------------------------
// LIVE CLOCK
// -------------------------------------
const clock = document.createElement('div');

clock.classList.add('live-clock');

document.body.appendChild(clock);

function updateClock() {

    const now = new Date();

    const time =
        now.toLocaleTimeString('ru-RU');

    clock.textContent = time;

}

setInterval(updateClock, 1000);

updateClock();

// -------------------------------------
// ONLINE USERS COUNTER
// -------------------------------------
const onlineUsers = document.createElement('div');

onlineUsers.classList.add('online-users');

let users = Math.floor(Math.random() * 20) + 120;

onlineUsers.innerHTML = `
  Сейчас на сайте: ${users} человек
`;

document.body.appendChild(onlineUsers);

setInterval(() => {

    users += Math.floor(Math.random() * 5 - 2);

    if (users < 100) users = 100;

    onlineUsers.innerHTML = `
    Сейчас на сайте: ${users} человек
  `;

}, 5000);

// -------------------------------------
// SALES POPUP
// -------------------------------------
const salesMessages = [
    'Кто-то купил Дрель',
    'Заказ оформлен на Молоток',
    'Клиент добавил Отвертку в корзину',
    'Новый заказ оформлен',
    'Покупатель смотрит Инструменты'
];

function createSalesPopup() {

    const popup = document.createElement('div');

    popup.classList.add('sales-popup');

    popup.textContent =
        salesMessages[
            Math.floor(Math.random() *
                salesMessages.length)
        ];

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add('show-sale');

    }, 100);

    setTimeout(() => {

        popup.remove();

    }, 4000);

}

setInterval(createSalesPopup, 9000);

// -------------------------------------
// PRODUCT FILTER
// -------------------------------------
const filterContainer = document.createElement('div');

filterContainer.classList.add('filter-container');

filterContainer.innerHTML = `
  <button data-filter="all">Все</button>
  <button data-filter="дрель">Дрели</button>
  <button data-filter="молоток">Молотки</button>
  <button data-filter="отвертка">Отвертки</button>
`;

document.querySelector('.featured-products .container')
    .prepend(filterContainer);

document.querySelectorAll('.filter-container button')
    .forEach(button => {

        button.addEventListener('click', () => {

            const filter =
                button.dataset.filter;

            document.querySelectorAll('.product-card')
                .forEach(card => {

                    const title =
                        card.querySelector('h3')
                        .textContent
                        .toLowerCase();

                    if (
                        filter === 'all' ||
                        title.includes(filter)
                    ) {

                        card.style.display = 'block';

                    } else {

                        card.style.display = 'none';

                    }

                });

        });

    });

// -------------------------------------
// FAKE LOADING BUTTON
// -------------------------------------
checkoutBtn.addEventListener('click', () => {

    checkoutBtn.innerHTML = 'Обработка...';

    checkoutBtn.disabled = true;

    setTimeout(() => {

        checkoutBtn.innerHTML =
            'Оформить заказ';

        checkoutBtn.disabled = false;

    }, 3000);

});

// -------------------------------------
// TYPING EFFECT
// -------------------------------------
const heroParagraph =
    document.querySelector('.hero p');

const text =
    'Инструменты, материалы и техника по лучшим ценам';

let charIndex = 0;

heroParagraph.textContent = '';

function typingEffect() {

    if (charIndex < text.length) {

        heroParagraph.textContent +=
            text.charAt(charIndex);

        charIndex++;

        setTimeout(typingEffect, 40);

    }

}

typingEffect();
// ======================================
// TRADEDOME GOD LEVEL EXPERIENCE
// ======================================

// --------------------------------------
// CUSTOM CURSOR
// --------------------------------------
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');

const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');

document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', e => {

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';

});

// --------------------------------------
// CURSOR HOVER EFFECT
// --------------------------------------
document.querySelectorAll(
    'button, a, .product-card, .category'
).forEach(item => {

    item.addEventListener('mouseenter', () => {

        cursor.classList.add('cursor-hover');

    });

    item.addEventListener('mouseleave', () => {

        cursor.classList.remove('cursor-hover');

    });

});

// --------------------------------------
// MAGNETIC BUTTON EFFECT
// --------------------------------------
document.querySelectorAll(
    '.btn-primary, .btn-accent'
).forEach(button => {

    button.addEventListener('mousemove', e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });

    button.addEventListener('mouseleave', () => {

        button.style.transform = 'translate(0,0)';

    });

});

// --------------------------------------
// PARALLAX HERO
// --------------------------------------
window.addEventListener('scroll', () => {

    const scrollY = window.scrollY;

    const heroImage =
        document.querySelector('.hero-image img');

    if (heroImage) {

        heroImage.style.transform =
            `translateY(${scrollY * 0.15}px)`;

    }

});

// --------------------------------------
// AUTO CHANGE HEADER BACKGROUND
// --------------------------------------
window.addEventListener('scroll', () => {

    const header = document.querySelector('header');

    if (window.scrollY > 80) {

        header.style.background =
            'rgba(255,255,255,0.85)';

        header.style.backdropFilter =
            'blur(12px)';

    } else {

        header.style.background =
            '#ffffff';

    }

});

// --------------------------------------
// SOUND EFFECTS
// --------------------------------------
const clickSound = new Audio(
    'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
);

document.querySelectorAll('button')
    .forEach(button => {

        button.addEventListener('click', () => {

            clickSound.currentTime = 0;

            clickSound.volume = 0.15;

            clickSound.play();

        });

    });

// --------------------------------------
// DYNAMIC GRADIENT
// --------------------------------------
let gradientAngle = 135;

setInterval(() => {

    gradientAngle++;

    document.querySelector('.hero').style.background =
        `linear-gradient(
      ${gradientAngle}deg,
      #f5f8ff,
      #dbeafe,
      #eef2ff
    )`;

}, 80);

// --------------------------------------
// RANDOM GLOW EFFECT
// --------------------------------------
setInterval(() => {

    document.querySelectorAll('.product-card')
        .forEach(card => {

            card.style.boxShadow =
                `
      0 15px 40px rgba(13,27,61,0.12),
      0 0 ${
        Math.random() * 30
      }px rgba(249,168,37,0.18)
      `;

        });

}, 1800);

// --------------------------------------
// SCROLL PROGRESS BAR
// --------------------------------------
const progressBar =
    document.createElement('div');

progressBar.classList.add('scroll-progress');

document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {

    const totalHeight =
        document.body.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    progressBar.style.width =
        progress + '%';

});

// --------------------------------------
// FLOATING BACKGROUND ICONS
// --------------------------------------
const floatingIcons =
    document.createElement('div');

floatingIcons.classList.add('floating-icons');

document.body.appendChild(floatingIcons);

const icons = [
    '🔨',
    '🪚',
    '🧰',
    '⚙️',
    '🪛',
    '🏗️'
];

for (let i = 0; i < 20; i++) {

    const icon =
        document.createElement('span');

    icon.innerHTML =
        icons[Math.floor(
            Math.random() * icons.length
        )];

    icon.style.left =
        Math.random() * 100 + '%';

    icon.style.animationDuration =
        (Math.random() * 15 + 10) + 's';

    icon.style.fontSize =
        (Math.random() * 30 + 20) + 'px';

    floatingIcons.appendChild(icon);

}

// --------------------------------------
// MATRIX EFFECT IN DARK MODE
// --------------------------------------
function createMatrix() {

    const matrix =
        document.createElement('canvas');

    matrix.classList.add('matrix');

    document.body.appendChild(matrix);

    const ctx =
        matrix.getContext('2d');

    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;

    const letters =
        'TRADEDOME0123456789';

    const fontSize = 16;

    const columns =
        matrix.width / fontSize;

    const drops = [];

    for (let x = 0; x < columns; x++) {

        drops[x] = 1;

    }

    function draw() {

        ctx.fillStyle =
            'rgba(0,0,0,0.05)';

        ctx.fillRect(
            0,
            0,
            matrix.width,
            matrix.height
        );

        ctx.fillStyle = '#0f0';

        ctx.font =
            fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {

            const text =
                letters[
                    Math.floor(
                        Math.random() *
                        letters.length
                    )
                ];

            ctx.fillText(
                text,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize >
                matrix.height &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;

            }

            drops[i]++;

        }

    }

    setInterval(draw, 33);

}

createMatrix();
document.querySelectorAll('.product-card')
    .forEach(card => {

        card.addEventListener('mousemove', e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;

        });

        card.addEventListener('mouseleave', () => {

            card.style.transform = `
      rotateX(0)
      rotateY(0)
      translateY(0)
    `;

        });

    });
document.addEventListener('mousemove', e => {

    document.body.style.setProperty(
        '--x',
        e.clientX + 'px'
    );

    document.body.style.setProperty(
        '--y',
        e.clientY + 'px'
    );

});
async function checkoutCart(items) {
    const res = await fetch("http://localhost:3000/create-payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items })
    });

    const data = await res.json();

    window.location.href = data.url;
}
document.querySelector(".checkout-btn").addEventListener("click", () => {
    const items = [
        { name: "Дрель", price: 3500, quantity: 1 },
        { name: "Молоток", price: 1200, quantity: 1 }
    ];

    checkoutCart(items);
});
let cart = [];

const buttons = document.querySelectorAll(".btn-accent");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.parentElement;
        const name = card.querySelector("h3").innerText;
        const price = card.querySelector("p").innerText;

        cart.push({ name, price });
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.querySelector(".cart-items");
    const totalPrice = document.querySelector(".total-price");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerText = item.name + " - " + item.price;
        cartItems.appendChild(div);

        total += parseInt(item.price);
    });

    totalPrice.innerText = total + " ₽";
}