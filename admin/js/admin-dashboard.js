// Admin Dashboard JavaScript - rewritten for clarity, async loading and better validation
let cachedBooks = null; // will hold array of books loaded from ../js/database.json if available

document.addEventListener('DOMContentLoaded', async function () {
    showLoadingState();
    try {
        await initializeDashboard();
        console.log('Dashboard initialized successfully');
    } catch (err) {
        console.error('Dashboard initialization error:', err);
        showErrorState('Failed to initialize dashboard');
    } finally {
        hideLoadingState();
    }
});

async function initializeDashboard() {
    // Load book catalog (non-blocking for orders / stats but useful for totals)
    await loadBooksForDashboard();

    updateStats();
    await loadRecentOrders();
    updateQuickStats();
}

function showLoadingState() {
    const loadingElements = document.querySelectorAll('.stat-card, .dashboard-card');
    loadingElements.forEach(el => {
        el.style.opacity = '0.7';
        el.style.pointerEvents = 'none';
    });
}

function hideLoadingState() {
    const loadingElements = document.querySelectorAll('.stat-card, .dashboard-card');
    loadingElements.forEach(el => {
        el.style.opacity = '';
        el.style.pointerEvents = '';
    });
}

function showErrorState(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
        <button onclick="location.reload()" class="btn btn-primary">
            <i class="fas fa-refresh"></i> Retry
        </button>
    `;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fff;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        border-left: 4px solid #C97C5D;
        z-index: 10002;
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 6000);
}

async function loadBooksForDashboard() {
    // Try fetching the project's database.json so dashboard numbers are accurate.
    // If unavailable (file:// or network error), cachedBooks stays null and we fall back to static list.
    try {
        const resp = await fetch('../js/database.json', { cache: 'no-store' });
        if (!resp.ok) throw new Error('database.json not found');
        const data = await resp.json();
        if (!Array.isArray(data)) throw new Error('Invalid database.json format');

        // Normalize minimal fields
        cachedBooks = data.map((b, i) => ({
            id: b.id || i + 1,
            title: b.title || b.name || 'Untitled',
            author: b.author || 'Unknown',
            price: Number(b.price) || 0,
            category: b.category || 'Uncategorized',
            image: b.cover || b.image || '../images/placeholder-book.jpg'
        }));
    } catch (err) {
        // keep cachedBooks null to indicate fallback to static list
        console.info('Could not load database.json for dashboard; using fallback catalog.', err && err.message);
        cachedBooks = null;
    }
}

function getBooks() {
    // If we loaded a JSON catalog, return it, otherwise return the static fallback list
    if (Array.isArray(cachedBooks) && cachedBooks.length > 0) return cachedBooks;

    return [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, category: "Fiction", image: "../images/book1.jpg" },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, category: "Fiction", image: "../images/book2.jpg" },
        { id: 3, title: "1984", author: "George Orwell", price: 279, category: "Fiction", image: "../images/book3.jpg" },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 329, category: "Romance", image: "../images/book4.jpg" },
        { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 299, category: "Fiction", image: "../images/book5.jpg" },
        { id: 6, title: "Lord of the Flies", author: "William Golding", price: 269, category: "Fiction", image: "../images/book6.jpg" },
        { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", price: 399, category: "Fantasy", image: "../images/book7.jpg" },
        { id: 8, title: "Fahrenheit 451", author: "Ray Bradbury", price: 289, category: "Science Fiction", image: "../images/book8.jpg" },
        { id: 9, title: "Jane Eyre", author: "Charlotte Brontë", price: 319, category: "Romance", image: "../images/book9.jpg" },
        { id: 10, title: "The Alchemist", author: "Paulo Coelho", price: 259, category: "Philosophy", image: "../images/book10.jpg" },
        { id: 11, title: "Brave New World", author: "Aldous Huxley", price: 309, category: "Science Fiction", image: "../images/book11.jpg" },
        { id: 12, title: "The Picture of Dorian Gray", author: "Oscar Wilde", price: 289, category: "Fiction", image: "../images/book12.jpg" },
        { id: 13, title: "Wuthering Heights", author: "Emily Brontë", price: 299, category: "Romance", image: "../images/book13.jpg" },
        { id: 14, title: "The Lord of the Rings", author: "J.R.R. Tolkien", price: 599, category: "Fantasy", image: "../images/book14.jpg" },
        { id: 15, title: "Animal Farm", author: "George Orwell", price: 199, category: "Fiction", image: "../images/book15.jpg" },
        { id: 16, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", price: 379, category: "Fiction", image: "../images/book16.jpg" },
        { id: 17, title: "The Kite Runner", author: "Khaled Hosseini", price: 329, category: "Fiction", image: "../images/book17.jpg" },
        { id: 18, title: "The Da Vinci Code", author: "Dan Brown", price: 359, category: "Thriller", image: "../images/book18.jpg" },
        { id: 19, title: "The Hunger Games", author: "Suzanne Collins", price: 299, category: "Young Adult", image: "../images/book19.jpg" },
        { id: 20, title: "Life of Pi", author: "Yann Martel", price: 289, category: "Fiction", image: "../images/book20.jpg" },
        { id: 21, title: "The Book Thief", author: "Markus Zusak", price: 339, category: "Fiction", image: "../images/book21.jpg" },
        { id: 22, title: "The Fault in Our Stars", author: "John Green", price: 269, category: "Young Adult", image: "../images/book22.jpg" },
        { id: 23, title: "Gone Girl", author: "Gillian Flynn", price: 349, category: "Thriller", image: "../images/book23.jpg" },
        { id: 24, title: "The Help", author: "Kathryn Stockett", price: 319, category: "Fiction", image: "../images/book24.jpg" },
        { id: 25, title: "Where the Crawdads Sing", author: "Delia Owens", price: 379, category: "Fiction", image: "../images/book25.jpg" }
    ];
}

function safeParseLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (err) {
        console.warn(`Invalid JSON in localStorage for key: ${key}`);
        return [];
    }
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const startValue = 0;
    const duration = 900;
    const startTime = performance.now();

    function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (Number(targetValue) - startValue) * progress);
        element.textContent = Number.isFinite(currentValue) ? currentValue.toLocaleString() : '0';
        if (progress < 1) requestAnimationFrame(updateCounter);
    }

    requestAnimationFrame(updateCounter);
}

function animateCounterCurrency(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const startValue = 0;
    const duration = 900;
    const startTime = performance.now();

    function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (Number(targetValue) - startValue) * progress);
        element.textContent = formatCurrency(currentValue);
        if (progress < 1) requestAnimationFrame(updateCounter);
    }

    requestAnimationFrame(updateCounter);
}

function formatCurrency(amount) {
    if (!Number.isFinite(amount)) amount = 0;
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

async function loadRecentOrders() {
    try {
        const orders = safeParseLocalStorage('orders');
        const recentOrdersContainer = document.getElementById('recent-orders');
        if (!recentOrdersContainer) return;

        recentOrdersContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading orders...</div>';

        // small artificial delay for UX (keeps same behavior as before)
        await new Promise(r => setTimeout(r, 200));

        if (!Array.isArray(orders) || orders.length === 0) {
            recentOrdersContainer.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No recent orders</p>
                </div>`;
            return;
        }

        const validOrders = orders.filter(o => o && o.id && (o.customerName || o.customerEmail) && (o.total !== undefined));
        const recentOrders = validOrders
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .slice(0, 5);

        recentOrdersContainer.innerHTML = recentOrders.map(order => {
            const total = Number(order.total) || 0;
            const status = (order.status || 'pending').toLowerCase();
            return `
                <div class="order-item" onclick="viewOrderDetails('${order.id}')">
                    <div class="order-info">
                        <h4>Order #${order.id}</h4>
                        <p>${(order.customerName || order.customerEmail || 'Unknown Customer')} - ${formatCurrency(total)}</p>
                        <small class="order-date">${formatDate(order.orderDate)}</small>
                    </div>
                    <span class="order-status ${status}">${status.toUpperCase()}</span>
                </div>`;
        }).join('');

    } catch (err) {
        console.error('Error loading recent orders:', err);
        const recentOrdersContainer = document.getElementById('recent-orders');
        if (recentOrdersContainer) recentOrdersContainer.innerHTML = '<div class="no-data">Error loading orders</div>';
    }
}

