// Get references to key HTML elements that we'll interact with using JavaScript
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');
let toastNotification = document.getElementById('toast-notification');
let searchBox = document.getElementById('search-box'); // Moved up for global access
let checkoutPopup = document.getElementById('checkoutPopup'); // Reference to the checkout popup

// --- Custom Event - Contact Form Logic ---
let Nameval = document.getElementById('contactName');
let Phoneval = document.getElementById('contactPhone');
let Ageval = document.getElementById('contactAge');
let TicketId = document.getElementById('contactTicketId');
let Email = document.getElementById('contactEmail');

const contactForm = document.getElementById('contactform');
if (contactForm) { // Ensure the form exists before adding listener
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(Nameval.value, Phoneval.value, Ageval.value, TicketId.value);
        // Check if gtag is defined before calling (important for environments without GA)
        if (typeof gtag === 'function') {
            gtag("event", "contact_form_event", {
                user_name: Nameval.value,
                user_phone: Phoneval.value,
                user_email: Email.value,
                submission_count: 1,
                user_age: Ageval.value,
                user_ticket: TicketId.value
            });
            console.log('gtag event sent successfully');
        } else {
            console.warn('gtag function not found. Google Analytics might not be loaded.');
        }

        // Optional: Clear form fields after submission
        Nameval.value = '';
        Phoneval.value = '';
        Ageval.value = '';
        TicketId.value = '';
        Email.value = '';
        showToast('Thank you for your message!');
    });
}

document.querySelector('#search-btn').onclick = () => {
    // If the search form is already active, close it.
    if (searchForm.classList.contains('active')) {
        searchForm.classList.remove('active');
    } else {
        // Otherwise, close all others and open the search form.
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active'); // Close navbar too
        searchForm.classList.add('active');
        searchBox.focus(); // Focus on the search box when it opens
    }
};

document.querySelector('#cart-btn').onclick = () => {
    // If the shopping cart is already active, close it.
    if (shoppingCart.classList.contains('active')) {
        shoppingCart.classList.remove('active');
    } else {
        // Otherwise, close all others and open the shopping cart.
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active'); // Close navbar too
        shoppingCart.classList.add('active');
    }
};

document.querySelector('#login-btn').onclick = () => {
    // If the login form is already active, close it.
    if (loginForm.classList.contains('active')) {
        loginForm.classList.remove('active');
    } else {
        // Otherwise, close all others and open the login form.
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active'); // Close navbar too
        loginForm.classList.add('active');
    }
};

