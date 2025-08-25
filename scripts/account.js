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

// Function to populate user information
function populateUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        // Populate basic user info
        document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('full-name').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('email').textContent = user.email;
        
        // Set default values for other fields
        document.getElementById('phone').textContent = "+1 (555) 123-4567";
        document.getElementById('dob').textContent = "January 1, 1990";
        document.getElementById('member-since').textContent = "January 1, 2023";
    }
}

// Function to handle logout
function handleLogout() {
    // Remove user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to home page or login page
    window.location.href = 'index.html';
}

// Function to handle edit profile
function handleEditProfile() {
    alert('Edit profile functionality would be implemented here.');
}

// Function to handleChangePassword
function handleChangePassword() {
    alert('Change password functionality would be implemented here.');
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
                <div class="order-total">₹${(order.total * 75).toFixed(2)}</div>
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
                <div class="item-price">₹${(item.price * 75).toFixed(2)}</div>
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
    // User is logged in, populate user info and show account dashboard
    populateUserInfo();
    document.getElementById('user-info-section').style.display = 'block';
    document.getElementById('account-dashboard').style.display = 'block';
    
    // Render account dashboard content
    setTimeout(() => {
      renderOrderHistory();
      renderSavedAddresses();
      renderWishlist();
    }, 100);
  } else {
    // User is not logged in, redirect to home page
    window.location.href = 'index.html';
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  handleSearch();
  checkLoggedIn();
  
  // Add event listeners for account action buttons
  const editProfileBtn = document.querySelector('.edit-profile-btn');
  const changePasswordBtn = document.querySelector('.change-password-btn');
  const logoutBtn = document.querySelector('.logout-btn');
  
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', handleEditProfile);
  }
  
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', handleChangePassword);
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
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
