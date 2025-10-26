// Admin Orders Management JavaScript
let orders = [];
let selectedOrders = new Set();
let currentOrderForStatus = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeOrdersPage();
    setupEventListeners();
});

function initializeOrdersPage() {
    loadOrders();
    updateStatistics();
    displayOrders();
}

function setupEventListeners() {
    // Search and filters
    document.getElementById('order-search').addEventListener('input', handleSearch);
    document.getElementById('status-filter').addEventListener('change', handleFilter);
    document.getElementById('date-filter').addEventListener('change', handleFilter);
    
    // Status form
    document.getElementById('status-form').addEventListener('submit', handleStatusUpdate);
    
    // Modal close on outside click
    document.getElementById('order-details-modal').addEventListener('click', (e) => {
        if (e.target.id === 'order-details-modal') {
            closeOrderDetailsModal();
        }
    });
    
    document.getElementById('status-modal').addEventListener('click', (e) => {
        if (e.target.id === 'status-modal') {
            closeStatusModal();
        }
    });
}

function loadOrders() {
    // Get orders from localStorage (from client-side orders)
    const storedOrders = localStorage.getItem('orders');
    orders = storedOrders ? JSON.parse(storedOrders) : [];
    
    // If no orders exist, generate sample data for demo
    if (orders.length === 0) {
        generateSampleOrders();
    }
    
    // Ensure all orders have proper structure
    orders = orders.map(order => ({
        id: String(order.id || getNextOrderId()),
        date: order.date || order.orderDate || new Date().toISOString(),
        customerName: order.customerName || order.customer?.name || 'Unknown Customer',
        customerEmail: order.customerEmail || order.customer?.email || 'unknown@email.com',
        customerPhone: order.customer?.phone || 'N/A',
        customerAddress: order.customer?.address || 'N/A',
        city: order.customer?.city || 'N/A',
        pincode: order.customer?.pincode || 'N/A',
        items: order.items || [],
        total: order.total || '₹0',
        status: order.status || 'pending',
        payment: order.payment || 'cod',
        notes: order.notes || []
    }));
}

function generateSampleOrders() {
    const sampleBooks = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, cover: "../images/book1.jpg" }
    ];
    
    const customer = { name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210' };
    
    // Create only 1 sample order
    const book = sampleBooks[0];
    const quantity = 2;
    const items = [{
        ...book,
        quantity: quantity
    }];
    const total = book.price * quantity;
    
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - 5); // 5 days ago
    
    orders.push({
        id: String(10001),
        date: orderDate.toISOString(),
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: '123 Main Street',
        city: 'Mumbai',
        pincode: '400001',
        items: items,
        total: `₹${total.toLocaleString()}`,
        status: 'confirmed',
        payment: 'cod',
        notes: []
    });
    
    localStorage.setItem('orders', JSON.stringify(orders));
}

function updateStatistics() {
    const pendingCount = orders.filter(order => order.status === 'pending').length;
    const confirmedCount = orders.filter(order => order.status === 'confirmed').length;
    const shippedCount = orders.filter(order => order.status === 'shipped').length;
    const deliveredCount = orders.filter(order => order.status === 'delivered').length;
    
    document.getElementById('pending-orders').textContent = pendingCount;
    document.getElementById('confirmed-orders').textContent = confirmedCount;
    document.getElementById('shipped-orders').textContent = shippedCount;
    document.getElementById('delivered-orders').textContent = deliveredCount;
}

