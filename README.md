# 📚 Readora

> **Read More, Explore More** - Your gateway to endless literary adventures

An elegant e-commerce bookstore platform built with vanilla JavaScript, featuring a comprehensive admin dashboard and seamless user experience for book lovers.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://readora.pr1nce.tech/)
[![GitHub Stars](https://img.shields.io/github/stars/PrinceMakhansa/Readora?style=for-the-badge)](https://github.com/PrinceMakhansa/Readora/stargazers)
[![License](https://img.shields.io/badge/license-Copyright-red?style=for-the-badge)](LICENSE)

<div align="center">
  <img src="images/fevicon/readora-512.png" alt="Readora Logo" width="120" height="120">
  
  <h3>📚 Discover • 🛒 Shop • 📖 Read</h3>
  
  <p><i>Your one-stop destination for exploring and purchasing books across all genres</i></p>
</div>

---

## 🌟 Features

### 🛒 Customer Features
- **Browse & Search** - Explore books by title, author, or category
- **Category Filtering** - 8 distinct categories (Devotional, Fiction, Mystery, Sci-Fi, Historical, Romance, Educational, Comics)
- **Shopping Cart** - Real-time cart management with quantity controls
- **Order Tracking** - View order history and track status
- **Responsive Design** - Seamless experience across all devices
- **User Authentication** - Secure login and signup system
- **Featured Books** - Curated book recommendations
- **Top Selling** - Discover bestselling titles

### 👨‍💼 Admin Features
- **Dashboard Analytics** - Real-time statistics and insights
- **Book Management** - Add, edit, and delete books with ease
- **Order Management** - Track and update order status
- **Customer Management** - View customer data and purchase history
- **Sales Analytics** - Visualize revenue trends and performance
- **Inventory Control** - Monitor stock and bestsellers
- **Export Functionality** - Download order data

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server (Live Server, Python HTTP Server, etc.) or GitHub Pages

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrinceMakhansa/Readora.git
   cd Readora
   ```

2. **Launch with Live Server**
   - Open the project in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

   **OR use Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Access the application**
   - Client: `http://localhost:8000/index.html`
   - Admin: `http://localhost:8000/admin/login.html`

---

## 📁 Project Structure

```
Readora/
├── index.html                 # Homepage
├── README.md                  # Project documentation
├── WIREFRAME.md              # UI wireframe specifications
├── CNAME                     # Custom domain configuration
│
├── admin/                    # Admin dashboard
│   ├── analytics.html        # Sales analytics page
│   ├── books.html           # Book management
│   ├── customers.html       # Customer management
│   ├── dashboard.html       # Admin overview
│   ├── login.html           # Admin authentication
│   ├── orders.html          # Order management
│   ├── css/                 # Admin stylesheets
│   │   ├── admin.css
│   │   ├── admin-analytics.css
│   │   ├── admin-books.css
│   │   ├── admin-customers.css
│   │   ├── admin-dashboard.css
│   │   └── admin-orders.css
│   └── js/                  # Admin scripts
│       ├── admin-books.js
│       ├── admin-common.js
│       ├── admin-customers.js
│       ├── admin-dashboard.js
│       └── admin-orders.js
│
├── client/                   # Customer-facing pages
│   ├── about.html           # About us page
│   ├── books.html           # Browse books catalog
│   ├── cart.html            # Shopping cart
│   ├── login.html           # Customer login
│   ├── orders.html          # Order history
│   ├── signup.html          # Customer registration
│   └── css/                 # Client stylesheets
│       ├── about.css
│       ├── books.css
│       ├── cart.css
│       ├── orders.css
│       └── styles.css
│
├── js/                      # Shared JavaScript
│   ├── database.json        # Book catalog data
│   ├── script.js            # Main application logic
│   ├── top-selling.json     # Featured books data
│   └── utils.js             # Utility functions
│
├── images/                  # Image assets
│   ├── books/              # Book covers
│   ├── icons/              # Category icons
│   └── fevicon/            # Site favicon
│
└── src/                     # Additional resources
    ├── animation.json       # Lottie animations
    └── loader.json          # Loading animation
```

---

## 🎨 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Animations:** Lottie Web Player
- **Icons:** Font Awesome 6
- **Fonts:** Cinzel, Merriweather (Google Fonts)
- **Storage:** LocalStorage for cart and session management
- **Hosting:** GitHub Pages

---

## 💡 Key Functionalities

### Client Side

#### 🏠 Homepage
- Hero section with call-to-action buttons
- Featured books carousel
- Top-selling books grid
- Category navigation
- Responsive footer

#### 📖 Browse Books
- Dynamic book grid with live search
- Category-based filtering
- Add to cart functionality
- Real-time cart badge updates

#### 🛍️ Shopping Cart
- View cart items with thumbnails
- Adjust quantities with +/- controls
- Remove items instantly
- Order summary with subtotal, tax, and total
- Proceed to checkout

#### 📦 My Orders
- Order statistics dashboard
- Order history with status tracking
- Detailed order views
- Empty state handling

### Admin Side

#### 📊 Dashboard
- Key metrics (Books, Orders, Revenue, Customers)
- Recent orders overview
- Sales trend visualization
- Quick access navigation

#### 📚 Manage Books
- Grid/List view toggle
- Search and filter books
- Add new books via modal
- Edit existing books
- Delete books with confirmation
- Top-selling section

#### 📋 Orders Management
- Order status cards (Pending, Confirmed, Shipped, Delivered)
- Sortable orders table
- Update order status
- Export orders functionality
- Pagination support

#### 👥 Customer Management
- Customer database view
- Order count and total spent per customer
- Search and filter customers
- Customer detail views

#### 📈 Analytics
- Revenue and sales metrics
- Sales trend charts
- Category performance visualization
- Best-selling books ranking

---

## 🎯 Usage Guide

### For Customers

1. **Browse Books**
   - Visit homepage and click "Start Exploring" or "Browse Books"
   - Use search bar or category filters to find books
   - Click "Add to Cart" on desired books

2. **Manage Cart**
   - Click cart icon to view items
   - Adjust quantities or remove items
   - Click "Proceed to Checkout" to place order

3. **Track Orders**
   - Navigate to "My Orders" from menu
   - View order history and current status
   - Click "View Details" for order information

### For Admins

1. **Access Admin Panel**
   - Navigate to `/admin/login.html`
   - Login with admin credentials
   - Access dashboard upon successful login

2. **Manage Inventory**
   - Go to "Manage Books"
   - Click "+ Add New Book" to add inventory
   - Use edit/delete icons to modify books
   - Toggle between grid and list views

3. **Process Orders**
   - Visit "Orders" section
   - View order statistics
   - Update order status as needed
   - Export data for reporting

4. **Monitor Analytics**
   - Check "Analytics" for insights
   - Review sales trends
   - Identify top-performing categories
   - Track best-selling books

---

## 🎨 Design Philosophy

- **Clean & Minimal** - Focused on content and usability
- **Book-Themed** - Warm browns, beiges, and cream tones
- **Responsive First** - Mobile, tablet, and desktop optimized
- **Accessible** - Semantic HTML and ARIA labels
- **Fast Loading** - Optimized images and lazy loading
- **Smooth Animations** - Lottie-powered micro-interactions

---

## 🔧 Configuration

### Book Database
Edit `js/database.json` to modify the book catalog:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "cover": "https://covers.openlibrary.org/b/isbn/ISBN-L.jpg",
  "price": 450,
  "category": "Fiction"
}
```

### Top Selling Books
Modify `js/top-selling.json` to feature specific books on the homepage.

### Categories
Update category filters in:
- `index.html` (homepage categories)
- `client/books.html` (filter buttons)
- `admin/books.html` (admin filters)

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |
| Opera   | Latest  |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
   
---

## 📄 License

Copyright © 2025 Prince Makhansa. All Rights Reserved.

This project is currently proprietary and is submitted as an academic project. Unauthorized copying, distribution, or use of this software is strictly prohibited.

**Note:** This project will be released under the MIT License after academic submission and grading are complete.

---

## 👨‍💻 Author

**Prince Makhansa**

- GitHub: [@PrinceMakhansa](https://github.com/PrinceMakhansa)
- Email: [princemakhansa@gmail.com](mailto:princemakhansa@gmail.com)

---

## 🙏 Acknowledgments

- Book cover images from [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Animations from [LottieFiles](https://lottiefiles.com/)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/PrinceMakhansa/Readora/issues) page
2. Create a new issue with detailed description
3. Contact via email: princemakhansa@gmail.com

---

<div align="center">

⭐ Star this repository if you found it helpful!

[Report Bug](https://github.com/PrinceMakhansa/Readora/issues) · [Request Feature](https://github.com/PrinceMakhansa/Readora/issues)

</div>
