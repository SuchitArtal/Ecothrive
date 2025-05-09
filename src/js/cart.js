class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.renderCart();
        this.updateCartCount();
        this.bindEvents();
    }

    addItem(product) {
        const existingItem = this.items.find(item => 
            item.id === product.id && 
            item.name === product.name
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
    }

    updateQuantity(productId, delta) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            const newQuantity = item.quantity + delta;
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                this.removeItem(productId);
            }
            this.saveCart();
            this.renderCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('₹', ''));
            return sum + (price * item.quantity);
        }, 0);
    }

    renderCart() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="cart-item-price">${item.price} × ${item.quantity}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="cart.updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="cart.updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn btn-remove" onclick="cart.removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = this.calculateTotal();
        if (document.getElementById('subtotal')) {
            document.getElementById('subtotal').textContent = `₹${total.toFixed(2)}`;
            document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
        }
    }

    bindEvents() {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                const total = this.calculateTotal();
                alert(`Thank you for your order! Total: ₹${total.toFixed(2)}\nProceeding to payment...`);
                // Here you would typically redirect to a payment processing page
                // For now, we'll just clear the cart
                this.items = [];
                this.saveCart();
                this.renderCart();
            });
        }
    }
}

const cart = new Cart();