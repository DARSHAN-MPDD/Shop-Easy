// Sample product data for admin
const adminProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 99.99,
        stock: 50,
        image: "headphones.jpg",
        status: "active"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 199.99,
        stock: 25,
        image: "smartwatch.jpg",
        status: "active"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 79.99,
        stock: 0,
        image: "speaker.jpg",
        status: "out-of-stock"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        category: "Accessories",
        price: 59.99,
        stock: 100,
        image: "backpack.jpg",
        status: "active"
    }
];

// Function to render products table
function renderProductsTable() {
    const tableBody = document.querySelector('.products-table tbody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    adminProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-info">
                    <div class="product-image">
                        <img src="assets/${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-name">${product.name}</div>
                </div>
            </td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td><span class="status ${product.status}">${product.status === 'active' ? 'Active' : 'Out of Stock'}</span></td>
            <td>
                <button class="edit-button" data-id="${product.id}">Edit</button>
                <button class="delete-button" data-id="${product.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

// Function to handle add product button
function handleAddProduct() {
    const addProductButton = document.querySelector('.add-product-button');
    
    if (addProductButton) {
        addProductButton.addEventListener('click', function() {
            showProductForm('add');
        });
    }
}

// Function to show product form
function showProductForm(mode, product = null) {
    const productForm = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const productFormContent = document.getElementById('product-form-content');
    
    if (productForm && formTitle && productFormContent) {
        // Reset form
        productFormContent.reset();
        
        if (mode === 'add') {
            formTitle.textContent = 'Add New Product';
        } else if (mode === 'edit' && product) {
            formTitle.textContent = 'Edit Product';
            // Populate form with product data
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-description').value = product.description || '';
        }
        
        // Show form
        productForm.style.display = 'block';
    }
}

// Function to handle cancel button
function handleCancelProduct() {
    const cancelProductButton = document.getElementById('cancel-product');
    
    if (cancelProductButton) {
        cancelProductButton.addEventListener('click', function() {
            const productForm = document.getElementById('product-form');
            if (productForm) {
                productForm.style.display = 'none';
            }
        });
    }
}

// Function to handle product form submission
function handleProductFormSubmission() {
    const productFormContent = document.getElementById('product-form-content');
    
    if (productFormContent) {
        productFormContent.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const productName = document.getElementById('product-name').value;
            const productCategory = document.getElementById('product-category').value;
            const productPrice = parseFloat(document.getElementById('product-price').value);
            const productStock = parseInt(document.getElementById('product-stock').value);
            const productDescription = document.getElementById('product-description').value;
            
            // In a real application, this would be sent to a server
            if (productName && productCategory && !isNaN(productPrice) && !isNaN(productStock)) {
                // Hide form
                const productForm = document.getElementById('product-form');
                if (productForm) {
                    productForm.style.display = 'none';
                }
                
                // Show success message
                alert('Product saved successfully!');
                
                // Re-render products table
                renderProductsTable();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
}

// Function to edit product
function editProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (product) {
        showProductForm('edit', product);
    }
}

// Function to delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        // In a real application, this would send a request to the server
        const productIndex = adminProducts.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            adminProducts.splice(productIndex, 1);
            renderProductsTable();
            alert('Product deleted successfully!');
        }
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
    renderProductsTable();
    handleAddProduct();
    handleCancelProduct();
    handleProductFormSubmission();
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