// --- Toggle Navbar (Hamburger Menu) ---
const menuBtn = document.querySelector('#menu-btn');
if (menuBtn) {
    menuBtn.onclick = () => {
        // If the navbar is already active, close it.
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        } else {
            // Otherwise, close all others and open the navbar.
            searchForm.classList.remove('active');
            shoppingCart.classList.remove('active');
            loginForm.classList.remove('active');
            navbar.classList.add('active');
        }
    };
}
function closeAllOverlays() {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// --- Close active elements when clicking outside or scrolling ---
document.addEventListener('click', (event) => {
    const isSearchBtn = event.target.closest('#search-btn');
    const isCartBtn = event.target.closest('#cart-btn');
    const isLoginBtn = event.target.closest('#login-btn');
    const isMenuBtn = event.target.closest('#menu-btn'); // Check for menu button click

    const isClickOutsideSearch = !event.target.closest('.search-form.active') && !isSearchBtn;
    const isClickOutsideCart = !event.target.closest('.shopping-cart.active') && !isCartBtn;
    const isClickOutsideLogin = !event.target.closest('.login-form.active') && !isLoginBtn;
    // Check if click is outside the navbar AND not on the menu button
    const isClickOutsideNavbar = !event.target.closest('.navbar.active') && !isMenuBtn;

    if (searchForm.classList.contains('active') && isClickOutsideSearch) {
        searchForm.classList.remove('active');
    }
    if (shoppingCart.classList.contains('active') && isClickOutsideCart) {
        shoppingCart.classList.remove('active');
    }
    if (loginForm.classList.contains('active') && isClickOutsideLogin) {
        loginForm.classList.remove('active');
    }
    // Updated logic to close navbar if open and click is outside (and not on menu button itself)
    if (navbar.classList.contains('active') && isClickOutsideNavbar) {
        navbar.classList.remove('active');
    }

    // NEW: Close checkout popup when close button or OK button is clicked
    if (event.target.classList.contains('close-popup-btn') || event.target.classList.contains('ok-btn')) {
        event.preventDefault(); // Prevent default button behavior
        if (checkoutPopup) {
            checkoutPopup.classList.remove('active');
            clearTimeout(checkoutPopupTimeout); // Clear timeout if closed manually
        }
    }
});

window.onscroll = () => {
    // Also close navbar on scroll
    if (searchForm.classList.contains('active') ||
        shoppingCart.classList.contains('active') ||
        loginForm.classList.contains('active') ||
        navbar.classList.contains('active')) {
        closeAllOverlays();
    }
};

// --- Product and Category Data ---
const products = [
    { id: 1, name: 'Watermelon (1kg)', price: 35, image: 'image/watermelon.jfif', category: 'fruits' },
    { id: 2, name: 'Mango (1kg)', price: 55, image: 'image/mango.jfif', category: 'fruits' },
    { id: 3, name: 'Organic Orange (1kg)', price: 50, image: 'image/orange.jfif', category: 'fruits' },
    { id: 4, name: 'Red Apples (1kg)', price: 90, image: 'image/Apple.jfif', category: 'fruits' },
    { id: 5, name: 'Green Grapes (500g)', price: 65, image: 'image/grapes.jfif', category: 'fruits' },

    { id: 6, name: 'Fresh Onion (1kg)', price: 25, image: 'image/onion.jfif', category: 'vegetables' },
    { id: 7, name: 'Fresh Potato (1kg)', price: 30, image: 'image/potato.jfif', category: 'vegetables' },
    { id: 8, name: 'Farm Fresh Tomato (1kg)', price: 40, image: 'image/tomato.jfif', category: 'vegetables' },
    { id: 9, name: 'Cauliflower (1pc)', price: 35, image: 'image/cauliflower.jfif', category: 'vegetables' },
    { id: 10, name: 'Spinach (250g)', price: 25, image: 'image/Spinach.jfif', category: 'vegetables' },

    { id: 11, name: 'Farm Fresh Milk (1L)', price: 60, image: 'image/milk.jfif', category: 'dairy' },
    { id: 12, name: 'Amul Butter (100g)', price: 50, image: 'image/butter.jfif', category: 'dairy' },
    { id: 13, name: 'Paneer (200g)', price: 120, image: 'image/Paneer.jfif', category: 'dairy' },
    { id: 14, name: 'Curd (500g)', price: 40, image: 'image/Curd.jfif', category: 'dairy' },

    { id: 15, name: 'Chicken Breast (500g)', price: 180, image: 'image/chicken.jfif', category: 'meat-fish' },
    { id: 16, name: 'Fish (500g)', price: 150, image: 'image/rohu-fish.jfif', category: 'meat-fish' },
    { id: 17, name: 'Eggs (Dozen)', price: 80, image: 'image/Eggs.jfif', category: 'meat-fish' },

    { id: 18, name: 'Whole Wheat Bread', price: 45, image: 'image/Bread.jfif', category: 'bakery' },
    { id: 19, name: 'Chocolate Banana Cake', price: 100, image: 'image/chocolate_banana_cake.jfif', category: 'bakery' },
    { id: 20, name: 'Chocolate Cookies', price: 60, image: 'image/cookies.jfif', category: 'bakery' },

    { id: 21, name: 'Potato Chips (Large)', price: 50, image: 'image/chips.jfif', category: 'snacks-beverages' },
    { id: 22, name: 'Orange Juice (1L)', price: 100, image: 'image/orange-juice.jfif', category: 'snacks-beverages' },
    { id: 23, name: 'Diet Cola (300ml)', price: 40, image: 'image/diet-cola.jfif', category: 'snacks-beverages' },
];

const categories = [
    { name: 'Fresh Fruits', image: 'image/cat-fruits.jfif', id: 'fruits' },
    { name: 'Fresh Vegetables', image: 'image/cat-vegetables.jfif', id: 'vegetables' },
    { name: 'Dairy Products', image: 'image/cat-dairy.jfif', id: 'dairy' },
    { name: 'Meat & Fish', image: 'image/cat-meat.jfif', id: 'meat-fish' },
    { name: 'Bakery Items', image: 'image/cat-bakery.jfif', id: 'bakery' },
    { name: 'Snacks & Beverages', image: 'image/cat-snacks.jfif', id: 'snacks-beverages' }
];

// --- Render Products by Category (with quantity controls) ---
function renderProductsByCategory() {
    categories.forEach(category => {
        const container = document.querySelector(`.product-container[data-category="${category.id}"]`);
        if (container) {
            container.innerHTML = ''; // Clear existing content to prevent duplicates on re-render
            const productsInThisCategory = products.filter(p => p.category === category.id);

            productsInThisCategory.forEach(product => {
                const productBox = document.createElement('div');
                productBox.classList.add('product-box');

                // Add an initial quantity data attribute to each product box, default to 1
                productBox.dataset.quantityToAdd = 1;

                // Reordered elements for correct placement and added image-wrapper for styling
                productBox.innerHTML = `
                    <div class="image-wrapper">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <div class="price">₹${product.price.toFixed(2)}</div>
                    <div class="quantity-control-product">
                        <button class="qty-btn product-qty-minus" data-id="${product.id}">-</button>
                        <span class="quantity-value" data-id="${product.id}">1</span>
                        <button class="qty-btn product-qty-plus" data-id="${product.id}">+</button>
                    </div>
                    <a href="#" class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</a>
                `;
                container.appendChild(productBox);
            });
        }
    });
    // Event listeners for product quantity and add to cart buttons are now handled by delegation below
}

// --- Render Categories (for the main Categories section with image boxes) ---
function renderCategories() {
    const categoryContainer = document.querySelector('.category-container');
    if (!categoryContainer) return; // Exit if container not found

    categoryContainer.innerHTML = ''; // Clear existing content

    categories.forEach(category => {
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('category-box');

        categoryBox.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name}</h3>
            <a href="#${category.id}-products" class="btn category-shop-now" data-category-id="${category.id}">Shop Now</a>
        `;
        categoryContainer.appendChild(categoryBox);
    });

    // Attach click listeners to category "Shop Now" buttons for smooth scrolling
    // These listeners are specific to category buttons and don't need delegation on document level as they are static once rendered
    document.querySelectorAll('.category-shop-now').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetCategoryId = button.dataset.categoryId;
            const targetElement = document.getElementById(`${targetCategoryId}-products`);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// --- Shopping Cart Logic ---
let cart = JSON.parse(localStorage.getItem('groceryCart')) || [];
let toastTimeout;
let checkoutPopupTimeout; // Timeout for the checkout popup

// Function to save the cart state to Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('groceryCart', JSON.stringify(cart));
}

// Function to display a small, temporary notification (toast)
function showToast(message) {
    clearTimeout(toastTimeout); // Clear any existing timeout
    if (!toastNotification) {
        console.warn("Toast notification element not found!");
        return;
    }

    toastNotification.textContent = message;
    toastNotification.classList.add('active'); // Activate CSS for display

    toastTimeout = setTimeout(() => {
        toastNotification.classList.remove('active'); // Deactivate CSS after 3 seconds
    }, 3000);
}

// Function to add a product to the cart, with specified quantity
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Add specified quantity
        } else {
            cart.push({ ...product, quantity: quantity }); // Add with specified quantity
        }
        updateCartDisplay();
        saveCartToLocalStorage();
        showToast(`${product.name} (x${quantity}) added to cart!`);
    }
}

// Function to update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            // Remove item if quantity becomes 0 or less
            removeFromCart(productId);
        } else {
            cart[itemIndex].quantity = newQuantity;
            updateCartDisplay();
            saveCartToLocalStorage();
            showToast(`Updated quantity for ${cart[itemIndex].name} to ${newQuantity}`);
        }
    }
}

// Function to remove product from cart
function removeFromCart(productId) {
    const productToRemove = cart.find(item => item.id === productId);
    if (productToRemove) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
        saveCartToLocalStorage();
        showToast(`${productToRemove.name} removed from cart!`);
    }
}
// Function to update the cart's visual display
function updateCartDisplay() {
    const shoppingCartDiv = document.querySelector('.shopping-cart');
    // Get the new container for cart items
    const cartItemsContainer = shoppingCartDiv.querySelector('.cart-items-container');
    const totalDiv = shoppingCartDiv.querySelector('.total');
    const cartQuantityBadge = document.querySelector('.cart-quantity-badge');
    const checkoutBtn = shoppingCartDiv.querySelector('.btn.checkout-btn');

    // Clear existing content within the cart items container
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
    } else {
        console.error("'.cart-items-container' not found in shopping cart. Cart display may not work correctly.");
        return; // Exit if container isn't found
    }

    const fragment = document.createDocumentFragment();
    let overallTotal = 0;
    let totalItemsInCart = 0;

    // Ensure the cart title exists or is created as the first child
    let cartTitle = shoppingCartDiv.querySelector('.cart-title');
    if (!cartTitle) {
        cartTitle = document.createElement('h3');
        cartTitle.classList.add('cart-title');
        cartTitle.textContent = 'Your Cart';
        shoppingCartDiv.prepend(cartTitle); // Add at the very beginning of shoppingCartDiv
    }

    if (cart.length === 0) {
        const emptyCartMsg = document.createElement('div');
        emptyCartMsg.classList.add('box'); // Keep the box class for styling if needed
        emptyCartMsg.innerHTML = '<div class="content"><h3>Your cart is empty.</h3></div>';
        fragment.appendChild(emptyCartMsg);

        if (checkoutBtn) {
            checkoutBtn.style.display = 'none'; // Hide checkout button if cart is empty
        }
        if (cartTitle) {
            cartTitle.style.display = 'none'; // Hide cart title if cart is empty
        }
    } else {
        if (cartTitle) {
            cartTitle.style.display = 'block'; // Show cart title if cart has items
        }

        cart.forEach(item => {
            const cartItemBox = document.createElement('div');
            cartItemBox.classList.add('box');
            cartItemBox.innerHTML = `
                <i class="fas fa-trash" data-id="${item.id}"></i>
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">₹${item.price.toFixed(2)}</div>
                    <div class="quantity-control-cart">
                        <button class="qty-btn cart-qty-minus" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="qty-btn cart-qty-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
            fragment.appendChild(cartItemBox);
            overallTotal += item.price * item.quantity;
            totalItemsInCart += item.quantity;
        });
        if (checkoutBtn) {
            checkoutBtn.style.display = 'block'; // Show checkout button if cart has items
        }
    }

    // Append all constructed cart item boxes (or empty message) to the dedicated container
    cartItemsContainer.appendChild(fragment);

    if (totalDiv) {
        totalDiv.textContent = `Total: ₹${overallTotal.toFixed(2)}`;
    }

    if (cartQuantityBadge) {
        cartQuantityBadge.textContent = totalItemsInCart;
        if (totalItemsInCart === 0) {
            cartQuantityBadge.style.display = 'none'; // Hide badge if cart is empty
        } else {
            cartQuantityBadge.style.display = 'flex'; // Show badge
        }
    }
}
// --- Event Delegation for Product and Cart Controls (and Checkout) ---
// Attach a single listener to the document and handle clicks based on target classes
document.addEventListener('click', (event) => {
    // Product Quantity Controls
    if (event.target.classList.contains('product-qty-minus')) {
        event.preventDefault();
        const productBox = event.target.closest('.product-box');
        if (productBox) {
            const quantitySpan = productBox.querySelector('.quantity-value');
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantitySpan.textContent = currentQuantity;
                productBox.dataset.quantityToAdd = currentQuantity; // Update quantity to add
            }
        }
    } else if (event.target.classList.contains('product-qty-plus')) {
        event.preventDefault();
        const productBox = event.target.closest('.product-box');
        if (productBox) {
            const quantitySpan = productBox.querySelector('.quantity-value');
            let currentQuantity = parseInt(quantitySpan.textContent);
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
            productBox.dataset.quantityToAdd = currentQuantity; // Update quantity to add
        }
    } else if (event.target.classList.contains('add-to-cart-btn')) {
        event.preventDefault();
        const productId = parseInt(event.target.dataset.id);
        // Ensure you get the closest product-box parent of the clicked button
        const productBox = event.target.closest('.product-box');
        if (productBox) {
            // Retrieve the quantity from the data attribute on the productBox
            const quantityToAdd = parseInt(productBox.dataset.quantityToAdd);

            // Validate quantity to ensure it's a number and at least 1
            if (isNaN(quantityToAdd) || quantityToAdd < 1) {
                showToast('Invalid quantity to add to cart.');
                return;
            }

            addToCart(productId, quantityToAdd); // Pass the quantity to addToCart

            // Reset quantity display to 1 and update the data attribute after adding to cart
            productBox.querySelector('.quantity-value').textContent = 1;
            productBox.dataset.quantityToAdd = 1;
        } else {
            console.error("Could not find parent '.product-box' for add-to-cart button.");
        }
    }

    // Cart Quantity Controls and Remove Item
    else if (event.target.classList.contains('fa-trash') && event.target.closest('.shopping-cart')) {
        event.preventDefault(); // In case it's an anchor tag
        const productId = parseInt(event.target.dataset.id);
        removeFromCart(productId);
    } else if (event.target.classList.contains('cart-qty-minus')) {
        event.preventDefault();
        const productId = parseInt(event.target.dataset.id);
        const quantitySpan = event.target.nextElementSibling;
        let currentQuantity = parseInt(quantitySpan.textContent);
        if (currentQuantity > 0) {
            updateCartItemQuantity(productId, currentQuantity - 1);
        }
    } else if (event.target.classList.contains('cart-qty-plus')) {
        event.preventDefault();
        const productId = parseInt(event.target.dataset.id);
        const quantitySpan = event.target.previousElementSibling;
        let currentQuantity = parseInt(quantitySpan.textContent);
        updateCartItemQuantity(productId, currentQuantity + 1);
    }
    // Checkout Button Logic
    else if (event.target.classList.contains('checkout-btn')) {
        event.preventDefault(); // Stop the button from navigating to '#'

        if (cart.length === 0) {
            showToast('Your cart is empty. Please add items before checking out.');
            return;
        }

        // Hide the shopping cart
        shoppingCart.classList.remove('active');

        // Display the checkout popup
        if (checkoutPopup) { // Ensure checkoutPopup element exists
            checkoutPopup.classList.add('active');
            clearTimeout(checkoutPopupTimeout); // Clear any previous timeout
        }

        // Calculate total for GA event just before clearing the cart
        let currentOverallTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let itemsForGA = JSON.parse(JSON.stringify(cart)); // Deep copy current cart items for GA event

        // Clear the cart
        cart = []; // Empty the cart array
        saveCartToLocalStorage(); // Save the empty cart
        updateCartDisplay(); // Update the display (this will now show "cart is empty")

        // Optionally send a Google Analytics event for checkout success
        if (typeof gtag === 'function') {
            gtag("event", "purchase", {
                transaction_id: "T_" + Date.now(), // Generate a unique transaction ID
                value: currentOverallTotal, // Use the re-calculated total
                currency: "INR", // Assuming INR based on your prices
                items: itemsForGA.map(item => ({ // Send the copied cart items to GA
                    item_id: item.id,
                    item_name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            });
            console.log('Google Analytics purchase event sent.');
        } else {
            console.warn('gtag function not found. Google Analytics purchase event not sent.');
        }

        // Auto-hide the popup after a few seconds
        if (checkoutPopup) {
            checkoutPopupTimeout = setTimeout(() => {
                checkoutPopup.classList.remove('active');
            }, 5000); // Popup will disappear after 5 seconds
        }
    }
});


// --- Search Functionality ---
// The search form element reference is already available globally: searchForm

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        performSearch();
    }
});

