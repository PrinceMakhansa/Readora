  window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 1950); 
    });

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");
 
  let prevScroll = window.scrollY;
  const navHeight = navbar.offsetHeight;

  window.addEventListener("scroll", () => {

    let currentScroll = window.scrollY;

    if (currentScroll > prevScroll) {
      // scrolling down → hide
      navbar.style.top = `-${navHeight}px`;
    } else {
      // scrolling up → show
      navbar.style.top = "0";
    }

    prevScroll = currentScroll;
  });
});

// Fetch books.json and display
fetch("js/database.json")
  .then(response => response.json())
  .then(books => {
    console.log("Books loaded:", books);
    const container = document.getElementById("book-list");

    if (!container) {
      console.error("No element with id='book-list' found in this page.");
      return;
    }

    books.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        <div class="image-container">
          <img src="${book.cover}" alt="${book.title}">
        </div>
        <div class="book-text-content">
          <h3>${book.title}</h3>
          <p class="price">₹${book.price}</p>
          <div class="book-actions">
            <button class="buy-btn">Buy Now</button>
            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading books:", err));