function formatDate(dateString) {
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return 'Unknown date';
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (_) {
        return 'Unknown date';
    }
}

function viewOrderDetails(orderId) {
    window.location.href = `orders.html?id=${orderId}`;
}

function updateStats() {
    try {
        const orders = safeParseLocalStorage('orders');
        const books = getBooks();

        const totalOrders = Array.isArray(orders) ? orders.length : 0;
        const totalRevenue = (Array.isArray(orders) ? orders : []).reduce((s, o) => s + (Number(o.total) || 0), 0);
        const uniqueCustomers = Array.isArray(orders) && orders.length > 0 ? [...new Set(orders.map(o => o.customerEmail || o.customerName).filter(Boolean))].length : 0;

        animateCounter('total-books', Array.isArray(books) ? books.length : 0);
        animateCounter('total-orders', totalOrders);
        animateCounterCurrency('total-revenue', totalRevenue);
        animateCounter('total-customers', uniqueCustomers);
    } catch (err) {
        console.error('Error updating stats:', err);
        const setZero = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
        setZero('total-books','0'); setZero('total-orders','0'); setZero('total-revenue', '₹0'); setZero('total-customers','0');
    }
}

function updateQuickStats() {
    const orders = safeParseLocalStorage('orders');
    const today = new Date().toDateString();

    const ordersToday = (orders || []).filter(o => new Date(o.orderDate).toDateString() === today).length;
    const revenueToday = (orders || []).filter(o => new Date(o.orderDate).toDateString() === today).reduce((s, o) => s + (Number(o.total) || 0), 0);
    const pendingOrders = (orders || []).filter(o => (o.status || '').toLowerCase() === 'pending').length;

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setText('orders-today', ordersToday);
    setText('revenue-today', formatCurrency(revenueToday));
    setText('pending-orders', pendingOrders);
}

