// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "wireless-headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "smart-watch.jpg",
        description: "Feature-rich smartwatch with health monitoring."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "bluetooth-speaker.jpg",
        description: "Portable Bluetooth speaker with excellent sound quality."
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 59.99,
        image: "laptop-backpack.jpg",
        description: "Durable backpack with laptop compartment and USB charging port."
    }
];

// Sample category data
const categories = [
    {
        id: 1,
        name: "Electronics",
        image: "elect.jpeg"
    },
    {
        id: 2,
        name: "Clothing",
        image: "clothing.jpg"
    },
    {
        id: 3,
        name: "Home & Kitchen",
        image: "kitchen.jpg"
    },
    {
        id: 4,
        name: "Beauty",
        image: "beauty.jpg"
    }
];

// Function to render featured products
function renderFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="assets/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Function to render categories
function renderCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    
    if (!categoryGrid) return;
    
    categoryGrid.innerHTML = '';
    
    // Map category names to their respective HTML files
    const categoryLinks = {
        "Electronics": "electronics.html",
        "Clothing": "clothing.html",
        "Home & Kitchen": "home.html",
        "Beauty": "beauty.html"
    };
    
    categories.forEach(category => {
        // Create anchor element
        const categoryLink = document.createElement('a');
        categoryLink.href = categoryLinks[category.name] || "#";
        categoryLink.className = 'category-link';
        
        // Create category card content
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-image">
                <img src="assets/${category.image}" alt="${category.name}">
            </div>
            <h3>${category.name}</h3>
        `;
        
        // Append category card to anchor element
        categoryLink.appendChild(categoryCard);
        
        // Append anchor element to category grid
        categoryGrid.appendChild(categoryLink);
    });
}

// Function to add product to cart
function addToCart(productId) {
    // In a real application, this would interact with a backend
    // For now, we'll just update the cart count in the header
    const cartCountElement = document.querySelector('.cart-icon span');
    if (cartCountElement) {
        let count = parseInt(cartCountElement.textContent.match(/\d+/)[0]);
        count++;
        cartCountElement.textContent = `Cart (${count})`;
        
        // Add animation class to cart icon
        cartCountElement.classList.add('updated');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            cartCountElement.classList.remove('updated');
        }, 500);
    }
    
    // Show a simple alert (in a real app, you might show a notification)
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`${product.name} added to cart!`);
    }
}

// Function to handle search
function handleSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (searchInput && searchButton) {
        // Handle search button click
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                // In a real application, this would search products
                alert(`Searching for: ${searchTerm}`);
                // Hide suggestions
                searchSuggestions.style.display = 'none';
            }
        });
        
        // Allow search with Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
        
        // Handle search input for suggestions
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                // Filter products based on search term
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm)
                );
                
                // Show suggestions
                showSearchSuggestions(filteredProducts, searchSuggestions);
            } else {
                // Hide suggestions if search term is too short
                searchSuggestions.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchButton.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.style.display = 'none';
            }
        });
    }
}

// Function to show search suggestions
function showSearchSuggestions(products, suggestionsContainer) {
    if (!suggestionsContainer) return;
    
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
    
    if (products.length > 0) {
        // Add each product as a suggestion
        products.forEach(product => {
            const suggestion = document.createElement('div');
            suggestion.className = 'search-suggestion';
            suggestion.innerHTML = `
                <div class="search-suggestion-image">
                    <img src="assets/${product.image}" alt="${product.name}">
                </div>
                <div class="search-suggestion-text">
                    <div class="search-suggestion-name">${product.name}</div>
                    <div class="search-suggestion-price">$${product.price.toFixed(2)}</div>
                </div>
            `;
            
            // Add click event to select suggestion
            suggestion.addEventListener('click', function() {
                // Fill search input with selected product name
                document.getElementById('search-input').value = product.name;
                
                // Hide suggestions
                suggestionsContainer.style.display = 'none';
                
                // In a real application, this would navigate to the product page
                alert(`Selected product: ${product.name}`);
            });
            
            suggestionsContainer.appendChild(suggestion);
        });
        
        // Show suggestions
        suggestionsContainer.style.display = 'block';
    } else {
        // No products found
        const noResults = document.createElement('div');
        noResults.className = 'search-suggestion';
        noResults.textContent = 'No products found';
        noResults.style.textAlign = 'center';
        noResults.style.fontStyle = 'italic';
        suggestionsContainer.appendChild(noResults);
        suggestionsContainer.style.display = 'block';
    }
}

// Function to handle promotional banner button
function handlePromoBanner() {
    const promoButton = document.querySelector('.promo-banner button');
    
    if (promoButton) {
        promoButton.addEventListener('click', function() {
            alert('Redirecting to sale products...');
            // In a real application, this would redirect to a sale page
        });
    }
}

// Function to handle category clicks
function handleCategoryClicks() {
    // This function is intentionally left empty as the anchor tags handle navigation
    // The category cards are wrapped in anchor tags that properly navigate to category pages
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedProducts();
    renderCategories();
    handleSearch();
    handlePromoBanner();
    handleCategoryClicks();
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('show');
    }
}

// Login icon animation and functionality
function initLoginIcon() {
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
}

// Initialize login icon when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoginIcon();
});