// Get references to key HTML elements that we'll interact with using JavaScript
// These are essentially "handles" to elements on your web page.
let searchForm = document.querySelector('.search-form'); // The search input form
let shoppingCart = document.querySelector('.shopping-cart'); // The shopping cart display area
let loginForm = document.querySelector('.login-form'); // The login form
let navbar = document.querySelector('.navbar'); // The main navigation menu (will no longer be toggled by a button)
let toastNotification = document.getElementById('toast-notification'); // The small pop-up notification

// --- Universal Close Function ---
// This function hides all the active overlay elements (search, cart, login, mobile nav).
// This is super useful because when one opens, others should close for a clean UI.
function closeAllOverlays() {
    searchForm.classList.remove('active'); // Hides the search form
    shoppingCart.classList.remove('active'); // Hides the shopping cart
    loginForm.classList.remove('active'); // Hides the login form
    navbar.classList.remove('active'); // Hides the mobile navigation menu (if active - though no longer toggled by button)
}

// --- Header Icon Click Handlers ---
// These sections define what happens when a user clicks on the icons in the header.

// When the search button is clicked:
document.querySelector('#search-btn').onclick = () => {
    closeAllOverlays(); // First, close any other open overlays
    searchForm.classList.toggle('active'); // Toggle the 'active' class on the search form
                                          // This makes it visible if hidden, and hidden if visible.
    // If the search form is now active (visible), focus on the search input for immediate typing
    if (searchForm.classList.contains('active')) {
        document.getElementById('search-box').focus();
    }
};

// When the cart button is clicked:
document.querySelector('#cart-btn').onclick = () => {
    closeAllOverlays(); // Close other overlays
    shoppingCart.classList.toggle('active'); // Toggle 'active' class on the shopping cart
};

// When the login button is clicked:
document.querySelector('#login-btn').onclick = () => {
    closeAllOverlays(); // Close other overlays
    loginForm.classList.toggle('active'); // Toggle 'active' class on the login form
};

// --- Close active elements when clicking outside or scrolling ---
document.addEventListener('click', (event) => {
    // Check if the click happened *inside* any of our interactive elements
    const isClickInsideHeader = event.target.closest('.header');
    const isClickInsideSearch = event.target.closest('.search-form');
    const isClickInsideCart = event.target.closest('.shopping-cart');
    const isClickInsideLogin = event.target.closest('.login-form');
    const isClickInsideNavbar = event.target.closest('.navbar'); // Check if click is inside the fixed navbar

    // Check if the click was directly on one of the remaining header icons
    const isClickOnIcon = event.target.id === 'search-btn' ||
                          event.target.id === 'cart-btn' || 
                          event.target.id === 'login-btn'; 

    // Logic to close overlays:
    // If the click was NOT on an icon (which would open/toggle something)
    // AND NOT inside any of the already open overlay areas, then close everything.
    if (!isClickOnIcon && !isClickInsideHeader && !isClickInsideSearch && !isClickInsideCart && !isClickInsideLogin && !isClickInsideNavbar) {
        closeAllOverlays(); // Close all active overlays
    }
});

window.onscroll = () => {
    // If any of these overlays are currently active (visible), close them when the user scrolls.
    if (searchForm.classList.contains('active') ||
        shoppingCart.classList.contains('active') ||
        loginForm.classList.contains('active') ||
        navbar.classList.contains('active')) { // Keep this, as navbar might be active due to CSS or other reasons
        closeAllOverlays();
    }
};


// --- Product and Category Data ---
// These arrays hold all the information about your products and categories.
const products = [
    // 'rating' property has been completely removed from all products
    { id: 1, name: 'Watermelon(1kg)', price: 35, image: 'image/watermelon.jfif', category: 'fruits' },
    { id: 2, name: 'Mango(1kg)', price: 55, image: 'image/mango.jfif', category: 'fruits' },
    { id: 3, name: 'Organic Orange(1kg)', price: 50, image: 'image/orange.jfif', category: 'fruits' },
    { id: 4, name: 'Red Apples (1kg)', price: 90, image: 'image/Apple.jfif', category: 'fruits' },
    { id: 5, name: 'Green Grapes (500g)', price: 65, image: 'image/grapes.jfif', category: 'fruits' },

    { id: 6, name: 'Fresh Onion (1kg)', price: 25, image: 'image/onion.jfif', category: 'vegetables' },
    { id: 7, name: 'Fresh Potato (1kg)', price: 30, image: 'image/potato.jfif', category: 'vegetables' },
    { id: 8, name: 'Farm Fresh Tomato (1kg)', price: 40, image: 'image/tomato.jfif', category: 'vegetables' },
    { id: 9, name: 'Cauliflower(1pc)', price: 35, image: 'image/cauliflower.jfif', category: 'vegetables' },
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
    // Each object represents a category with its name, image, and a unique ID
    { name: 'Fresh Fruits', image: 'image/cat-fruits.jfif', id: 'fruits' },
    { name: 'Fresh Vegetables', image: 'image/cat-vegetables.jfif', id: 'vegetables' },
    { name: 'Dairy Products', image: 'image/cat-dairy.jfif', id: 'dairy' },
    { name: 'Meat & Fish', image: 'image/cat-meat.jfif', id: 'meat-fish' },
    { name: 'Bakery Items', image: 'image/cat-bakery.jfif', id: 'bakery' },
    { name: 'Snacks & Beverages', image: 'image/cat-snacks.jfif', id: 'snacks-beverages' }
];


