// Get references to key HTML elements that we'll interact with using JavaScript
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');
let toastNotification = document.getElementById('toast-notification');

// --- Universal Close Function ---
function closeAllOverlays() {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// --- Header Icon Click Handlers ---
document.querySelector('#search-btn').onclick = () => {
    closeAllOverlays();
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
        document.getElementById('search-box').focus();
    }
};

document.querySelector('#cart-btn').onclick = () => {
    closeAllOverlays();
    shoppingCart.classList.toggle('active');
};

document.querySelector('#login-btn').onclick = () => {
    closeAllOverlays();
    loginForm.classList.toggle('active');
};

// --- Close active elements when clicking outside or scrolling ---
document.addEventListener('click', (event) => {
    const isSearchBtn = event.target.closest('#search-btn');
    const isCartBtn = event.target.closest('#cart-btn');
    const isLoginBtn = event.target.closest('#login-btn');

    const isClickOutsideSearch = !event.target.closest('.search-form.active') && !isSearchBtn;
    const isClickOutsideCart = !event.target.closest('.shopping-cart.active') && !isCartBtn;
    const isClickOutsideLogin = !event.target.closest('.login-form.active') && !isLoginBtn;
    const isClickInsideNavbar = event.target.closest('.navbar'); // Check if click is inside the nav

    if (searchForm.classList.contains('active') && isClickOutsideSearch) {
        searchForm.classList.remove('active');
    }
    if (shoppingCart.classList.contains('active') && isClickOutsideCart) {
        shoppingCart.classList.remove('active');
    }
    if (loginForm.classList.contains('active') && isClickOutsideLogin) {
        loginForm.classList.remove('active');
    }
    // Added logic to close navbar if open and click is outside
    if (navbar.classList.contains('active') && !isClickInsideNavbar) {
        navbar.classList.remove('active');
    }
});

window.onscroll = () => {
    if (searchForm.classList.contains('active') ||
        shoppingCart.classList.contains('active') ||
        loginForm.classList.contains('active') ||
        navbar.classList.contains('active')) { // Also close navbar on scroll
        closeAllOverlays();
    }
};

// --- Product and Category Data ---
const products = [
    { id: 1, name: 'Watermelon(1kg)', price: 35, image: 'image/watermelon.jfif', category: 'fruits' },
    { id: 2, name: 'Mango(1kg)', price: 55, image: 'image/mango.jfif', category: 'fruits' },
    { id: 3, name: 'Organic Orange(1kg)', price: 50, image: 'image/orange.jfif', category: 'fruits' },
    { id: 4, name: 'Red Apples (1kg)', price: 90, image: 'image/apple.jfif', category: 'fruits' },
    { id: 5, name: 'Green Grapes (500g)', price: 65, image: 'image/grapes.jfif', category: 'fruits' },

    { id: 6, name: 'Fresh Onion (1kg)', price: 25, image: 'image/onion.jfif', category: 'vegetables' },
    { id: 7, name: 'Fresh Potato (1kg)', price: 30, image: 'image/potato.jfif', category: 'vegetables' },
    { id: 8, name: 'Farm Fresh Tomato (1kg)', price: 40, image: 'image/tomato.jfif', category: 'vegetables' },
    { id: 9, name: 'Cauliflower(1pc)', price: 35, image: 'image/cauliflower.jfif', category: 'vegetables' },
    { id: 10, name: 'Spinach (250g)', price: 25, image: 'image/spinach.jfif', category: 'vegetables' },

    { id: 11, name: 'Farm Fresh Milk (1L)', price: 60, image: 'image/milk.jfif', category: 'dairy' },
    { id: 12, name: 'Amul Butter (100g)', price: 50, image: 'image/butter.jfif', category: 'dairy' },
    { id: 13, name: 'Paneer (200g)', price: 120, image: 'image/paneer.jfif', category: 'dairy' },
    { id: 14, name: 'Curd (500g)', price: 40, image: 'image/curd.jfif', category: 'dairy' },

    { id: 15, name: 'Chicken Breast (500g)', price: 180, image: 'image/chicken.jfif', category: 'meat-fish' },
    { id: 16, name: 'Fish (500g)', price: 150, image: 'image/rohu-fish.jfif', category: 'meat-fish' },
    { id: 17, name: 'Eggs (Dozen)', price: 80, image: 'image/Eggs.jfif', category: 'meat-fish' },

    { id: 18, name: 'Whole Wheat Bread', price: 45, image: 'image/bread.jfif', category: 'bakery' },
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

    // Attach event listeners for product quantity buttons and Add to Cart
    // These need to be re-attached because products are re-rendered
    document.querySelectorAll('.product-qty-minus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const productBox = button.closest('.product-box');
            const quantitySpan = productBox.querySelector('.quantity-value');
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantitySpan.textContent = currentQuantity;
                productBox.dataset.quantityToAdd = currentQuantity; // Update quantity to add
            }
        });
    });

    document.querySelectorAll('.product-qty-plus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const productBox = button.closest('.product-box');
            const quantitySpan = productBox.querySelector('.quantity-value');
            let currentQuantity = parseInt(quantitySpan.textContent);
            currentQuantity++;
            quantitySpan.textContent = currentQuantity;
            productBox.dataset.quantityToAdd = currentQuantity; // Update quantity to add
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = parseInt(button.dataset.id);
            const productBox = button.closest('.product-box');
            const quantityToAdd = parseInt(productBox.dataset.quantityToAdd); // Get the quantity from the data attribute
            addToCart(productId, quantityToAdd); // Pass the quantity to addToCart
            // Reset quantity display to 1 after adding to cart
            productBox.querySelector('.quantity-value').textContent = 1;
            productBox.dataset.quantityToAdd = 1;
        });
    });
}

