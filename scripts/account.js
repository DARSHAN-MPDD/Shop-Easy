// Sample order history data
const orderHistory = [
    {
        id: "12345",
        date: "June 15, 2023",
        total: 199.99,
        status: "Delivered"
    },
    {
        id: "12344",
        date: "June 14, 2023",
        total: 89.99,
        status: "Shipped"
    }
];

// Sample saved addresses data
const savedAddresses = [
    {
        id: 1,
        name: "Home Address",
        line1: "123 Main Street",
        line2: "",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States"
    }
];

// Sample wishlist data
const wishlistItems = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "headphones.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "smartwatch.jpg"
    }
];

// Function to handle tab switching
function handleTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and forms
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            document.getElementById(`${tab}-form`).classList.add('active');
        });
    });
}

// Function to handle login form submission
function handleLogin() {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Validate inputs
      if (!email || !password) {
        alert('Please fill in all required fields.');
        return;
      }
      
      try {
        // Send login request to backend
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          }));
          
          // Hide auth section and show account dashboard
          document.getElementById('auth-section').style.display = 'none';
          document.getElementById('account-dashboard').style.display = 'block';
          
          // Render account dashboard content
          setTimeout(() => {
            renderOrderHistory();
            renderSavedAddresses();
            renderWishlist();
          }, 100);
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      }
    });
  }
}

// Function to handle signup form submission
function handleSignup() {
  const signupForm = document.getElementById('signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('signup-email').value;
      const firstName = document.getElementById('signup-first-name').value;
      const lastName = document.getElementById('signup-last-name').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      
      // Validate inputs
      if (!email || !firstName || !lastName || !password || !confirmPassword) {
        alert('Please fill in all required fields.');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      
      try {
        // Send signup request to backend
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName, email, password, confirmPassword })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          }));
          
          // Hide auth section and show account dashboard
          document.getElementById('auth-section').style.display = 'none';
          document.getElementById('account-dashboard').style.display = 'block';
          
          // Render account dashboard content
          setTimeout(() => {
            renderOrderHistory();
            renderSavedAddresses();
            renderWishlist();
          }, 100);
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during registration. Please try again.');
      }
    });
  }
}

// Function to render order history
function renderOrderHistory() {
    const orderHistoryContainer = document.querySelector('.order-history');
    
    if (!orderHistoryContainer) return;
    
    orderHistoryContainer.innerHTML = '';
    
    orderHistory.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-details">
                <div class="order-id">Order #${order.id}</div>
                <div class="order-date">${order.date}</div>
                <div class="order-total">$${order.total.toFixed(2)}</div>
                <div class="order-status">${order.status}</div>
            </div>
            <div class="order-actions">
                <button class="view-order">View Details</button>
            </div>
        `;
        orderHistoryContainer.appendChild(orderItem);
    });
}

// Function to render saved addresses
function renderSavedAddresses() {
    const savedAddressesContainer = document.querySelector('.saved-addresses');
    
    if (!savedAddressesContainer) return;
    
    savedAddressesContainer.innerHTML = '';
    
    savedAddresses.forEach(address => {
        const addressItem = document.createElement('div');
        addressItem.className = 'address-item';
        addressItem.innerHTML = `
            <div class="address-details">
                <div class="address-name">${address.name}</div>
                <div class="address-line">${address.line1}</div>
                ${address.line2 ? `<div class="address-line">${address.line2}</div>` : ''}
                <div class="address-line">${address.city}, ${address.state} ${address.zip}</div>
                <div class="address-line">${address.country}</div>
            </div>
            <div class="address-actions">
                <button class="edit-address">Edit</button>
                <button class="delete-address">Delete</button>
            </div>
        `;
        savedAddressesContainer.appendChild(addressItem);
    });
    
    // Add "Add New Address" button
    const addAddressDiv = document.createElement('div');
    addAddressDiv.className = 'add-new-address';
    addAddressDiv.innerHTML = '<button class="add-address-button">+ Add New Address</button>';
    savedAddressesContainer.appendChild(addAddressDiv);
}

// Function to render wishlist
function renderWishlist() {
    const wishlistContainer = document.querySelector('.wishlist-items');
    
    if (!wishlistContainer) return;
    
    wishlistContainer.innerHTML = '';
    
    wishlistItems.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <div class="item-image">
                <img src="assets/${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="item-actions">
                <button class="move-to-cart">Move to Cart</button>
                <button class="remove-item">Remove</button>
            </div>
        `;
        wishlistContainer.appendChild(wishlistItem);
    });
}

// Function to handle search
function handleSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm) {
        // In a real application, this would search products
        alert(`Searching for: ${searchTerm}`);
      }
    });
    
    // Allow search with Enter key
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  }
}

// Function to check if user is already logged in
function checkLoggedIn() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    // User is logged in, show account dashboard
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('account-dashboard').style.display = 'block';
    
    // Render account dashboard content
    setTimeout(() => {
      renderOrderHistory();
      renderSavedAddresses();
      renderWishlist();
    }, 100);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  handleTabSwitching();
  handleLogin();
  handleSignup();
  handleSearch();
  checkLoggedIn();
  
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