// --- Render Products by Category ---
// This function dynamically creates and displays product boxes on the page
// for each category defined in the `products` array.
function renderProductsByCategory() {
    // Loop through each category defined in our `categories` array
    categories.forEach(category => {
        // Find the specific HTML container for products of this category using its `data-category` attribute
        const container = document.querySelector(`.product-container[data-category="${category.id}"]`);
        
        // If a container exists for this category:
        if (container) {
            container.innerHTML = ''; // Clear any existing content inside the container
            // Filter the main `products` array to get only products belonging to the current category
            const productsInThisCategory = products.filter(p => p.category === category.id);

            // For each product in this category:
            productsInThisCategory.forEach(product => {
                const productBox = document.createElement('div'); // Create a new div element
                productBox.classList.add('product-box'); // Add the 'product-box' CSS class for styling
                
                // Set the inner HTML of the product box using a template literal (backticks ``)
                productBox.innerHTML = `
                    <div class="image-wrapper">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <div class="price">₹${product.price.toFixed(2)}</div> <a href="#" class="btn add-to-cart" data-id="${product.id}">Add to Cart</a>
                `;
                container.appendChild(productBox); // Add the newly created product box to its category container
            });
        }
    });

    // After all product boxes are rendered, attach event listeners to all "Add to Cart" buttons.
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default action (e.g., scrolling to top)
            const productId = parseInt(button.dataset.id); // Get the product ID from the 'data-id' attribute
            addToCart(productId); // Call the function to add this product to the cart
        });
    });
}