// --- Render Categories (for the main Categories section with image boxes) ---
function renderCategories() {
    const categoryContainer = document.querySelector('.category-container');
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
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToLocalStorage();
    showToast('Item removed from cart!');
}

// Function to update the cart's visual display
function updateCartDisplay() {
    const shoppingCartDiv = document.querySelector('.shopping-cart');
    const totalDiv = shoppingCartDiv.querySelector('.total');
    const cartQuantityBadge = document.querySelector('.cart-quantity-badge');

    // Remove all existing product boxes from the cart display to rebuild it
    // Selects only elements that are immediate children and have 'box' class
    Array.from(shoppingCartDiv.children).forEach(child => {
        if (child.classList.contains('box')) {
            child.remove();
        }
    });

    const fragment = document.createDocumentFragment();
    let overallTotal = 0;
    let totalItemsInCart = 0;

    if (cart.length === 0) {
        const emptyCartMsg = document.createElement('div');
        emptyCartMsg.classList.add('box'); // Apply box class for styling consistency
        emptyCartMsg.innerHTML = '<div class="content"><h3>Your cart is empty.</h3></div>';
        fragment.appendChild(emptyCartMsg);
    } else {
        cart.forEach(item => {
            const cartItemBox = document.createElement('div');
            cartItemBox.classList.add('box');
            cartItemBox.innerHTML = `
                <i class="fa fa-trash" data-id="${item.id}"></i>
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
    }

    const existingTotalDiv = shoppingCartDiv.querySelector('.total');
    const existingCheckoutBtn = shoppingCartDiv.querySelector('.btn');
    
    // Insert new cart items before the total and checkout button
    if (existingTotalDiv) {
        shoppingCartDiv.insertBefore(fragment, existingTotalDiv);
    } else {
        // Fallback if total div is somehow missing, append to end
        shoppingCartDiv.appendChild(fragment);
    }

    totalDiv.textContent = `Total: ₹${overallTotal.toFixed(2)}`;
    
    if (cartQuantityBadge) {
        cartQuantityBadge.textContent = totalItemsInCart;
        if (totalItemsInCart === 0) {
            cartQuantityBadge.style.display = 'none'; // Hide badge if cart is empty
        } else {
            cartQuantityBadge.style.display = 'flex'; // Show badge
        }
    }

    // Attach click event listeners to all trash icons in the cart
    // These need to be re-attached because cart items are re-rendered
    document.querySelectorAll('.shopping-cart .fa-trash').forEach(trashIcon => {
        trashIcon.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id);
            removeFromCart(productId);
        });
    });

    // Attach event listeners for cart item quantity buttons
    // These need to be re-attached because cart items are re-rendered
    document.querySelectorAll('.cart-qty-minus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = parseInt(button.dataset.id);
            const quantitySpan = button.nextElementSibling; // Get the quantity span next to it
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 0) {
                updateCartItemQuantity(productId, currentQuantity - 1);
            }
        });
    });

    document.querySelectorAll('.cart-qty-plus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = parseInt(button.dataset.id);
            const quantitySpan = button.previousElementSibling; // Get the quantity span before it
            let currentQuantity = parseInt(quantitySpan.textContent);
            updateCartItemQuantity(productId, currentQuantity + 1);
        });
    });
}

// --- Search Functionality ---
const searchBox = document.getElementById('search-box');
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

    // Search through products first
    for (const product of products) {
        if (product.name.toLowerCase().includes(searchTerm)) {
            targetElement = document.getElementById(`${product.category}-products`);
            if (targetElement) {
                foundMatch = true;
                // Scroll to the product category section
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Add highlight to the specific product box after a short delay
                setTimeout(() => {
                    const productBoxes = document.querySelectorAll(`.product-container[data-category="${product.category}"] .product-box`);
                    productBoxes.forEach(box => {
                        if (box.querySelector('h3').textContent.toLowerCase().includes(searchTerm)) {
                            box.classList.add('highlight-search');
                            setTimeout(() => box.classList.remove('highlight-search'), 3000); // Remove highlight after 3 seconds
                        }
                    });
                }, 600); // Give time for scroll to initiate
                break; // Found a product match, no need to search further
            }
        }
    }

    // If no product match, search through categories
    if (!foundMatch) {
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
                    break; // Found a category match
                }
            }
        }
    }

    if (foundMatch && targetElement) {
        showToast(`Scrolling to: ${searchTerm}`);
    } else {
        showToast(`No results found for "${searchTerm}"`);
    }

    // Close search form and clear input after search
    searchForm.classList.remove('active');
    searchBox.value = '';
}

// --- Toggle Details Function for Features Section ---
function toggleDetails(id, button) {
    const details = document.getElementById(id);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'Read Less';
    } else {
        details.style.display = 'none';
        button.textContent = 'Read More';
    }
}

// --- Initialize on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    renderProductsByCategory();
    renderCategories();
    updateCartDisplay(); // Load and display cart from local storage on page load
});
