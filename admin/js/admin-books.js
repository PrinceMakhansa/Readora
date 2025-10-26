// Admin Books Management JavaScript - Enhanced for Readora
let books = [];
let topJsonEntries = []; // entries loaded from js/top-selling.json (optional)
let currentEditId = null;
let currentDeleteId = null;
let currentView = 'grid';
let isLoading = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeBooksPage();
    setupEventListeners();
});

async function initializeBooksPage() {
    try {
        showLoadingState();
        await loadBooks();
        displayBooks();
        renderTopSellingFromBooks();
        hideLoadingState();
        showNotification('Books loaded successfully', 'success');
    } catch (error) {
        console.error('Error initializing books page:', error);
        showNotification('Failed to load books', 'error');
        hideLoadingState();
    }
}

function showLoadingState() {
    isLoading = true;
    const container = document.getElementById('books-container');
    if (container) {
        container.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading books...</p>
            </div>
        `;
    }
}

function hideLoadingState() {
    isLoading = false;
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('book-search').addEventListener('input', handleSearch);
    document.getElementById('category-filter').addEventListener('change', handleFilter);
    document.getElementById('sort-by').addEventListener('change', handleSort);
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentView = e.target.closest('.view-btn').dataset.view;
            updateViewButtons();
            displayBooks();
        });
    });
    
    // Form submission
    document.getElementById('book-form').addEventListener('submit', handleFormSubmit);
    
    // Modal close on outside click
    document.getElementById('book-modal').addEventListener('click', (e) => {
        if (e.target.id === 'book-modal') {
            closeBookModal();
        }
    });
    
    document.getElementById('delete-modal').addEventListener('click', (e) => {
        if (e.target.id === 'delete-modal') {
            closeDeleteModal();
        }
    });
}

async function loadBooks() {
    // Try to fetch the books data from the project's JSON files
    try {
        // fetch database + top-selling in parallel
        const [dbResp, topResp] = await Promise.all([
            fetch('../js/database.json', { cache: 'no-store' }).catch(() => null),
            fetch('../js/top-selling.json', { cache: 'no-store' }).catch(() => null)
        ]);

        if (!dbResp || !dbResp.ok) throw new Error('Failed to fetch database.json');
        const dbData = await dbResp.json();

        // Normalize DB items into the shape the UI expects; include `top` flag if present
        let nextId = 1;
        books = dbData.map(item => ({
            id: item.id || nextId++,
            title: item.title || 'Untitled',
            author: item.author || 'Unknown',
            price: item.price || 0,
            category: item.category || 'Uncategorized',
            image: item.cover || item.image || '../images/placeholder-book.jpg',
            description: item.description || '',
            stock: item.stock || 0,
            isbn: item.isbn || '',
            top: !!item.top // optional flag in database.json to mark top-selling
        }));
        // If top-selling.json is available, merge it: mark books that match by title (case-insensitive)
        topJsonEntries = [];
        if (topResp && topResp.ok) {
            try {
                const topData = await topResp.json();
                if (Array.isArray(topData)) {
                    topJsonEntries = topData;
                    const topTitles = new Set(topData.map(t => (t.title || '').toLowerCase()));
                    books.forEach(b => {
                        if (!b.top && topTitles.has((b.title || '').toLowerCase())) b.top = true;
                    });
                }
            } catch (e) {
                console.warn('top-selling.json parse failed', e);
            }
        }
    } catch (err) {
        console.error('Error loading JSON data:', err);
        // fallback: keep current in-memory books array if any
        if (!books || books.length === 0) {
            books = [];
        }
    }
}

function displayBooks() {
    const container = document.getElementById('books-container');
    const searchTerm = document.getElementById('book-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    
    // Filter books
    let filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm) ||
                            book.category.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || book.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    // Sort books
    filteredBooks.sort((a, b) => {
        switch(sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            case 'price':
                return a.price - b.price;
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });
    
    // Update container classes
    container.className = `books-grid ${currentView}-view`;
    
    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No Books Found</h3>
                <p>No books match your current search criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredBooks.map(book => {
        const isTop = !!book.top;
        const topBadge = isTop ? `<span class="top-badge" aria-hidden="true">Top</span>` : '';
        return (`
        <div class="book-card">
            <img src="${book.image}" alt="${book.title}" class="book-image" onerror="this.src='../images/placeholder-book.jpg'">
            <div class="book-info">
                ${currentView === 'list' ? '<div class="book-details">' : ''}
                    <h3 class="book-title">${book.title} ${topBadge}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <span class="book-category">${book.category}</span>
                    <div class="book-price">₹${book.price}</div>
                    ${currentView === 'list' ? `<p class="book-stock">Stock: ${book.stock}</p>` : ''}
                ${currentView === 'list' ? '</div>' : ''}
                <div class="book-actions">
                    <button class="action-btn btn-view" onclick="viewBook(${book.id})" title="View Details">
                        <i class="fas fa-eye"></i> ${currentView === 'list' ? 'View' : ''}
                    </button>
                    <button class="action-btn btn-edit" onclick="editBook(${book.id})" title="Edit Book">
                        <i class="fas fa-edit"></i> ${currentView === 'list' ? 'Edit' : ''}
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteBook(${book.id})" title="Delete Book">
                        <i class="fas fa-trash"></i> ${currentView === 'list' ? 'Delete' : ''}
                    </button>
                </div>
            </div>
        </div>
    `);
    }).join('');
}

// Render top selling section
// Render top selling section from current `books` array (admin-controlled via `book.top` flag)
function renderTopSellingFromBooks() {
    const container = document.getElementById('top-selling-container');
    if (!container) return;

    const topFromBooks = books.filter(b => b.top);
    // Find extra entries from topJsonEntries that are not present in books (match by title)
    const bookTitles = new Set(books.map(b => (b.title || '').toLowerCase()));
    const extraFromJson = Array.isArray(topJsonEntries) ? topJsonEntries.filter(t => {
        const ttl = (t.title || '').toLowerCase();
        return ttl && !bookTitles.has(ttl);
    }) : [];

    const combined = [...topFromBooks, ...extraFromJson].slice(0, 8);
    if (combined.length === 0) {
        container.innerHTML = `<p class="muted">No top selling books configured. Mark books as "Top Selling" in the admin modal or add entries to js/top-selling.json.</p>`;
        return;
    }

    container.innerHTML = combined.map(item => {
        // item may be a book object (from books) or a raw JSON entry (from topJsonEntries)
        const img = item.image || item.cover || '../images/placeholder-book.jpg';
        const title = item.title || item.name || 'Untitled';
        const author = item.author || '';
        const price = item.price || '';
        return `
        <div class="top-card" title="${title}">
            <img src="${img}" alt="${title}" onerror="this.src='../images/placeholder-book.jpg'">
            <div class="top-info">
                <div class="top-title">${title}</div>
                <div class="top-author">${author}</div>
                <div class="top-price">${price ? '₹' + price : ''}</div>
            </div>
        </div>`;
    }).join('');
}

function handleSearch() {
    displayBooks();
}

function handleFilter() {
    displayBooks();
}

function handleSort() {
    displayBooks();
}

function updateViewButtons() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === currentView) {
            btn.classList.add('active');
        }
    });
}

function openAddBookModal() {
    currentEditId = null;
    document.getElementById('modal-title').textContent = 'Add New Book';
    document.getElementById('submit-btn').textContent = 'Add Book';
    document.getElementById('book-form').reset();
    document.getElementById('book-modal').classList.add('show');
}

function editBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    currentEditId = id;
    document.getElementById('modal-title').textContent = 'Edit Book';
    document.getElementById('submit-btn').textContent = 'Update Book';
    
    // Populate form
    document.getElementById('book-title').value = book.title;
    document.getElementById('book-author').value = book.author;
    document.getElementById('book-price').value = book.price;
    document.getElementById('book-category').value = book.category;
    document.getElementById('book-image').value = book.image;
    document.getElementById('book-stock').value = book.stock;
    // populate top selling checkbox
    const topCheckbox = document.getElementById('book-top');
    if (topCheckbox) topCheckbox.checked = !!book.top;
    
    document.getElementById('book-modal').classList.add('show');
}

function viewBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    // Create a detailed view modal (you could expand this)
    alert(`Book Details:\n\nTitle: ${book.title}\nAuthor: ${book.author}\nCategory: ${book.category}\nPrice: ₹${book.price}\nStock: ${book.stock}`);
}

function deleteBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    currentDeleteId = id;
    document.getElementById('delete-book-title').textContent = book.title;
    document.getElementById('delete-modal').classList.add('show');
}

function confirmDelete() {
    if (currentDeleteId) {
        books = books.filter(b => b.id !== currentDeleteId);
        displayBooks();
        closeDeleteModal();
        showNotification('Book deleted successfully!', 'success');
    }
}

function closeBookModal() {
    document.getElementById('book-modal').classList.remove('show');
    currentEditId = null;
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('show');
    currentDeleteId = null;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('book-title').value.trim(),
        author: document.getElementById('book-author').value.trim(),
        price: parseFloat(document.getElementById('book-price').value),
        category: document.getElementById('book-category').value,
        image: document.getElementById('book-image').value.trim() || '../images/placeholder-book.jpg',
        stock: parseInt(document.getElementById('book-stock').value) || 0,
            // Build base form data (only fields present in the modal)
            description: currentEditId ? books.find(b => b.id === currentEditId).description : '',
            isbn: currentEditId ? books.find(b => b.id === currentEditId).isbn : '',
        top: document.getElementById('book-top') ? !!document.getElementById('book-top').checked : false
    };
    
    if (currentEditId) {
        // Update existing book
        const bookIndex = books.findIndex(b => b.id === currentEditId);
        if (bookIndex !== -1) {
            books[bookIndex] = { ...books[bookIndex], ...formData };
            showNotification('Book updated successfully!', 'success');
        }
    } else {
        // Add new book
        const newId = Math.max(...books.map(b => b.id), 0) + 1;
            books.push({ id: newId, description: '', isbn: '', ...formData });
        showNotification('Book added successfully!', 'success');
    }
    
    displayBooks();
    renderTopSellingFromBooks();
    closeBookModal();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}