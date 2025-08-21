// Sample product data
const product = {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    images: [
        "product-main.jpg",
        "product-thumb1.jpg",
        "product-thumb2.jpg",
        "product-thumb3.jpg"
    ],
    description: "Experience crystal-clear sound with our premium wireless Bluetooth headphones. Featuring noise cancellation technology, these headphones provide an immersive audio experience. With up to 30 hours of battery life, comfortable over-ear design, and intuitive touch controls, they're perfect for music lovers on the go.",
    specifications: [
        "Bluetooth Version: 5.2",
        "Battery Life: Up to 30 hours",
        "Charging Time: 2 hours",
        "Weight: 250g",
        "Frequency Response: 20Hz - 20kHz",
        "Impedance: 32 Ohms",
        "Driver Size: 40mm"
    ],
    rating: 4.8,
    reviews: 128,
    stock: 50
};

// Sample related products data
const relatedProducts = [
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "smartwatch.jpg",
        rating: 4.7
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "speaker.jpg",
        rating: 4.3
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 59.99,
        image: "backpack.jpg",
        rating: 4.2
    },
    {
        id: 5,
        name: "Cotton T-Shirt",
        price: 19.99,
        image: "tshirt.jpg",
        rating: 4.0
    }
];

// Function to initialize product images
function initProductImages() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    
    if (mainImage && thumbnailImages.length > 0) {
        // Set the main image to the first image in the array
        mainImage.src = `assets/${product.images[0]}`;
        mainImage.alt = product.name;
        
        // Set up thumbnail images
        thumbnailImages.forEach((thumb, index) => {
            if (index < product.images.length) {
                thumb.src = `assets/${product.images[index]}`;
                thumb.alt = `${product.name} ${index + 1}`;
                
                // Add click event to change main image
                thumb.addEventListener('click', function() {
                    mainImage.src = this.src;
                    mainImage.alt = this.alt;
                });
            }
        });
    }
}

// Function to render product info
function renderProductInfo() {
    // Update product title
    const titleElement = document.querySelector('.product-info h1');
    if (titleElement) {
        titleElement.textContent = product.name;
    }
    
    // Update product rating
    const ratingElement = document.querySelector('.product-rating .rating-value');
    if (ratingElement) {
        ratingElement.textContent = `${product.rating} (${product.reviews} reviews)`;
    }
    
    // Update product price (convert from USD to INR, assuming 1 USD = 75 INR)
    const priceElement = document.querySelector('.product-price');
    if (priceElement) {
        const priceInINR = product.price * 75;
        priceElement.textContent = `₹${priceInINR.toFixed(2)}`;
    }
    
    // Update stock information
    const stockElement = document.querySelector('.product-stock');
    if (stockElement) {
        if (product.stock > 0) {
            stockElement.textContent = `In Stock (${product.stock}+ items available)`;
            stockElement.className = 'product-stock in-stock';
        } else {
            stockElement.textContent = 'Out of Stock';
            stockElement.className = 'product-stock out-of-stock';
        }
    }
    
    // Update product description
    const descriptionElement = document.querySelector('.product-description p');
    if (descriptionElement) {
        descriptionElement.textContent = product.description;
    }
    
    // Update product specifications
    const specsList = document.querySelector('.product-specifications ul');
    if (specsList) {
        specsList.innerHTML = '';
        product.specifications.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
    }
}

// Function to render related products
function renderRelatedProducts() {
    const productGrid = document.querySelector('.related-products .product-grid');
    
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="assets/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    Rating: ${product.rating}/5
                </div>
                <!-- Convert price from USD to INR (assuming 1 USD = 75 INR) -->
                <div class="product-price">₹${(product.price * 75).toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.related-products .add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Function to add product to cart
function addToCart(productId) {
    // In a real application, this would interact with a backend
    // For now, we'll just update the cart count in the header and store in localStorage
    const cartCountElement = document.querySelector('.cart-icon span');
    
    // Get existing cart items from localStorage or initialize empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    let productName = '';
    let productQuantity = 1;
    let newItem = null;
    
    if (productId === product.id) {
        productName = product.name;
        productQuantity = parseInt(document.getElementById('quantity').value);
        
        // Check if product is already in cart
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += productQuantity;
        } else {
            // Create new product item with selected quantity
            newItem = {
                ...product,
                quantity: productQuantity
            };
            // Add new product to cart
            cartItems.push(newItem);
        }
    } else {
        const relatedProduct = relatedProducts.find(p => p.id === productId);
        if (relatedProduct) {
            productName = relatedProduct.name;
            
            // Check if product is already in cart
            const existingItem = cartItems.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                // Create new product item with quantity 1
                newItem = {
                    ...relatedProduct,
                    quantity: 1
                };
                // Add new product to cart
                cartItems.push(newItem);
            }
        }
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Store information about newly added item for animation
    if (newItem) {
        localStorage.setItem('newlyAddedItem', JSON.stringify({
            id: newItem.id,
            name: newItem.name,
            timestamp: Date.now()
        }));
    }
    
    // Update cart count in header
    if (cartCountElement) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = `Cart (${totalItems})`;
    }
    
    // Show a notification with animation
    showAddToCartNotification(productName, productQuantity);
    
    // Redirect to cart page to show animation
    if (newItem) {
        window.location.href = 'cart.html';
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

// Function to handle "Add to Cart" button
function handleAddToCart() {
    const addToCartButton = document.querySelector('.product-actions .add-to-cart');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const quantity = document.getElementById('quantity').value;
            addToCart(product.id);
        });
    }
}

// Function to handle "Add to Wishlist" button
function handleAddToWishlist() {
    const wishlistButton = document.querySelector('.product-actions .wishlist');
    
    if (wishlistButton) {
        wishlistButton.addEventListener('click', function() {
            alert(`${product.name} added to wishlist!`);
            // In a real application, this would interact with a backend
        });
    }
}

// Function to show add to cart notification with animation
function showAddToCartNotification(productName, quantity = 1) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🛒</span>
                <span class="notification-text"></span>
            </div>
        `;
        document.body.appendChild(notification);
    }
    
    // Update the text content
    const quantityText = quantity > 1 ? ` (Quantity: ${quantity})` : '';
    notification.querySelector('.notification-text').textContent = `${productName}${quantityText} added to cart!`;
    
    // Show notification with animation
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initProductImages();
    renderProductInfo();
    renderRelatedProducts();
    handleSearch();
    handleAddToCart();
    handleAddToWishlist();
    
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