// Click listener for the search icon/label next to the search box
document.querySelector('.search-form label.fa-search').addEventListener('click', () => {
    performSearch();
});

function performSearch() {
    const searchTerm = searchBox.value.trim().toLowerCase();

    // Remove any existing highlights
    document.querySelectorAll('.product-box.highlight-search').forEach(el => el.classList.remove('highlight-search'));
    document.querySelectorAll('.category-heading span.highlight-search').forEach(el => el.classList.remove('highlight-search'));

    if (!searchTerm) {
        showToast('Please enter a search term.');
        return;
    }

    let foundMatch = false;
    let targetElement = null;
    let firstProductMatchId = null; // Store the ID of the first product found

    // Search through products first
    for (const product of products) {
        if (product.name.toLowerCase().includes(searchTerm)) {
            if (!firstProductMatchId) { // Only set the first one found for initial scroll
                firstProductMatchId = product.id;
                targetElement = document.getElementById(`${product.category}-products`);
            }
            foundMatch = true;
        }
    }

    // If product(s) found, scroll to the relevant category and highlight
    if (firstProductMatchId && targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            const productBoxes = document.querySelectorAll(`.product-container[data-category="${products.find(p => p.id === firstProductMatchId).category}"] .product-box`);
            productBoxes.forEach(box => {
                // Ensure highlighting only products that truly match the search term
                if (box.querySelector('h3') && box.querySelector('h3').textContent.toLowerCase().includes(searchTerm)) {
                    box.classList.add('highlight-search');
                    setTimeout(() => box.classList.remove('highlight-search'), 3000); // Remove highlight after 3 seconds
                }
            });
        }, 600); // Give time for scroll to initiate
        showToast(`Scrolling to product(s) matching: "${searchTerm}"`);
    }
    // If no product match, search through categories
    else {
        for (const category of categories) {
            if (category.name.toLowerCase().includes(searchTerm)) {
                targetElement = document.getElementById(`${category.id}-products`);
                if (targetElement) {
                    foundMatch = true;
                    // Scroll to the product category section
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Add highlight to the category heading after a short delay
                    setTimeout(() => {
                        const categoryHeadingSpan = targetElement.querySelector('.category-heading span');
                        if (categoryHeadingSpan) {
                            categoryHeadingSpan.classList.add('highlight-search');
                            setTimeout(() => categoryHeadingSpan.classList.remove('highlight-search'), 3000); // Remove highlight after 3 seconds
                        }
                    }, 600); // Give time for scroll to initiate
                    showToast(`Scrolling to category: "${category.name}"`);
                    break; // Found a category match
                }
            }
        }
    }

    if (!foundMatch) {
        showToast(`No results found for "${searchTerm}"`);
    }

    // Close search form and clear input after search
    searchForm.classList.remove('active');
    searchBox.value = '';
}

// --- Toggle Details Function for Features Section ---
function toggleDetails(id, button) {
    const details = document.getElementById(id);
    if (!details) return; // Exit if element not found

    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'Read Less'; // Change button text
        button.setAttribute('aria-expanded', 'true'); // Accessibility
    } else {
        details.style.display = 'none';
        button.textContent = 'Read More'; // Change button text back
        button.setAttribute('aria-expanded', 'false'); // Accessibility
    }
}

// --- Initialize on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    renderProductsByCategory();
    renderCategories();
    updateCartDisplay(); // Load and display cart from local storage on page load
});
