  window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 1950); 
    });

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const body = document.body;
  
  function toggleMenu() {
    const isActive = hamburger.classList.contains('active');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (navOverlay) {
      navOverlay.classList.toggle('active');
    }
    
    // Toggle body scroll
    if (!isActive) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) {
      navOverlay.classList.remove('active');
    }
    body.classList.remove('menu-open');
  }
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking on overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }
});

// Cart utility functions for all pages
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function addToCart(book) {
  const cart = getCart();
  const existingItem = cart.find(item => item.title === book.title);
  
  if (existingItem) {
    existingItem.quantity += 1;
    showToast('Quantity updated in cart!');
  } else {
    cart.push({ ...book, quantity: 1 });
    showToast(`${book.title} added to cart!`, 'success');
  }
  
  saveCart(cart);
}

function buyNow(book) {
  // Clear the current cart
  localStorage.removeItem('cart');
  
  // Add the book to cart with quantity 1
  const cart = [{ ...book, quantity: 1 }];
  saveCart(cart);
  
  // Show toast and redirect to cart
  showToast(`${book.title} added to cart! Redirecting to cart...`, 'success');
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  // Attempt to update badge only if present (no-op otherwise)
  try { updateCartBadge(); } catch (e) { /* ignore if badge logic removed */ }

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

  // Fetch top-selling.json and display for index page
  const container = document.getElementById("book-list");
  
  if (container) {
    fetch("js/top-selling.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(books => {
        console.log("Top selling books loaded:", books);

        books.forEach(book => {
          const card = document.createElement("div");
          card.classList.add("book-card");

          card.innerHTML = `
            <div class="image-container">
              <img src="${book.cover}" alt="${book.title}" loading="lazy" onerror="this.onerror=null;this.src='images/fevicon/readora-512.png'">
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

          // Add event listener for "Add to Cart" button
          const addBtn = card.querySelector('.add-btn');
          addBtn.addEventListener('click', () => addToCart(book));

          // Add event listener for "Buy Now" button
          const buyBtn = card.querySelector('.buy-btn');
          buyBtn.addEventListener('click', () => buyNow(book));

          container.appendChild(card);
        });
      })
      .catch(err => console.error("Error loading top selling books:", err));
  }
});

