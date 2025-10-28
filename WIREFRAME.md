# Readora - UI Wireframe Blueprint

## Project Overview
**Readora** - Online Bookstore Platform
- **Tagline:** "Read More, Explore More"
- **Two Interfaces:** Client (Customer) + Admin Dashboard

---

## CLIENT-SIDE WIREFRAMES

### 1. Homepage (index.html)

**Header/Navigation Bar:**
- Logo "Readora" on the left
- Hamburger menu icon for mobile
- Navigation links: Home, Browse Books, Cart, Orders, About Us
- Login and Sign Up buttons on the right

**Hero Section (Two-column layout):**
- Left Column:
  - Large heading: "Read More, Explore More"
  - Subtext: "Discover your next adventure in books—handpicked stories, seamless shopping, and endless inspiration at Readora."
  - Two call-to-action buttons: "Start Exploring" and "Explore Categories"
- Right Column:
  - Lottie animation of a book or reading-related graphic

**Featured Books Section:**
- Heading: "Featured Books"
- Horizontal scrollable gallery with 10 book cover images
- Each book displays as a card with cover image only

**Top Selling Books Section:**
- Heading: "Top Selling Books"
- Grid layout (4 columns on desktop, responsive on mobile)
- Each book card contains:
  - Book cover image
  - Title
  - Author name
  - Price in rupees (₹)

**Categories Section:**
- Heading: "Categories"
- 8 category cards in a grid (4x2):
  - Devotional, Fiction, Mystery, Sci-Fi
  - Historical, Romance, Educational, Comics
- Each card shows an icon and category name
- Cards are clickable to filter books

**Footer:**
- Two columns:
  - Quick Links: Home, Browse Books, Cart, Orders, About Us
  - Social Media: Email, GitHub
- Copyright text: "© 2025 Readora. Designed by Prince Makhansa"

---

### 2. Browse Books Page (client/books.html)

**Header/Navigation:** Same as homepage

**Search Section:**
- Large search input box with search icon
- Placeholder text: "Search books by title, author, or category..."
- Search button with magnifying glass icon
- Shopping cart icon on the right with badge showing item count (e.g., "2")

**Category Filter Section:**
- Heading: "Browse by Category"
- Horizontal button group with 9 filter buttons:
  - "All Books" (active/selected by default)
  - Devotional, Fiction, Mystery, Sci-Fi, Historical, Romance, Educational, Comics
- Buttons are toggleable, only one active at a time

**Books Display Section:**
- Grid layout of book cards (3 columns on desktop, responsive on smaller screens)
- Each book card contains:
  - Book cover image at top
  - Horizontal divider line
  - Book title
  - Author name
  - Price in rupees (₹)
  - Category badge/tag
  - "Add to Cart" button at bottom
- Grid continues with multiple rows of books
- Responsive: adjusts to 2 columns on tablet, 1 column on mobile

**Footer:** Same as homepage

---

### 3. Shopping Cart Page (client/cart.html)

**Header/Navigation:** Same as homepage

**Cart Header:**
- Shopping cart icon followed by "YOUR SHOPPING CART"
- Subtitle: "Review your selected books before checkout"

**Cart Items Table:**
- Table with 6 columns:
  1. Book (thumbnail image)
  2. Title (book name)
  3. Price (per unit in ₹)
  4. Quantity (with + and - controls to adjust)
  5. Subtotal (price × quantity)
  6. Remove (trash icon button)
- Each row represents one item in the cart
- Example rows:
  - Book cover | Book Title 1 | ₹420 | Qty: 2 (adjustable) | ₹840 | Delete button
  - Book cover | Book Title 2 | ₹350 | Qty: 1 (adjustable) | ₹350 | Delete button
  - Book cover | Book Title 3 | ₹600 | Qty: 1 (adjustable) | ₹600 | Delete button

**Order Summary Card (Right sidebar or below table):**
- Heading: "Order Summary"
- Line items:
  - Subtotal: ₹1,790
  - Shipping: FREE
  - Tax: ₹179
  - Horizontal divider
  - Total: ₹1,969 (bold/emphasized)
- "Proceed to Checkout" button (primary, prominent)
- "Continue Shopping" link/button (secondary)

**Empty Cart State (shown when cart is empty):**
- Large shopping cart icon (centered)
- Heading: "Your cart is empty"
- Text: "Looks like you haven't added any books yet."
- "Browse Books" button with book icon

**Footer:** Same as homepage

---

### 4. My Orders Page (client/orders.html)

**Header/Navigation:** Same as homepage

**Orders Header:**
- Clipboard icon followed by "MY ORDERS"
- Subtitle: "Track your order history and manage your purchases"