function displayOrders() {
    const searchTerm = document.getElementById('order-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    let filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toString().includes(searchTerm) ||
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.customerEmail.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || order.status === statusFilter;
        
        let matchesDate = true;
        if (dateFilter) {
            const orderDate = new Date(order.date);
            const now = new Date();
            
            switch (dateFilter) {
                case 'today':
                    matchesDate = orderDate.toDateString() === now.toDateString();
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    matchesDate = orderDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    matchesDate = orderDate >= monthAgo;
                    break;
            }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });
    
    // Sort by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const tableBody = document.getElementById('orders-table-body');
    const emptyState = document.getElementById('empty-state');
    
    if (filteredOrders.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    tableBody.innerHTML = filteredOrders.map(order => {
        const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const itemsText = order.items.length === 1 ? 
            order.items[0].title : 
            `${order.items.length} items`;
        
        return `
            <tr class="${selectedOrders.has(order.id) ? 'selected' : ''}">
                <td>
              <input type="checkbox" class="order-checkbox" 
                  data-order-id="${order.id}" 
                  onchange="toggleOrderSelection('${order.id}')"
                  ${selectedOrders.has(order.id) ? 'checked' : ''}>
                </td>
                <td>#${order.id}</td>
                <td>
                    <div class="customer-info">
                        <div class="customer-name">${order.customerName}</div>
                        <div class="customer-email">${order.customerEmail}</div>
                    </div>
                </td>
                <td>${orderDate}</td>
                <td>
                    <div class="order-items">
                        <div>${itemsText}</div>
                        <div class="items-count">${order.items.reduce((sum, item) => sum + item.quantity, 0)} books</div>
                    </div>
                </td>
                <td>${order.total}</td>
                <td>
                    <span class="status-badge status-${order.status}">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </td>
                <td>
                    <div class="order-actions">
                        <button class="action-btn btn-view" onclick="viewOrderDetails('${order.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn btn-status" onclick="openStatusModal('${order.id}')" title="Update Status">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="deleteOrder('${order.id}')" title="Delete Order">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    updateBulkActions();
}

function handleSearch() {
    displayOrders();
}

function handleFilter() {
    displayOrders();
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.order-checkbox');
    
    if (selectAllCheckbox.checked) {
        checkboxes.forEach(checkbox => {
                const orderId = checkbox.dataset.orderId;
            selectedOrders.add(orderId);
            checkbox.checked = true;
            checkbox.closest('tr').classList.add('selected');
        });
    } else {
        selectedOrders.clear();
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('tr').classList.remove('selected');
        });
    }
    
    updateBulkActions();
}

function toggleOrderSelection(orderId) {
    if (selectedOrders.has(orderId)) {
        selectedOrders.delete(orderId);
    } else {
        selectedOrders.add(orderId);
    }
    
    const checkbox = document.querySelector(`[data-order-id="${orderId}"]`);
    const row = checkbox.closest('tr');
    
    if (selectedOrders.has(orderId)) {
        row.classList.add('selected');
    } else {
        row.classList.remove('selected');
    }
    
    // Update select all checkbox
    const totalCheckboxes = document.querySelectorAll('.order-checkbox').length;
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.checked = selectedOrders.size === totalCheckboxes;
    selectAllCheckbox.indeterminate = selectedOrders.size > 0 && selectedOrders.size < totalCheckboxes;
    
    updateBulkActions();
}

function updateBulkActions() {
    const bulkAction = document.getElementById('bulk-action');
    const applyBtn = document.querySelector('.apply-bulk-btn');
    const hasSelection = selectedOrders.size > 0;
    
    bulkAction.disabled = !hasSelection;
    applyBtn.disabled = !hasSelection;
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('order-details-modal');
    const content = document.getElementById('order-details-content');
    
    const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    content.innerHTML = `
        <div class="order-details-grid">
            <div class="details-section">
                <h4>Order Information</h4>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Date:</strong> ${orderDate}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></p>
                <p><strong>Payment:</strong> ${order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}</p>
                <p><strong>Total Amount:</strong> ${order.total}</p>
            </div>
            
            <div class="details-section">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> ${order.customerName}</p>
                <p><strong>Email:</strong> ${order.customerEmail}</p>
                <p><strong>Phone:</strong> ${order.customerPhone}</p>
                <p><strong>Address:</strong> ${order.customerAddress}</p>
                <p><strong>City:</strong> ${order.city}, ${order.pincode}</p>
            </div>
        </div>
        
        <div class="details-section">
            <h4>Order Items</h4>
            <div class="items-list">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.cover}" alt="${item.title}" class="item-image" onerror="this.src='../images/placeholder-book.jpg'">
                        <div class="item-details">
                            <div class="item-title">${item.title}</div>
                            <div class="item-author">by ${item.author}</div>
                            <div class="item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeOrderDetailsModal() {
    document.getElementById('order-details-modal').classList.remove('show');
}

function openStatusModal(orderId) {
    currentOrderForStatus = orderId;
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    document.getElementById('new-status').value = order.status;
    document.getElementById('status-note').value = '';
    document.getElementById('status-modal').classList.add('show');
}

function closeStatusModal() {
    document.getElementById('status-modal').classList.remove('show');
    currentOrderForStatus = null;
}

function handleStatusUpdate(e) {
    e.preventDefault();
    
    if (!currentOrderForStatus) return;
    
    const newStatus = document.getElementById('new-status').value;
    const note = document.getElementById('status-note').value;
    
    const orderIndex = orders.findIndex(o => o.id === currentOrderForStatus);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        
        if (note) {
            if (!orders[orderIndex].notes) orders[orderIndex].notes = [];
            orders[orderIndex].notes.push({
                date: new Date().toISOString(),
                note: note,
                type: 'status_update'
            });
        }
        
        // Update localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Refresh display
        updateStatistics();
        displayOrders();
        
        closeStatusModal();
        showNotification(`Order #${currentOrderForStatus} status updated to ${newStatus}`, 'success');
    }
}

function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
        return;
    }
    
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    updateStatistics();
    displayOrders();
    
    showNotification('Order deleted successfully', 'success');
}

