// Function to handle admin login form submission
function handleAdminLogin() {
    const adminLoginForm = document.getElementById('admin-login-form');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            
            // In a real application, this would be sent to a server for authentication
            if (username && password) {
                // For this example, we'll use a simple check
                if (username === 'admin' && password === 'password') {
                    // Redirect to admin dashboard
                    window.location.href = 'admin-dashboard.html';
                } else {
                    alert('Invalid username or password.');
                }
            } else {
                alert('Please fill in all required fields.');
            }
        });
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

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleAdminLogin();
    handleNavigation();
});