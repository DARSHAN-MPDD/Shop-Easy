// Sample sales data
const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue: [8000, 9500, 7500, 11000, 10500, 12500],
    orders: [120, 145, 110, 160, 155, 180]
};

// Sample top products data
const topProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        image: "headphones.jpg",
        sales: 124
    },
    {
        id: 2,
        name: "Smart Watch",
        image: "smartwatch.jpg",
        sales: 98
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        image: "speaker.jpg",
        sales: 87
    },
    {
        id: 4,
        name: "Laptop Backpack",
        image: "backpack.jpg",
        sales: 76
    }
];

// Function to initialize the dashboard
function initDashboard() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize charts
    initCharts();
    
    // Render top products
    renderTopProducts();
}

// Function to set up event listeners
function setupEventListeners() {
    // Add any necessary event listeners here
}

// Function to initialize charts
function initCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('sales-chart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: salesData.labels,
                datasets: [
                    {
                        label: 'Revenue ($)',
                        data: salesData.revenue,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Orders',
                        data: salesData.orders,
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Revenue ($)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Orders'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
}

// Function to render top products
function renderTopProducts() {
    const topProductsContainer = document.querySelector('.top-products');
    
    if (!topProductsContainer) return;
    
    topProductsContainer.innerHTML = '';
    
    topProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-image">
                <img src="assets/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="product-sales">${product.sales} sold</div>
            </div>
        `;
        topProductsContainer.appendChild(productItem);
    });
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
    initDashboard();
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