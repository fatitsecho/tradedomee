document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        alert("Товар открыт (можно подключить страницу товара)");
    });
});