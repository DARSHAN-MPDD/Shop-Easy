// Sample analytics data
const analyticsData = {
    sales: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        revenue: [8000, 9500, 7500, 11000, 10500, 12500],
        orders: [120, 145, 110, 160, 155, 180]
    },
    categories: {
        labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Accessories'],
        revenue: [35000, 18000, 12000, 8000, 7000]
    },
    topProducts: [
        {
            id: 1,
            name: "Wireless Headphones",
            image: "headphones.jpg",
            sales: 124,
            revenue: 12399.76
        },
        {
            id: 2,
            name: "Smart Watch",
            image: "smartwatch.jpg",
            sales: 98,
            revenue: 19599.02
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            image: "speaker.jpg",
            sales: 87,
            revenue: 6959.13
        },
        {
            id: 4,
            name: "Laptop Backpack",
            image: "backpack.jpg",
            sales: 76,
            revenue: 4559.24
        }
    ]
};

// Function to initialize the analytics page
function initAnalytics() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize charts
    initCharts();
    
    // Render top products
    renderTopProducts();
}

// Function to set up event listeners
function setupEventListeners() {
    const dateRangeSelector = document.getElementById('date-range');
    
    if (dateRangeSelector) {
        dateRangeSelector.addEventListener('change', function() {
            const days = parseInt(this.value);
            updateCharts(days);
        });
    }
}

// Function to initialize charts
function initCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('sales-chart');
    if (salesCtx) {
        window.salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: analyticsData.sales.labels,
                datasets: [
                    {
                        label: 'Revenue ($)',
                        data: analyticsData.sales.revenue,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Orders',
                        data: analyticsData.sales.orders,
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
    
    // Category Chart
    const categoryCtx = document.getElementById('category-chart');
    if (categoryCtx) {
        window.categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: analyticsData.categories.labels,
                datasets: [{
                    data: analyticsData.categories.revenue,
                    backgroundColor: [
                        '#007bff',
                        '#28a745',
                        '#ffc107',
                        '#dc3545',
                        '#6f42c1'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Function to update charts based on date range
function updateCharts(days) {
    // In a real application, this would fetch new data from the server
    // For this example, we'll just show an alert
    alert(`Charts updated for last ${days} days`);
}

// Function to render top products
function renderTopProducts() {
    const topProductsContainer = document.querySelector('.top-products');
    
    if (!topProductsContainer) return;
    
    topProductsContainer.innerHTML = '';
    
    analyticsData.topProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-image">
                <img src="assets/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="product-sales">${product.sales} sold</div>
                <div class="product-revenue">₹${(product.revenue * 75).toFixed(2)}</div>
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
    initAnalytics();
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