function applyBulkAction() {
    const action = document.getElementById('bulk-action').value;
    if (!action || selectedOrders.size === 0) return;
    
    let confirmMessage = '';
    let newStatus = '';
    
    switch (action) {
        case 'confirm':
            confirmMessage = `Mark ${selectedOrders.size} orders as confirmed?`;
            newStatus = 'confirmed';
            break;
        case 'ship':
            confirmMessage = `Mark ${selectedOrders.size} orders as shipped?`;
            newStatus = 'shipped';
            break;
        case 'deliver':
            confirmMessage = `Mark ${selectedOrders.size} orders as delivered?`;
            newStatus = 'delivered';
            break;
        case 'cancel':
            confirmMessage = `Cancel ${selectedOrders.size} orders?`;
            newStatus = 'cancelled';
            break;
    }
    
    if (!confirm(confirmMessage)) return;
    
    orders.forEach(order => {
        if (selectedOrders.has(order.id)) {
            order.status = newStatus;
        }
    });
    
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear selections
    selectedOrders.clear();
    document.getElementById('select-all').checked = false;
    document.getElementById('bulk-action').value = '';
    
    updateStatistics();
    displayOrders();
    
    showNotification(`Bulk action applied successfully`, 'success');
}

function exportOrders() {
    const searchTerm = document.getElementById('order-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    let filteredOrders = orders;
    // Apply same filters as display
    filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toString().includes(searchTerm) ||
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.customerEmail.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || order.status === statusFilter;
        
        let matchesDate = true;
        if (dateFilter) {
            const orderDate = new Date(order.date);
            const now = new Date();
            
            switch (dateFilter) {
                case 'today':
                    matchesDate = orderDate.toDateString() === now.toDateString();
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    matchesDate = orderDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    matchesDate = orderDate >= monthAgo;
                    break;
            }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });
    
    const csvContent = generateCSV(filteredOrders);
    downloadCSV(csvContent, `orders-export-${new Date().toISOString().split('T')[0]}.csv`);
    
    showNotification('Orders exported successfully', 'success');
}

function generateCSV(orders) {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Customer Email', 'Items', 'Total', 'Status', 'Payment Method'];
    const rows = orders.map(order => [
        order.id,
        new Date(order.date).toLocaleDateString('en-IN'),
        order.customerName,
        order.customerEmail,
        order.items.map(item => `${item.title} (${item.quantity}x)`).join('; '),
        order.total,
        order.status,
        order.payment
    ]);
    
    return [headers, ...rows].map(row => 
        row.map(field => `"${field}"`).join(',')
    ).join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function refreshOrders() {
    showNotification('Refreshing orders...', 'info');
    
    // Add loading state
    document.getElementById('orders-table-body').classList.add('loading');
    
    setTimeout(() => {
        loadOrders();
        updateStatistics();
        displayOrders();
        
        document.getElementById('orders-table-body').classList.remove('loading');
        showNotification('Orders refreshed', 'success');
    }, 1000);
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