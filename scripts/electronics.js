// Function to filter and display electronics products
function renderElectronicsProducts() {
    // Filter products by category
    const electronicsProducts = products.filter(product => product.category === 'electronics');
    
    // Render the filtered products
    renderProducts(electronicsProducts);
}

// Function to handle sorting for electronics products
function sortElectronicsProducts() {
    const sortBy = document.getElementById('sort-by').value;
    const priceRange = document.getElementById('price-range').value;
    
    // Filter products by category
    let filteredProducts = products.filter(product => product.category === 'electronics');
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(product => product.price <= priceRange);
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // For this example, we'll sort by ID (newest first)
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        // 'featured' case: keep original order
    }
    
    renderProducts(filteredProducts);
}

// Initialize the electronics page
document.addEventListener('DOMContentLoaded', function() {
    // Render electronics products initially
    renderElectronicsProducts();
    
    // Add event listeners to filter elements
    document.getElementById('sort-by').addEventListener('change', sortElectronicsProducts);
    
    // Update price range display
    const priceRange = document.getElementById('price-range');
    const priceRangeValue = document.getElementById('price-range-value');
    
    if (priceRange && priceRangeValue) {
        priceRange.addEventListener('input', function() {
            // Convert USD to INR (assuming 1 USD = 75 INR)
            const maxValueInINR = this.value * 75;
            priceRangeValue.textContent = `₹0 - ₹${maxValueInINR}`;
            sortElectronicsProducts();
        });
    }
});