**Order Statistics (3-column grid):**
- Card 1: Shopping bag icon | Number: 5 | Label: "Total Orders"
- Card 2: Rupee icon | Number: ₹2,450 | Label: "Total Spent"
- Card 3: Book icon | Number: 12 | Label: "Books Ordered"

**Order History Section:**
- List of order cards, each containing:
  - **Order Card 1:**
    - Header: "Order #12345" | Date: "2025-10-25"
    - Status badge: "Shipped" (with appropriate color)
    - Horizontal divider
    - Order items list:
      - • Book Title 1 (x1) - ₹420
      - • Book Title 2 (x2) - ₹700
    - Footer: Total: ₹1,120 | "View Details" button
  
  - **Order Card 2:**
    - Header: "Order #12344" | Date: "2025-10-20"
    - Status badge: "Delivered" (with appropriate color)
    - Horizontal divider
    - Order items list:
      - • Book Title 3 (x1) - ₹600
    - Footer: Total: ₹600 | "View Details" button
  
  - (Additional order cards follow same pattern)

**Empty Orders State (shown when no orders exist):**
- Large clipboard icon (centered)
- Heading: "No orders yet"
- Text: "You haven't placed any orders yet. Start exploring our amazing collection!"
- "Browse Books" button with book icon

**Footer:** Same as homepage

---

### 5. About Us Page (client/about.html)

**Header/Navigation:** Same as homepage

**Hero Section:**
- Centered content:
  - Main heading: "About Readora"
  - Subtitle: "Turning pages into journeys, and readers into explorers."

**Mission Section:**
- Compass icon (centered at top)
- Heading: "OUR MISSION"
- Mission text: "At Readora, we believe that every book opens a door to a new world. Our mission is to help readers discover, explore, and enjoy books..."
- Card/container with padding and background

**Values Section:**
- Heading: "OUR VALUES"
- Grid of 3 value cards (or more):
  - Each card contains:
    - Icon at top
    - Value name (e.g., "Value 1", "Value 2", "Value 3")
    - Brief description (optional)
- Cards arranged horizontally

**Additional Content (optional):**
- Team section
- Story/History section
- Contact information

**Footer:** Same as homepage

---

### 6. Login Page (client/login.html)

**Layout:** Centered authentication form with gradient background

**Login Form Card:**
- White card container with rounded corners and shadow
- Centered on page vertically and horizontally
- Logo/Heading: "Readora" at top
- Form fields:
  - **Email Field:**
    - Label: "Email"
    - Text input box
  - **Password Field:**
    - Label: "Password"
    - Password input box
- Submit button: "Login" (full-width, primary style)
- Footer text: "Don't have an account?" with "Sign Up" link

**Background:** Gradient from background color to beige/brown tones

---

### 7. Sign Up Page (client/signup.html)

**Layout:** Centered authentication form with gradient background (similar to Login page)

**Sign Up Form Card:**
- White card container with rounded corners and shadow
- Centered on page vertically and horizontally
- Logo/Heading: "Readora" at top
- Form fields:
  - **Name Field:**
    - Label: "Name"
    - Text input box
  - **Email Field:**
    - Label: "Email"
    - Email input box
  - **Password Field:**
    - Label: "Password"
    - Password input box
  - **Confirm Password Field:**
    - Label: "Confirm Password"
    - Password input box
- Submit button: "Sign Up" (full-width, primary style)
- Footer text: "Already have an account?" with "Login" link

**Background:** Gradient from background color to beige/brown tones

---

## ADMIN-SIDE WIREFRAMES

### Global Admin Layout Structure

**Overall Layout:** Two-column layout with sidebar and main content area

**Mobile Menu Toggle:**
- Hamburger icon button (☰) at top for mobile devices
- Toggles sidebar visibility on smaller screens

**Left Sidebar (Fixed, collapsible on mobile):**
- **Sidebar Header:**
  - Logo/Text: "Readora Admin"
  
- **Navigation Menu:**
  - Dashboard (with chart icon) - can be active/highlighted
  - Manage Books (with book icon)
  - Orders (with shopping cart icon)
  - Customers (with users icon)
  - Analytics (with chart/bar icon)
  - Logout (at bottom, with sign-out icon)

**Right Main Content Area:**
- **Admin Header Bar:**
  - Page title on left (e.g., "Dashboard Overview", "Manage Books")
  - Admin info on right: "Welcome, Admin" with user icon
  
- **Content Section:**
  - Page-specific content (statistics, tables, forms, etc.)
  - Varies based on active page

**Responsive Behavior:**
- Desktop: Sidebar always visible
- Mobile/Tablet: Sidebar collapses, hamburger menu shows

---

### 8. Admin Dashboard (admin/dashboard.html)

**Uses Global Admin Layout**

**Admin Header:**
- Page title: "Dashboard Overview"
- Right side: "Welcome, Admin" with user icon