// --- Render Categories (for the main Categories section with image boxes) ---
// This function displays the clickable category boxes on the "Product Categories" section.
function renderCategories() {
    const categoryContainer = document.querySelector('.category-container'); // Get the main categories container
    categoryContainer.innerHTML = ''; // Clear existing content

    // Loop through each category
    categories.forEach(category => {
        const categoryBox = document.createElement('div'); // Create a new div for the category box
        categoryBox.classList.add('category-box'); // Add the 'category-box' CSS class
        
        // Build the HTML for the category box (image, name, Shop Now button)
        categoryBox.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name}</h3>
            <a href="#${category.id}-products" class="btn category-shop-now" data-category-id="${category.id}">Shop Now</a>
        `;
        categoryContainer.appendChild(categoryBox); // Add the category box to the container
    });

    // Attach event listeners to the "Shop Now" buttons within the category boxes
    document.querySelectorAll('.category-shop-now').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetCategoryId = button.dataset.categoryId; // Get the target category ID
            const targetElement = document.getElementById(`${targetCategoryId}-products`); // Find the corresponding product section

            // If the target section exists, smoothly scroll to it
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// --- Shopping Cart Logic ---
// This section manages the shopping cart state and its display.
let cart = []; // An array to hold items currently in the cart. Each item will be a product object with a `quantity`.
let toastTimeout; // Variable to hold the ID of the timeout for the toast notification, allowing us to clear it.

// Function to display a small, temporary notification (toast)
function showToast(message) {
    clearTimeout(toastTimeout); // Clear any previous toast timeout to show the new one immediately
    if (!toastNotification) return; // Exit if the toast element isn't found

    toastNotification.textContent = message; // Set the message of the toast
    toastNotification.classList.add('active'); // Add 'active' class to make it visible (CSS transition)

    // Set a timeout to hide the toast after 3 seconds
    toastTimeout = setTimeout(() => {
        toastNotification.classList.remove('active'); // Remove 'active' class to hide it
    }, 3000); // 3000 milliseconds = 3 seconds
}

// Function to add a product to the cart
function addToCart(productId) {
    // Find the product in our `products` array using its ID
    const product = products.find(p => p.id === productId);
    if (product) { // If the product is found:
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++; // If it exists, just increase its quantity
        } else {
            cart.push({ ...product, quantity: 1 }); // If new, add it to the cart with quantity 1
        }
        updateCartDisplay(); // Update the visual representation of the cart
        showToast(`${product.name} added to cart!`); // Show a confirmation toast
    }
}

function removeFromCart(productId) {
    // Filter the cart to create a new array that excludes the item with the given productId
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay(); // Update the cart display
    showToast('Item removed from cart!'); // Show a confirmation toast
}

function updateCartDisplay() {
    const shoppingCartDiv = document.querySelector('.shopping-cart'); // Get the main cart div
    const totalDiv = shoppingCartDiv.querySelector('.total'); // Get the total price element
    const cartQuantityBadge = document.querySelector('.cart-quantity-badge'); // Get the small badge on the cart icon

    // Remove all existing product boxes from the cart display to rebuild it
    const currentCartItems = Array.from(shoppingCartDiv.querySelectorAll('.box'));
    currentCartItems.forEach(item => item.remove());

    // Use a DocumentFragment for efficient DOM manipulation
    const fragment = document.createDocumentFragment();
    let overallTotal = 0; // Initialize total price
    let totalItemsInCart = 0; // Initialize total number of items

    // If the cart is empty, display an "empty cart" message
    if (cart.length === 0) {
        const emptyCartMsg = document.createElement('div');
        emptyCartMsg.classList.add('box'); // Add existing box styling
        emptyCartMsg.innerHTML = '<div class="content"><h3>Your cart is empty.</h3></div>';
        fragment.appendChild(emptyCartMsg);
    } else {
        // If cart has items, iterate through each item to create its display box
        cart.forEach(item => {
            const cartItemBox = document.createElement('div');
            cartItemBox.classList.add('box'); // Add 'box' class for styling
            cartItemBox.innerHTML = `
                <i class="fa fa-trash" data-id="${item.id}"></i> <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">₹${item.price.toFixed(2)}</span>
                    <span class="quantity">Qty: ${item.quantity}</span>
                </div>
            `;
            fragment.appendChild(cartItemBox); // Add the item box to the fragment
            overallTotal += item.price * item.quantity; // Calculate total price
            totalItemsInCart += item.quantity; // Calculate total items count
        });
    }

    // Insert all created cart item boxes before the totalDiv
    shoppingCartDiv.insertBefore(fragment, totalDiv);

    totalDiv.textContent = `Total: ₹${overallTotal.toFixed(2)}`; // Update the displayed total price
    
    // Update the cart quantity badge on the main cart icon
    if (cartQuantityBadge) {
        cartQuantityBadge.textContent = totalItemsInCart; // Set the number of items
        // Show/hide the badge based on whether there are items in the cart
        if (totalItemsInCart === 0) {
            cartQuantityBadge.style.display = 'none';
        } else {
            cartQuantityBadge.style.display = 'flex'; // Use flex to center the number
        }
    }

    // Attach click event listeners to all trash icons in the cart
    document.querySelectorAll('.shopping-cart .fa-trash').forEach(trashIcon => {
        trashIcon.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id); // Get the product ID from the data attribute
            removeFromCart(productId); // Call function to remove the item
        });
    });
}


// --- Search Functionality ---
// This section handles the search bar's behavior.
const searchBox = document.getElementById('search-box'); // The search input field
const searchFormElement = document.querySelector('.search-form'); // The search form itself

// Listen for the 'Enter' key press in the search box
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission (which reloads the page)
        performSearch(); // Call the search function
    }
});

// Listen for a click on the search icon inside the search form
document.querySelector('.search-form label.fa-search').addEventListener('click', () => {
    performSearch(); // Call the search function
});

// Main search logic function
function performSearch() {
    const searchTerm = searchBox.value.trim().toLowerCase(); // Get search term, remove whitespace, convert to lowercase

    if (!searchTerm) {
        showToast('Please enter a search term.'); // Notify user if search box is empty
        return; // Stop the function
    }

    let foundMatch = false; // Flag to track if a match is found
    let targetElement = null; // Variable to store the HTML element to scroll to

    // First, try to find the search term in product names
    for (const product of products) {
        if (product.name.toLowerCase().includes(searchTerm)) {
            // If found, identify the product's category section
            targetElement = document.getElementById(`${product.category}-products`);
            if (targetElement) {
                foundMatch = true;
                break; // Stop searching once a product match is found
            }
        }
    }

    // If no product match, try to find the search term in category names
    if (!foundMatch) {
        for (const category of categories) {
            if (category.name.toLowerCase().includes(searchTerm)) {
                // If found, identify the category's product section
                targetElement = document.getElementById(`${category.id}-products`);
                if (targetElement) {
                    foundMatch = true;
                    break; // Stop searching once a category match is found
                }
            }
        }
    }

    // If a match was found and a target element was identified:
    if (foundMatch && targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smoothly scroll to the target section
        showToast(`Scrolling to: ${searchTerm}`); // Notify user of successful search
    } else {
        showToast(`No results found for "${searchTerm}"`); // Notify user if no match found
    }

    searchForm.classList.remove('active'); // Hide the search form
    searchBox.value = ''; // Clear the search box
}

// --- Toggle Details Function for Features Section ---
// This function shows/hides the detailed content for the "Read More" buttons.
function toggleDetails(id, button) {
    const details = document.getElementById(id);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'Read Less'; // Change button text
    } else {
        details.style.display = 'none';
        button.textContent = 'Read More'; // Change button text back
    }
}


// --- Initialize on Page Load ---
// This ensures that certain functions run as soon as the entire page is loaded.
document.addEventListener('DOMContentLoaded', () => {
    renderProductsByCategory(); // Render all product sections
    renderCategories(); // Render the main category boxes
    // renderDesktopCategoriesDropdown() and renderMobileCategoriesInMenu() calls removed
    // because their respective HTML elements/buttons have been removed.
    updateCartDisplay(); // Initialize the cart display (it will show "Your cart is empty" if nothing is added yet)
});
