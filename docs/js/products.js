document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    const categoriesGrid = document.querySelector('.categories-grid');
    const productsSection = document.getElementById('products-section');
    const productsGrid = document.getElementById('products-grid');
    const categoryTitle = document.getElementById('category-title');
    const backButton = document.querySelector('.back-button');

    // Add cart count to header
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon.querySelector('.cart-count')) {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.textContent = '0';
        cartIcon.appendChild(cartCount);
    }

    if (backButton) {
        backButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Categories
        `;
    }

    function displayProducts(category) {
        const categoryProducts = products[category];
        categoryTitle.textContent = category;
        productsGrid.innerHTML = '';

        categoryProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">${product.price}</p>
                </div>
                <div class="product-actions">
                    <button class="btn btn-add-cart">Add to Cart</button>
                </div>
            `;

            // Add to cart button functionality
            productCard.querySelector('.btn-add-cart').addEventListener('click', (e) => {
                const button = e.target;
                cart.addItem(product);
                button.textContent = 'Added ✓';
                button.classList.add('added');
                setTimeout(() => {
                    button.textContent = 'Add to Cart';
                    button.classList.remove('added');
                }, 1500);
            });

            productsGrid.appendChild(productCard);
        });

        categoriesGrid.style.display = 'none';
        productsSection.style.display = 'block';
    }

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            displayProducts(category);
        });
    });

    backButton.addEventListener('click', () => {
        productsSection.style.display = 'none';
        categoriesGrid.style.display = 'grid';
    });

    // Make cart icon clickable to show cart (using the existing cartIcon variable)
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'cart.html';
    });
});