**Statistics Cards (4-column grid):**
- **Card 1:** Book icon | Number: 25 | Label: "Books"
- **Card 2:** Shopping cart icon | Number: 48 | Label: "Orders"
- **Card 3:** Rupee/Dollar icon | Number: 45,000 | Label: "Revenue"
- **Card 4:** Users icon | Number: 120 | Label: "Customers"
- Each card has colored icon area and white content area

**Recent Activity Section:**
- Heading: "Recent Orders"
- Table/List showing:
  - Order #123 | Customer Name | ₹500 | Status: Pending
  - Order #122 | Customer Name | ₹750 | Status: Shipped
  - Order #121 | Customer Name | ₹420 | Status: Delivered
- Limited to 5-10 most recent orders

**Sales Chart Section:**
- Heading: "Sales Chart / Revenue Graph"
- Large chart/graph visualization area
- Shows sales trends over time (line or bar chart)

**Additional Widgets (optional):**
- Popular books
- Customer insights
- Quick actions

---

### 9. Manage Books (admin/books.html)

**Uses Global Admin Layout**

**Admin Header:**
- Page title: "Manage Books"
- Right side: "+ Add New Book" button (primary, prominent)

**Top Selling Section:**
- Heading: "Top Selling"
- Horizontal row of 4 book cards
- Each shows book cover thumbnail
- Data loaded from top-selling.json

**Books Controls Bar:**
- Left side:
  - Search box with magnifying glass icon
  - Placeholder: "Search books by title, author, or category..."
- Center:
  - Category filter dropdown
  - Sort dropdown (Title/Author/Price/Category)
- Right side:
  - View toggle buttons: Grid icon and List icon
  - One is active/highlighted

**Books Display Grid:**
- Grid of book cards (3-4 columns)
- Each book card contains:
  - Book cover image
  - Title
  - Author
  - Price (₹)
  - Category
  - Edit button (pencil icon)
  - Delete button (trash icon)
- Responsive grid that adjusts for smaller screens

**Add/Edit Book Modal (Overlay):**
- Appears when adding new book or editing existing
- Modal heading: "Add New Book" or "Edit Book"
- Close button (×) in top right
- Form fields:
  - Title (text input)
  - Author (text input)
  - Price (number input)
  - Category (dropdown select)
  - Cover URL (text input)
- Action buttons: "Save" and "Cancel"
- Centered overlay with dark background behind

---

### 10. Orders Management (admin/orders.html)

**Uses Global Admin Layout**

**Admin Header:**
- Page title: "Order Management"
- Right side action buttons:
  - "Export Orders" button with download icon
  - "Refresh" button with refresh icon

**Order Statistics (4-column grid):**
- **Card 1:** Clock icon | Number: 12 | Label: "Pending Orders"
- **Card 2:** Checkmark icon | Number: 25 | Label: "Confirmed Orders"
- **Card 3:** Truck icon | Number: 18 | Label: "Shipped Orders"
- **Card 4:** Double-check icon | Number: 40 | Label: "Delivered Orders"
- Each card styled with status-appropriate colors

