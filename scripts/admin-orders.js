// Sample order data for admin
const adminOrders = [
    {
        id: "12345",
        customer: "John Doe",
        date: "2023-06-15",
        total: 199.99,
        status: "delivered"
    },
    {
        id: "12344",
        customer: "Jane Smith",
        date: "2023-06-14",
        total: 89.99,
        status: "shipped"
    },
    {
        id: "12343",
        customer: "Robert Johnson",
        date: "2023-06-14",
        total: 149.99,
        status: "processing"
    },
    {
        id: "12342",
        customer: "Emily Davis",
        date: "2023-06-13",
        total: 79.99,
        status: "delivered"
    },
    {
        id: "12341",
        customer: "Michael Wilson",
        date: "2023-06-12",
        total: 299.99,
        status: "pending"
    }
];

// Function to render orders table
function renderOrdersTable() {
    const tableBody = document.querySelector('.orders-table tbody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    adminOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>₹${(order.total * 75).toFixed(2)}</td>
            <td>
                <select class="status-select" data-order-id="${order.id}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button class="view-button">View</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to status selects
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', function() {
            const orderId = this.getAttribute('data-order-id');
            const newStatus = this.value;
            updateOrderStatus(orderId, newStatus);
        });
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td:first-child').textContent.replace('#', '');
            viewOrderDetails(orderId);
        });
    });
}

// Function to update order status
function updateOrderStatus(orderId, newStatus) {
    // In a real application, this would send a request to the server
    const order = adminOrders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        alert(`Order #${orderId} status updated to ${newStatus}`);
    }
}

// Function to view order details
function viewOrderDetails(orderId) {
    // In a real application, this would show a modal or navigate to a details page
    const order = adminOrders.find(o => o.id === orderId);
    if (order) {
        alert(`Order Details:\nOrder ID: #${order.id}\nCustomer: ${order.customer}\nDate: ${order.date}\nTotal: ₹${(order.total * 75).toFixed(2)}\nStatus: ${order.status}`);
    }
}

// Function to handle navigation
function handleNavigation() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Function to handle logout
function handleLogout() {
    const logoutLink = document.querySelector('nav a[href="admin-login.html"]');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                // In a real application, this would destroy the session
                window.location.href = 'admin-login.html';
            }
        });
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderOrdersTable();
    handleNavigation();
    handleLogout();
    
    // Initialize login icon when DOM is loaded
    const loginIcon = document.getElementById('loginIcon');
    
    if (loginIcon) {
        // Add hover effect
        loginIcon.addEventListener('mouseenter', function() {
            this.classList.add('animated');
        });
        
        loginIcon.addEventListener('mouseleave', function() {
            this.classList.remove('animated');
        });
        
        // Add click functionality to go to account page
        loginIcon.addEventListener('click', function() {
            window.location.href = 'account.html';
        });
    }
});