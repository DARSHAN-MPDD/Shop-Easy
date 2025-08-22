// Sample checkout data
const checkoutData = {
    customerInfo: {
        email: "johndoe@example.com",
        firstName: "John",
        lastName: "Doe"
    },
    shippingAddress: {
        address: "123 Main Street",
        apartment: "",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "US",
        phone: "555-123-4567"
    },
    paymentMethod: "credit-card",
    orderSummary: {
        subtotal: 479.96,
        shipping: 0,
        tax: 38.40,
        total: 518.36
    }
};

// Function to handle payment method selection
function handlePaymentMethodSelection() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardDetails = document.getElementById('credit-card-details');
    const paypalDetails = document.getElementById('paypal-details');
    const applePayDetails = document.getElementById('apple-pay-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            creditCardDetails.style.display = 'none';
            paypalDetails.style.display = 'none';
            applePayDetails.style.display = 'none';
            
            // Show selected payment details
            switch(this.value) {
                case 'credit-card':
                    creditCardDetails.style.display = 'block';
                    break;
                case 'paypal':
                    paypalDetails.style.display = 'block';
                    break;
                case 'apple-pay':
                    applePayDetails.style.display = 'block';
                    break;
            }
        });
    });
}

// Function to handle PayPal payment
function handlePayPalPayment() {
    const paypalButton = document.querySelector('.paypal-button');
    
    if (paypalButton) {
        paypalButton.addEventListener('click', function() {
            // In a real application, this would redirect to PayPal
            alert('Redirecting to PayPal for payment processing...');
            // Simulate redirect
            // window.location.href = 'https://www.paypal.com/checkout';
        });
    }
}

// Function to handle Apple Pay payment
function handleApplePayPayment() {
    const applePayButton = document.querySelector('.apple-pay-button');
    
    if (applePayButton) {
        applePayButton.addEventListener('click', function() {
            // In a real application, this would initiate Apple Pay
            alert('Initiating Apple Pay payment...');
            // Simulate payment process
            // Apple Pay would be handled through a payment provider
        });
    }
}

// Function to handle form validation
function handleFormValidation() {
    const customerInfoForm = document.getElementById('customer-info-form');
    const shippingAddressForm = document.getElementById('shipping-address-form');
    const paymentForm = document.getElementById('payment-form');
    
    if (customerInfoForm) {
        customerInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateCustomerInfo()) {
                alert('Customer information is valid!');
                // In a real application, you would proceed to the next step
            }
        });
    }
    
    if (shippingAddressForm) {
        shippingAddressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateShippingAddress()) {
                alert('Shipping address is valid!');
                // In a real application, you would proceed to the next step
            }
        });
    }
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validatePaymentInfo()) {
                alert('Payment information is valid!');
                // In a real application, you would proceed to the next step
            }
        });
    }
}

// Function to validate customer information
function validateCustomerInfo() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    
    if (!email || !firstName || !lastName) {
        alert('Please fill in all required fields in customer information.');
        return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Function to validate shipping address
function validateShippingAddress() {
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const phone = document.getElementById('phone').value;
    
    if (!address || !city || !state || !zip || !country || !phone) {
        alert('Please fill in all required fields in shipping address.');
        return false;
    }
    
    return true;
}

// Function to validate payment information
function validatePaymentInfo() {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    if (selectedPaymentMethod === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('card-name').value;
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            alert('Please fill in all required fields in credit card information.');
            return false;
        }
        
        // Simple card number validation (just checking length for demo)
        if (cardNumber.replace(/\s/g, '').length < 16) {
            alert('Please enter a valid card number.');
            return false;
        }
        
        // Simple expiry date validation (MM/YY format)
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryRegex.test(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY).');
            return false;
        }
        
        // Simple CVV validation (3 or 4 digits)
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(cvv)) {
            alert('Please enter a valid CVV (3 or 4 digits).');
            return false;
        }
    }
    
    return true;
}

// Function to handle place order button
function handlePlaceOrder() {
    const placeOrderButton = document.querySelector('.place-order-button');
    
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function() {
            // Validate all forms
            if (validateCustomerInfo() && validateShippingAddress() && validatePaymentInfo()) {
                // In a real application, this would process the order
                alert('Order placed successfully! Thank you for your purchase.');
                // Redirect to order confirmation page
                window.location.href = 'order-confirmation.html';
            }
        });
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

// Function to populate order summary
function populateOrderSummary() {
    const subtotalElement = document.querySelector('.summary-item:nth-child(1) span:last-child');
    const shippingElement = document.querySelector('.summary-item:nth-child(2) span:last-child');
    const taxElement = document.querySelector('.summary-item:nth-child(3) span:last-child');
    const totalElement = document.querySelector('.summary-item.total span:last-child');
    
    if (subtotalElement) subtotalElement.textContent = `₹${(checkoutData.orderSummary.subtotal * 75).toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `₹${(checkoutData.orderSummary.shipping * 75).toFixed(2)}`;
    if (taxElement) taxElement.textContent = `₹${(checkoutData.orderSummary.tax * 75).toFixed(2)}`;
    if (totalElement) totalElement.textContent = `₹${(checkoutData.orderSummary.total * 75).toFixed(2)}`;
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handlePaymentMethodSelection();
    handlePayPalPayment();
    handleApplePayPayment();
    handleFormValidation();
    handlePlaceOrder();
    handleSearch();
    populateOrderSummary();
    
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