**Orders Table:**
- Full-width data table with columns:
  1. Order ID (e.g., #12345)
  2. Customer (name)
  3. Date (formatted)
  4. Total (₹)
  5. Status (colored badge: Pending/Confirmed/Shipped/Delivered)
  6. Actions (update icon button or dropdown)
- Table rows:
  - #12345 | John Doe | 10/25 | ₹840 | Pending badge | Update button
  - #12344 | Jane S. | 10/24 | ₹600 | Shipped badge | Update button
  - #12343 | Bob M. | 10/23 | ₹1.2K | Delivered badge | View button
  - #12342 | Alice P. | 10/22 | ₹450 | Confirmed badge | Update button
  - #12341 | Chris L. | 10/21 | ₹920 | Shipped badge | Update button
  - (More rows...)

**Pagination:**
- Bottom of table:
  - "< Previous" button
  - Page indicator: "Page 1 of 10"
  - "Next >" button

**Additional Features:**
- Sortable columns
- Clickable rows for order details
- Status update dropdown/modal

---

### 11. Customers Management (admin/customers.html)

**Uses Global Admin Layout**

**Admin Header:**
- Page title: "Customers"

**Search and Filter Bar:**
- Left side:
  - Search box with magnifying glass icon
  - Placeholder: "Search customers..."
- Right side:
  - Filter dropdown
  - Sort dropdown

**Customers Table:**
- Full-width data table with columns:
  1. Name (customer full name)
  2. Email (abbreviated if long, e.g., "j@..")
  3. Orders (number of orders placed)
  4. Total Spent (₹)
  5. Joined (date)
  6. Actions (view icon/button)
- Table rows:
  - John | j@.. | 5 | ₹2,450 | 10/20 | View button
  - Jane | ja.. | 3 | ₹1,200 | 10/18 | View button
  - Bob | b@.. | 8 | ₹4,500 | 10/15 | View button
  - Alice | a.. | 2 | ₹890 | 10/12 | View button
  - (More rows...)

**Pagination:**
- Bottom of table:
  - "< Previous" button
  - Page indicator: "Page 1 of 5"
  - "Next >" button

**Additional Features:**
- Sortable columns
- Customer detail view (modal or separate page)
- Export customer data option

---

### 12. Analytics Page (admin/analytics.html)

**Uses Global Admin Layout**

**Admin Header:**
- Page title: "Analytics"

**Key Metrics (3-column grid):**
- **Card 1:** Label: "Revenue" | Value: ₹45,000
- **Card 2:** Label: "Sales" | Value: 95
- **Card 3:** Label: "Growth" | Value: +23%
- Large numbers with emphasized styling

**Sales Trend Chart Section:**
- Heading: "Sales Trend Chart" or "Revenue Over Time"
- Large chart visualization area
- Line chart or bar chart showing sales/revenue trends
- X-axis: Time periods (days, weeks, months)
- Y-axis: Revenue or sales count
- Interactive chart with tooltips

**Category Performance Section:**
- Heading: "Category Performance"
- Pie chart or donut chart visualization
- Shows distribution of sales across book categories
- Different colored segments for each category
- Legend showing category names and percentages

**Best Selling Books Section:**
- Heading: "Best Selling Books"
- Ordered list or table:
  1. Book Title 1 - 50 sold
  2. Book Title 2 - 45 sold
  3. Book Title 3 - 38 sold
  - (Continue for top 5-10 books)
- Each row shows book name and units sold

**Additional Analytics (optional):**
- Customer acquisition trends
- Average order value
- Popular authors
- Revenue by time period comparison

---

### 13. Admin Login (admin/login.html)

**Layout:** Centered authentication form (similar to client login)

**Admin Login Form Card:**
- White card container with rounded corners and shadow
- Centered on page vertically and horizontally
- Lock icon (🔐) or shield icon
- Heading: "Admin Login" or "Readora Admin"
- Form fields:
  - **Username Field:**
    - Label: "Username"
    - Text input box
  - **Password Field:**
    - Label: "Password"
    - Password input box
- Submit button: "Admin Login" (full-width, primary style)
- Security notice (optional): "Authorized personnel only"

**Background:** Gradient or solid color background

**Security Features:**
- Session-based authentication check
- Redirect to dashboard after successful login
- Redirect to login if not authenticated on other admin pages

---

## COMMON ELEMENTS

### Loading State
- Full-screen overlay with semi-transparent background
- Centered Lottie animation (spinning loader or book animation)
- Dimensions: approximately 200px × 200px
- Blocks interaction until content loads
- Used on all pages during initial load

### Mobile Navigation (Collapsed)
- Compact header for mobile devices (< 768px width)
- Layout:
  - Left: "Readora" logo/text
  - Right: Hamburger menu icon (☰), Login, and Sign Up buttons
- When hamburger is clicked:
  - Overlay menu slides in from side
  - Dark overlay covers page content
  - Navigation links displayed vertically
  - Close button (X) to dismiss menu

### Desktop Navigation
- Full horizontal navigation bar
- All menu items visible inline
- Hover effects on links
- Sticky/fixed to top of page (optional)

---

## KEY INTERACTIONS

### Client Side:
1. **Browse → Filter → Add to Cart → Checkout**
2. **Search Books → View Results → Add to Cart**
3. **View Cart → Update Quantity → Remove Items → Checkout**
4. **View Orders → Track Status → View Details**
5. **Login/Signup → Access Protected Routes**

### Admin Side:
1. **Admin Login → Dashboard Overview**
2. **Manage Books → Add/Edit/Delete**
3. **View Orders → Update Status → Export**
4. **View Customers → Search/Filter**
5. **View Analytics → Charts & Reports**
6. **Mobile → Toggle Sidebar**

---

## RESPONSIVE BEHAVIOR

### Mobile (< 768px):
- Hamburger navigation
- Stacked layouts
- Full-width elements
- Collapsible admin sidebar

### Tablet (768px - 1024px):
- 2-column grids
- Condensed navigation
- Side-by-side admin sidebar

### Desktop (> 1024px):
- 3-4 column grids
- Full navigation menu
- Persistent admin sidebar
- Wider content areas

---

## DATA FLOW

### Books Database:
- Title, Author, Cover, Price, Category
- Stored in: `js/database.json`

### Top Selling:
- Featured books data
- Stored in: `js/top-selling.json`

### Cart:
- LocalStorage based
- Items, quantities, totals

### Orders:
- User order history
- Status tracking system

### Admin Data:
- Session-based authentication
- Real-time statistics
- CRUD operations

---