function getTopCategories() {
    const orders = safeParseLocalStorage('orders');
    const categoryCount = {};
    (orders || []).forEach(order => {
        if (!Array.isArray(order.items)) return;
        order.items.forEach(item => {
            const category = item && (item.category || 'Unknown');
            const qty = Number(item && item.quantity) || 0;
            if (!categoryCount[category]) categoryCount[category] = 0;
            categoryCount[category] += qty;
        });
    });

    return Object.entries(categoryCount).sort((a,b)=> b[1]-a[1]).slice(0,5).map(([category,count])=> ({category, count}));
}

function generateReport() {
    const orders = safeParseLocalStorage('orders');
    const books = getBooks();

    const totalRevenue = (orders || []).reduce((s,o)=> s + (Number(o.total)||0), 0);
    const avgOrder = orders && orders.length ? (totalRevenue / orders.length).toFixed(2) : '0.00';

    const reportData = {
        generatedDate: new Date().toLocaleDateString(),
        totalBooks: Array.isArray(books) ? books.length : 0,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalRevenue: totalRevenue,
        averageOrderValue: avgOrder,
        topCategories: getTopCategories(),
        recentOrders: (orders || []).slice(-10).reverse()
    };

    const reportContent = generateReportContent(reportData);
    downloadReport(reportContent);
}

function generateReportContent(data) {
    return `READORA ADMIN REPORT\nGenerated on: ${data.generatedDate}\n\nOVERVIEW:\n---------\nTotal Books in Catalog: ${data.totalBooks}\nTotal Orders Received: ${data.totalOrders}\nTotal Revenue: ${formatCurrency(data.totalRevenue)}\nAverage Order Value: ${formatCurrency(Number(data.averageOrderValue))}\n\nTOP CATEGORIES:\n--------------\n${data.topCategories.map(cat => `${cat.category}: ${cat.count} sales`).join('\n')}\n\nRECENT ORDERS:\n-------------\n${data.recentOrders.map(order => `Order #${order.id} - ${order.customerName || order.customerEmail || 'Unknown'} - ${formatCurrency(Number(order.total)||0)} - ${order.status||'N/A'}`).join('\n')}\n\nReport generated by Readora Admin System`;
}

function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `readora-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    showNotification('Report generated successfully!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">×</button>`;
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'}; color: white; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 10001; display:flex; align-items:center; gap:1rem; animation: slideIn 0.3s ease;`;
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .notification button { background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; padding: 0; width: 20px; height: 20px; display:flex; align-items:center; justify-content:center; }`;
        document.head.appendChild(style);
    }
    document.body.appendChild(notification);
    setTimeout(() => { if (notification.parentElement) notification.remove(); }, 5000);
}