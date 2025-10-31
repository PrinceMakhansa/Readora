// Customer Management JavaScript

class CustomerManager {
    constructor() {
        this.customers = [];
        this.filteredCustomers = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentView = 'grid';
        this.currentFilter = '';
        this.currentStatus = '';
        this.currentSort = 'name';
        this.editingCustomer = null;
        
        this.init();
    }

    init() {
        this.loadCustomers();
        this.setupEventListeners();
        this.updateStats();
        this.renderCustomers();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('customer-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter = e.target.value.toLowerCase();
                this.filterAndRenderCustomers();
            });
        }

        // Status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentStatus = e.target.value;
                this.filterAndRenderCustomers();
            });
        }

        // Sort functionality
        const sortBy = document.getElementById('sort-by');
        if (sortBy) {
            sortBy.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.filterAndRenderCustomers();
            });
        }

        // View toggle
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Form submission
        const customerForm = document.getElementById('customerForm');
        if (customerForm) {
            customerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCustomer();
            });
        }

        // Modal close on outside click
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
    }

    loadCustomers() {
        // Load customers from localStorage or create sample data
        const savedCustomers = localStorage.getItem('readora_customers');
        if (savedCustomers) {
            this.customers = JSON.parse(savedCustomers);
        } else {
            // Sample customer data - keeping only 1 for demo
            this.customers = [
                {
                    id: 1,
                    name: 'John Smith',
                    email: 'john.smith@email.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Main St, City, State 12345',
                    status: 'active',
                    joinDate: '2024-01-15',
                    totalOrders: 5,
                    totalSpent: 1250,
                    notes: 'Frequent customer, prefers fiction books'
                }
            ];
            this.saveCustomers();
        }
        this.filteredCustomers = [...this.customers];
    }

    saveCustomers() {
        localStorage.setItem('readora_customers', JSON.stringify(this.customers));
    }

    filterAndRenderCustomers() {
        this.filteredCustomers = this.customers.filter(customer => {
            const matchesSearch = !this.currentFilter || 
                customer.name.toLowerCase().includes(this.currentFilter) ||
                customer.email.toLowerCase().includes(this.currentFilter) ||
                customer.phone.includes(this.currentFilter);
            
            const matchesStatus = !this.currentStatus || customer.status === this.currentStatus;
            
            return matchesSearch && matchesStatus;
        });

        this.sortCustomers();
        this.currentPage = 1;
        this.renderCustomers();
        this.updateStats();
    }

    sortCustomers() {
        this.filteredCustomers.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'email':
                    return a.email.localeCompare(b.email);
                case 'joinDate':
                    return new Date(b.joinDate) - new Date(a.joinDate);
                case 'orders':
                    return b.totalOrders - a.totalOrders;
                default:
                    return 0;
            }
        });
    }

    switchView(view) {
        this.currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // Update container class
        const container = document.getElementById('customers-container');
        if (view === 'list') {
            container.classList.add('list-view');
        } else {
            container.classList.remove('list-view');
        }
        
        this.renderCustomers();
    }

    renderCustomers() {
        const container = document.getElementById('customers-container');
        if (!container) return;

        if (this.filteredCustomers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>No customers found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const customersToShow = this.filteredCustomers.slice(startIndex, endIndex);

        container.innerHTML = customersToShow.map(customer => this.createCustomerCard(customer)).join('');
        this.renderPagination();
    }

    createCustomerCard(customer) {
        const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const joinDate = new Date(customer.joinDate).toLocaleDateString();
        
        return `
            <div class="customer-card">
                <div class="customer-header">
                    <div class="customer-avatar">${initials}</div>
                    <div class="customer-info">
                        <h3>${customer.name}</h3>
                        <p>${customer.email}</p>
                    </div>
                </div>
                <div class="customer-details">
                    <div class="customer-detail">
                        <i class="fas fa-phone"></i>
                        <span>${customer.phone || 'No phone'}</span>
                    </div>
                    <div class="customer-detail">
                        <i class="fas fa-calendar"></i>
                        <span>Joined: ${joinDate}</span>
                    </div>
                    <div class="customer-detail">
                        <i class="fas fa-shopping-cart"></i>
                        <span>${customer.totalOrders} orders</span>
                    </div>
                    <div class="customer-detail">
                        <i class="fas fa-rupee-sign"></i>
                        <span>₹${customer.totalSpent}</span>
                    </div>
                    <div class="customer-detail">
                        <i class="fas fa-tag"></i>
                        <span class="customer-status ${customer.status}">${customer.status}</span>
                    </div>
                </div>
                <div class="customer-actions">
                    <button class="action-btn view-btn-action" onclick="customerManager.viewCustomer(${customer.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="customerManager.editCustomer(${customer.id})" title="Edit Customer">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="customerManager.deleteCustomer(${customer.id})" title="Delete Customer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="customerManager.changePage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `
                    <button ${i === this.currentPage ? 'class="active"' : ''} onclick="customerManager.changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === 2 || i === totalPages - 1) {
                paginationHTML += '<span>...</span>';
            }
        }
        
        // Next button
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="customerManager.changePage(${this.currentPage + 1})">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
    }

    changePage(page) {
        this.currentPage = page;
        this.renderCustomers();
    }

    updateStats() {
        const totalCustomers = this.customers.length;
        const activeCustomers = this.customers.filter(c => c.status === 'active').length;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const newCustomers = this.customers.filter(c => {
            const joinDate = new Date(c.joinDate);
            return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
        }).length;
        const repeatCustomers = this.customers.filter(c => c.totalOrders > 1).length;

        // Update stat cards
        this.updateStatCard('total-customers', totalCustomers);
        this.updateStatCard('active-customers', activeCustomers);
        this.updateStatCard('new-customers', newCustomers);
        this.updateStatCard('repeat-customers', repeatCustomers);
    }

    updateStatCard(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Modal functions
    openAddCustomerModal() {
        this.editingCustomer = null;
        document.getElementById('modal-title').textContent = 'Add New Customer';
        document.getElementById('customerForm').reset();
        document.getElementById('customerModal').style.display = 'block';
    }

    editCustomer(id) {
        this.editingCustomer = this.customers.find(c => c.id === id);
        if (!this.editingCustomer) return;

        document.getElementById('modal-title').textContent = 'Edit Customer';
        document.getElementById('customer-name').value = this.editingCustomer.name;
        document.getElementById('customer-email').value = this.editingCustomer.email;
        document.getElementById('customer-phone').value = this.editingCustomer.phone || '';
        document.getElementById('customer-status').value = this.editingCustomer.status;
        document.getElementById('customer-address').value = this.editingCustomer.address || '';
        document.getElementById('customer-notes').value = this.editingCustomer.notes || '';
        
        document.getElementById('customerModal').style.display = 'block';
    }

    saveCustomer() {
        const formData = new FormData(document.getElementById('customerForm'));
        const customerData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            status: formData.get('status'),
            address: formData.get('address'),
            notes: formData.get('notes')
        };

        if (this.editingCustomer) {
            // Update existing customer
            Object.assign(this.editingCustomer, customerData);
        } else {
            // Add new customer
            const newCustomer = {
                id: Date.now(),
                ...customerData,
                joinDate: new Date().toISOString().split('T')[0],
                totalOrders: 0,
                totalSpent: 0
            };
            this.customers.push(newCustomer);
        }

        this.saveCustomers();
        this.filterAndRenderCustomers();
        this.closeCustomerModal();
        
        // Show success message
        this.showNotification(this.editingCustomer ? 'Customer updated successfully!' : 'Customer added successfully!');
    }

    deleteCustomer(id) {
        console.log('Attempting to delete customer with ID:', id, typeof id);
        console.log('Current customers:', this.customers);
        
        if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
            // Convert id to number to ensure type consistency
            const numericId = Number(id);
            const initialCount = this.customers.length;
            
            this.customers = this.customers.filter(c => {
                const customerId = Number(c.id);
                return customerId !== numericId;
            });
            
            const finalCount = this.customers.length;
            console.log(`Customers before delete: ${initialCount}, after delete: ${finalCount}`);
            
            if (finalCount < initialCount) {
                this.saveCustomers();
                this.filterAndRenderCustomers();
                this.showNotification('Customer deleted successfully!');
                console.log('Customer deleted successfully');
            } else {
                console.error('Customer not found for deletion. ID:', numericId);
                this.showNotification('Error: Customer not found!', 'error');
            }
        }
    }

    viewCustomer(id) {
        const customer = this.customers.find(c => c.id === id);
        if (!customer) return;

        const joinDate = new Date(customer.joinDate).toLocaleDateString();
        const content = `
            <div class="customer-profile">
                <div class="profile-header">
                    <div class="profile-avatar">${customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
                    <div class="profile-info">
                        <h2>${customer.name}</h2>
                        <span class="customer-status ${customer.status}">${customer.status}</span>
                    </div>
                </div>
                <div class="profile-details">
                    <div class="detail-section">
                        <h4>Contact Information</h4>
                        <p><strong>Email:</strong> ${customer.email}</p>
                        <p><strong>Phone:</strong> ${customer.phone || 'Not provided'}</p>
                        <p><strong>Address:</strong> ${customer.address || 'Not provided'}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Account Information</h4>
                        <p><strong>Member Since:</strong> ${joinDate}</p>
                        <p><strong>Total Orders:</strong> ${customer.totalOrders}</p>
                        <p><strong>Total Spent:</strong> ₹${customer.totalSpent}</p>
                    </div>
                    ${customer.notes ? `
                        <div class="detail-section">
                            <h4>Notes</h4>
                            <p>${customer.notes}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.getElementById('customer-details-content').innerHTML = content;
        document.getElementById('customerDetailsModal').style.display = 'block';
    }

    closeCustomerModal() {
        document.getElementById('customerModal').style.display = 'none';
    }

    closeCustomerDetailsModal() {
        document.getElementById('customerDetailsModal').style.display = 'none';
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    exportCustomers() {
        const csv = this.generateCSV();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        this.showNotification('Customers exported successfully!');
    }

    generateCSV() {
        const headers = ['Name', 'Email', 'Phone', 'Status', 'Join Date', 'Total Orders', 'Total Spent', 'Address', 'Notes'];
        const rows = this.customers.map(customer => [
            customer.name,
            customer.email,
            customer.phone || '',
            customer.status,
            customer.joinDate,
            customer.totalOrders,
            customer.totalSpent,
            customer.address || '',
            customer.notes || ''
        ]);
        
        return [headers, ...rows].map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n');
    }

    refreshCustomers() {
        this.loadCustomers();
        this.filterAndRenderCustomers();
        this.showNotification('Customer data refreshed!');
    }

    showNotification(message, type = 'success') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        const backgroundColor = type === 'error' ? '#dc3545' : 'var(--accent-color)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for onclick handlers
function openAddCustomerModal() {
    customerManager.openAddCustomerModal();
}

function closeCustomerModal() {
    customerManager.closeCustomerModal();
}

function closeCustomerDetailsModal() {
    customerManager.closeCustomerDetailsModal();
}

function exportCustomers() {
    customerManager.exportCustomers();
}

function refreshCustomers() {
    customerManager.refreshCustomers();
}

// Initialize customer manager when DOM is loaded
let customerManager;
document.addEventListener('DOMContentLoaded', () => {
    customerManager = new CustomerManager();
});

// Add notification keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .profile-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .profile-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        font-weight: 600;
    }
    
    .profile-info h2 {
        margin-bottom: 0.5rem;
        color: var(--primary-color);
    }
    
    .detail-section {
        margin-bottom: 1.5rem;
    }
    
    .detail-section h4 {
        color: var(--primary-color);
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
    }
    
    .detail-section p {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
`;
document.head.appendChild(style);
