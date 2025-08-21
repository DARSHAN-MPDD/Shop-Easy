// Get cart items from localStorage or initialize empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Tax rate (for example purposes)
const TAX_RATE = 0.08;

// Store the previous cart items to identify new additions
let previousCartItems = [];

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    // Identify new items by comparing with previous cart items
    const newItemIds = cartItems
        .filter(item => !previousCartItems.some(prevItem => prevItem.id === item.id))
        .map(item => item.id);
    
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        
        // Check if this is a new item
        const isNewItem = newItemIds.includes(item.id);
        
        // Set class based on whether it's a new item or existing item
        if (isNewItem) {
            cartItem.className = 'cart-item new-item';
        } else {
            cartItem.className = 'cart-item animated';
            // Add animation delay for existing items
            cartItem.style.animationDelay = `${index * 0.1}s`;
        }
        
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="assets/${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <!-- Convert price from USD to INR (assuming 1 USD = 75 INR) -->
                <div class="item-price">₹${(item.price * 75).toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <label for="quantity-${item.id}">Quantity:</label>
                <select id="quantity-${item.id}" data-id="${item.id}">
                    ${generateQuantityOptions(item.quantity)}
                </select>
            </div>
            <!-- Convert price from USD to INR (assuming 1 USD = 75 INR) -->
            <div class="item-total">₹${(item.price * item.quantity * 75).toFixed(2)}</div>
            <div class="item-actions">
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        // Add data-id attribute to the cart item for selection
        cartItem.setAttribute('data-id', item.id);
        
        cartItemsContainer.appendChild(cartItem);
        
        // Add highlight effect for new items after a short delay
        if (isNewItem) {
            setTimeout(() => {
                cartItem.classList.add('highlight');
                
                // Remove highlight class after animation completes
                setTimeout(() => {
                    cartItem.classList.remove('highlight');
                }, 2000);
            }, 100);
        }
    });
    
    // Update previous cart items
    previousCartItems = [...cartItems];
    
    // Check for newly added item and trigger animation
    const newlyAddedItem = JSON.parse(localStorage.getItem('newlyAddedItem'));
    if (newlyAddedItem) {
        // Remove the newlyAddedItem from localStorage after a short delay
        setTimeout(() => {
            localStorage.removeItem('newlyAddedItem');
        }, 5000);
        
        // Find the newly added item in the cart and trigger animation
        setTimeout(() => {
            const newItemElement = document.querySelector(`.cart-item[data-id="${newlyAddedItem.id}"]`);
            if (newItemElement) {
                newItemElement.classList.add('new-item', 'highlight');
                
                // Remove highlight class after animation completes
                setTimeout(() => {
                    newItemElement.classList.remove('highlight');
                }, 2000);
            }
        }, 100);
    }
    
    // Add event listeners to quantity selectors
    document.querySelectorAll('.item-quantity select').forEach(select => {
        select.addEventListener('change', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const newQuantity = parseInt(this.value);
            updateQuantity(itemId, newQuantity);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            removeItem(itemId);
        });
    });
}

// Function to generate quantity options
function generateQuantityOptions(selectedQuantity) {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}" ${i === selectedQuantity ? 'selected' : ''}>${i}</option>`;
    }
    return options;
}

// Function to update item quantity
function updateQuantity(itemId, newQuantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartSummary();
        updateCartCount();
        
        // Update previous cart items
        previousCartItems = [...cartItems];
    }
}

// Function to remove item from cart
function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartSummary();
        
        // Update cart count in header
        updateCartCount();
        
        // Update previous cart items
        previousCartItems = [...cartItems];
    }
}

// Function to add a new item to cart with animation
function addNewItemToCart(item) {
    // Add the new item to cart items
    cartItems.push(item);
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Re-render cart items to show animation
    renderCartItems();
    
    // Update cart summary and count
    updateCartSummary();
    updateCartCount();
}

// Function to update cart count in header
function updateCartCount() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountElement = document.querySelector('.cart-icon span');
    if (cartCountElement) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = `Cart (${totalItems})`;
    }
}

// Function to update cart summary
function updateCartSummary() {
    // Convert prices from USD to INR (assuming 1 USD = 75 INR)
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 75;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    // Debugging: log the calculated values
    console.log('Cart Summary Calculation:');
    console.log('Subtotal:', subtotal);
    console.log('Tax:', tax);
    console.log('Total:', total);
    console.log('Cart Items:', cartItems);
    
    // Update summary items with INR currency
    const subtotalElement = document.querySelector('.summary-item:nth-child(1) span:last-child');
    const taxElement = document.querySelector('.summary-item:nth-child(3) span:last-child');
    const totalElement = document.querySelector('.summary-item.total span:last-child');
    
    // Debugging: check if elements are found
    console.log('Subtotal Element:', subtotalElement);
    console.log('Tax Element:', taxElement);
    console.log('Total Element:', totalElement);
    
    if (subtotalElement) {
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    }
    if (taxElement) {
        taxElement.textContent = `₹${tax.toFixed(2)}`;
    }
    if (totalElement) {
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }
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

// Function to handle checkout button
function handleCheckout() {
    const checkoutButton = document.querySelector('.checkout-button');
    
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // In a real application, this would redirect to the checkout page
            window.location.href = 'checkout.html';
        });
    }
}

// Function to handle continue shopping button
function handleContinueShopping() {
    const continueShoppingButton = document.querySelector('.continue-shopping');
    
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', function() {
            // Redirect to products page
            window.location.href = 'products.html';
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    updateCartSummary();
    updateCartCount(); // Update cart count on page load
    handleSearch();
    handleCheckout();
    handleContinueShopping();
    
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

// Test function to add a sample item to the cart for testing animations
function testAddItemToCart() {
    // Sample product data for testing
    const testProduct = {
        id: 999,
        name: "Test Product",
        price: 29.99,
        image: "placeholder.jpg",
        description: "This is a test product for animation testing.",
        quantity: 1
    };
    
    // Add the test product to cart items
    cartItems.push(testProduct);
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Store information about newly added item for animation
    localStorage.setItem('newlyAddedItem', JSON.stringify({
        id: testProduct.id,
        name: testProduct.name,
        timestamp: Date.now()
    }));
    
    // Re-render cart items to show animation
    renderCartItems();
    
    // Update cart summary and count
    updateCartSummary();
    updateCartCount();
}

// Function to update cart summary
function updateCartSummary() {
    // Convert prices from USD to INR (assuming 1 USD = 75 INR)
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 75;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    // Update summary items with INR currency
    const subtotalElement = document.querySelector('.summary-item:nth-child(1) span:last-child');
    const taxElement = document.querySelector('.summary-item:nth-child(3) span:last-child');
    const totalElement = document.querySelector('.summary-item.total span:last-child');
    
    if (subtotalElement) {
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    }
    if (taxElement) {
        taxElement.textContent = `₹${tax.toFixed(2)}`;
    }
    if (totalElement) {
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }
}