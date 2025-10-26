// Mobile Menu Script for Admin Pages
// Add this script to all admin pages for consistent mobile navigation

document.addEventListener('DOMContentLoaded', function() {
    console.log('admin-common.js: DOMContentLoaded');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    // Prevent double-binding if page also includes its own mobile menu script
    if (mobileMenuToggle && !mobileMenuToggle.dataset.mobileInit) {
        console.log('admin-common.js: initializing mobile menu');
        // mark as initialized to avoid duplicate handlers
        mobileMenuToggle.dataset.mobileInit = '1';

        mobileMenuToggle.addEventListener('click', function() {
            console.log('admin-common.js: mobileMenuToggle clicked');
            sidebar.classList.toggle('mobile-open');
            mainContent.classList.toggle('shifted');
            
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) &&
                sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
                mainContent.classList.remove('shifted');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }

    // Add some common admin functionality
    addNotificationSystem();
    addLoadingStates();
});

function addNotificationSystem() {
    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1002;
        pointer-events: none;
    `;
    document.body.appendChild(notificationContainer);
}

function addLoadingStates() {
    // Add loading state CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            color: var(--text-color);
            opacity: 0.7;
        }
        
        .loading-state i {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }
        
        .error-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            color: var(--text-color);
        }
        
        .error-state i {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }
        
        .notification {
            pointer-events: auto;
            margin-bottom: 1rem;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Global notification function
window.showNotification = function(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button onclick="this.parentNode.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(62, 44, 35, 0.1);
        border-left: 4px solid var(--accent-color);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 300px;
        font-family: 'Merriweather', serif;
    `;
    
    const colors = {
        'success': '#8D6E63',
        'error': '#C97C5D', 
        'warning': '#A0756B',
        'info': '#6B4F4F'
    };
    
    notification.style.borderLeftColor = colors[type];
    
    container.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 4000);
};

// Global loading functions
window.showLoadingState = function(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading...</p>
            </div>
        `;
    }
};

window.showErrorState = function(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn btn-primary">
                    <i class="fas fa-refresh"></i> Retry
                </button>
            </div>
        `;
    }
};

// --- Simple client-side admin auth helpers ---
// WARNING: This is client-side only and NOT secure for production.
// Intended for simple local/admin tooling only.
window.ADMIN_CREDENTIALS = { id: 'admin', pass: 'admin' };

window.doLogout = function() {
    try {
        sessionStorage.removeItem('adminLoggedIn');
    } catch (e) {
        console.warn('Could not clear sessionStorage', e);
    }
    // Redirect to login page
    window.location.href = 'login.html';
};

window.doLogin = function(id, pass) {
    // simple check against in-memory credentials
    if (id === window.ADMIN_CREDENTIALS.id && pass === window.ADMIN_CREDENTIALS.pass) {
        try {
            sessionStorage.setItem('adminLoggedIn', '1');
        } catch (e) { /* ignore */ }
        return { ok: true };
    }
    return { ok: false, message: 'Invalid credentials' };
};

window.checkAuth = function() {
    try {
        return !!sessionStorage.getItem('adminLoggedIn');
    } catch (e) {
        return false;
    }
};
