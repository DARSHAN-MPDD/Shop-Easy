// Import products array from products.js
// Since we can't directly import it, we'll include it in this file for now
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "wireless-headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation.",
        category: "electronics",
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "smart-watch.jpg",
        description: "Feature-rich smartwatch with health monitoring.",
        category: "electronics",
        rating: 4.7
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "bluetooth-speaker.jpg",
        description: "Portable Bluetooth speaker with excellent sound quality.",
        category: "electronics",
        rating: 4.3
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 59.99,
        image: "laptop-backpack.jpg",
        description: "Durable backpack with laptop compartment and USB charging port.",
        category: "clothing",
        rating: 4.2
    },
    {
        id: 5,
        name: "Cotton T-Shirt",
        price: 19.99,
        image: "cotton-t-shirt.jpg",
        description: "Comfortable cotton t-shirt in various colors.",
        category: "clothing",
        rating: 4.0
    },
    {
        id: 6,
        name: "Coffee Maker",
        price: 89.99,
        image: "Coffee Maker.jpg",
        description: "Automatic coffee maker with programmable settings.",
        category: "home",
        rating: 4.6
    },
    {
        id: 7,
        name: "Blender",
        price: 49.99,
        image: "blender.jpg",
        description: "High-speed blender for smoothies and more.",
        category: "home",
        rating: 4.1
    },
    {
        id: 8,
        name: "Face Cream",
        price: 29.99,
        image: "Face Cream.jpg",
        description: "Moisturizing face cream with natural ingredients.",
        category: "beauty",
        rating: 4.4
    },
    {
        id: 9,
        name: "Lipstick Set",
        price: 39.99,
        image: "lipstick-set.jpg",
        description: "Set of 5 premium lipsticks in various shades.",
        category: "beauty",
        rating: 4.8
    },
    {
        id: 10,
        name: "Desk Lamp",
        price: 34.99,
        image: "desk-lamp.jpg",
        description: "Adjustable LED desk lamp with touch controls.",
        category: "home",
        rating: 4.3
    },
    // New products
    {
        id: 11,
        name: "Vivo",
        price: 699.99,
        image: "vivo.jpg",
        description: "Latest smartphone with advanced camera and long battery life.",
        category: "electronics",
        rating: 4.9
    },
    {
        id: 12,
        name: "Running Shoes",
        price: 89.99,
        image: "running-shoes.jpg",
        description: "Comfortable running shoes with extra cushioning.",
        category: "clothing",
        rating: 4.6
    },
    {
        id: 13,
        name: "Yoga Mat",
        price: 24.99,
        image: "yogo.jpg",
        description: "Non-slip yoga mat with carrying strap.",
        category: "home",
        rating: 4.4
    },
    {
        id: 14,
        name: "Perfume",
        price: 49.99,
        image: "perfume.jpg",
        description: "Long-lasting fragrance with floral notes.",
        category: "beauty",
        rating: 4.7
    },
    {
        id: 15,
        name: "Wireless Charger",
        price: 34.99,
        image: "charger.jpg",
        description: "Fast wireless charging pad for all Qi-enabled devices.",
        category: "electronics",
        rating: 4.2
    },
    // New products added
    {
        id: 16,
        name: "Gaming Mouse",
        price: 59.99,
        image: "logitech-g502-hero.jpg",
        description: "High-precision gaming mouse with customizable RGB lighting.",
        category: "electronics",
        rating: 4.7
    },
    {
        id: 17,
        name: "Yoga Pants",
        price: 39.99,
        image: "yogo pant.jpg",
        description: "Comfortable and flexible yoga pants with moisture-wicking fabric.",
        category: "clothing",
        rating: 4.5
    },
    {
        id: 18,
        name: "Air Purifier",
        price: 129.99,
        image: "air.jpg",
        description: "HEPA air purifier for cleaner and fresher indoor air.",
        category: "home",
        rating: 4.6
    },
    {
        id: 19,
        name: "Vitamin Supplements",
        price: 24.99,
        image: "multivitamin.jpg",
        description: "Daily multivitamin supplements for overall health and wellness.",
        category: "beauty",
        rating: 4.3
    },
    {
        id: 20,
        name: "Bluetooth Earbuds",
        price: 79.99,
        image: "earbuds.jpg",
        description: "True wireless earbuds with noise cancellation and long battery life.",
        category: "electronics",
        rating: 4.8
    },
    {
        id: 21,
        name: "Hooded Sweatshirt",
        price: 49.99,
        image: "sweatshirt.jpg",
        description: "Comfortable hooded sweatshirt available in multiple colors.",
        category: "clothing",
        rating: 4.4
    },
    {
        id: 22,
        name: "Coffee Grinder",
        price: 44.99,
        image: "coffee grinder.jpg",
        description: "Electric coffee grinder with multiple grind settings.",
        category: "home",
        rating: 4.2
    },
    {
        id: 23,
        name: "Sunscreen Lotion",
        price: 19.99,
        image: "Face Cream.jpg",
        description: "SPF 50 sunscreen lotion for daily protection.",
        category: "beauty",
        rating: 4.6
    },
    {
        id: 24,
        name: "Tablet Stand",
        price: 29.99,
        image: "phone-Stand.jpg",
        description: "Adjustable tablet stand for comfortable viewing.",
        category: "electronics",
        rating: 4.1
    },
    {
        id: 25,
        name: "Denim Jacket",
        price: 69.99,
        image: "jacket.jpg",
        description: "Classic denim jacket with a modern fit.",
        category: "clothing",
        rating: 4.5
    }
];

// Get product ID from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')) || 1;

// Find the product with the matching ID
const product = products.find(p => p.id === productId) || products[0];

// If we couldn't find the product, redirect to products page
if (!product) {
    window.location.href = 'products.html';
}

// Get related products from the same category (excluding the current product)
const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

// Function to initialize product images
function initProductImages() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    
    if (mainImage) {
        // Set the main image
        mainImage.src = `assets/${product.image}`;
        mainImage.alt = product.name;
    }
    
    // Set up thumbnail images (using the same image for all thumbnails for now)
    if (thumbnailImages.length > 0) {
        thumbnailImages.forEach((thumb, index) => {
            thumb.src = `assets/${product.image}`;
            thumb.alt = `${product.name} ${index + 1}`;
            
            // Add click event to change main image
            thumb.addEventListener('click', function() {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            });
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
        // Use default value of 100 reviews if not specified
        const reviews = product.reviews || 100;
        ratingElement.textContent = `${product.rating} (${reviews} reviews)`;
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
        // Use default value of 50 items in stock if not specified
        const stock = product.stock || 50;
        if (stock > 0) {
            stockElement.textContent = `In Stock (${stock}+ items available)`;
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
        // Use default specifications if not specified
        const specifications = product.specifications || [
            "High-quality material",
            "Durable construction",
            "Designed for comfort",
            "Easy to use",
            "Comes with warranty"
        ];
        specifications.forEach(spec => {
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
                <button class="continue-buying" data-id="${product.id}">Continue Buying</button>
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
    
    // Add event listeners to "Continue Buying" buttons
    document.querySelectorAll('.related-products .continue-buying').forEach(button => {
        button.addEventListener('click', function() {
            // Redirect to checkout page
            window.location.href = 'checkout.html';
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
        cartCountElement.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${totalItems})`;
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

// Function to handle "Continue Buying" button
function handleContinueBuying() {
    const continueBuyingButton = document.querySelector('.product-actions .continue-buying');
    
    if (continueBuyingButton) {
        continueBuyingButton.addEventListener('click', function() {
            window.location.href = 'checkout.html';
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
    handleContinueBuying();
    
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