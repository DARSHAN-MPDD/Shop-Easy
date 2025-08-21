// Function to filter and display beauty products
function renderBeautyProducts() {
    // Filter products by category
    const beautyProducts = products.filter(product => product.category === 'beauty');
    
    // Render the filtered products
    renderProducts(beautyProducts);
}

// Function to handle sorting for beauty products
function sortBeautyProducts() {
    const sortBy = document.getElementById('sort-by').value;
    const priceRange = document.getElementById('price-range').value;
    
    // Filter products by category
    let filteredProducts = products.filter(product => product.category === 'beauty');
    
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

// Initialize the beauty page
document.addEventListener('DOMContentLoaded', function() {
    // Render beauty products initially
    renderBeautyProducts();
    
    // Add event listeners to filter elements
    document.getElementById('sort-by').addEventListener('change', sortBeautyProducts);
    
    // Update price range display
    const priceRange = document.getElementById('price-range');
    const priceRangeValue = document.getElementById('price-range-value');
    
    if (priceRange && priceRangeValue) {
        priceRange.addEventListener('input', function() {
            // Convert USD to INR (assuming 1 USD = 75 INR)
            const maxValueInINR = this.value * 75;
            priceRangeValue.textContent = `₹0 - ₹${maxValueInINR}`;
            sortBeautyProducts();
        });
    }
});