class Cart {
    constructor() {
        this.items = [];
        this.deliveryFee = 250;
        this.taxRate = 0.08;
        this.loadCart();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCartCount();
        this.renderCart();
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('gourmetCart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }
    
    saveCart() {
        localStorage.setItem('gourmetCart', JSON.stringify(this.items));
    }
    
    addItem(itemName, price, restaurant) {
        const existingItem = this.items.find(item => 
            item.name === itemName && item.restaurant === restaurant
        );
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                name: itemName,
                price: price,
                restaurant: restaurant,
                quantity: 1,
                id: Date.now()
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        // Notification only handled by JS here, Animation handled by animations.js event
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }
    
    updateQuantity(itemId, change) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
        }
    }
    
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getTax() {
        return this.getSubtotal() * this.taxRate;
    }
    
    getTotal() {
        return this.getSubtotal() + this.deliveryFee + this.getTax();
    }
    
    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.setAttribute('data-count', count);
        }
    }
    
    renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalEl = document.querySelector('.total-price');
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>`;
        } else {
            cartItemsContainer.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">LKR ${item.price.toLocaleString()}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
            
            cartItemsContainer.querySelectorAll('.quantity-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                    const isPlus = e.target.classList.contains('plus');
                    this.updateQuantity(itemId, isPlus ? 1 : -1);
                });
            });
            
            cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                    this.removeItem(itemId);
                });
            });
        }
        
        if (totalEl) totalEl.textContent = `LKR ${this.getTotal().toLocaleString()}`;
    }
    
    setupEventListeners() {
        // Cart toggle
        const toggleCart = () => {
            document.querySelector('.cart-sidebar').classList.toggle('active');
            document.querySelector('.cart-overlay').classList.toggle('active');
        };

        document.querySelector('.cart-btn').addEventListener('click', toggleCart);
        document.querySelector('.close-cart').addEventListener('click', toggleCart);
        document.querySelector('.cart-overlay').addEventListener('click', toggleCart);
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemName = btn.dataset.item;
                const price = parseInt(btn.dataset.price);
                const card = btn.closest('.food-item-card');
                const restaurant = card ? card.querySelector('.food-item-title').textContent : 'Restaurant';
                
                this.addItem(itemName, price, restaurant);
                
                // IMPORTANT: Dispatch Custom Event for animations.js to catch
                document.dispatchEvent(new CustomEvent('addToCart', {
                    detail: {
                        button: btn,
                        itemName: itemName,
                        price: price
                    }
                }));
            });
        });
        
        // Order now buttons
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const restaurant = btn.dataset.restaurant;
                this.addItem("Special Rice & Curry", 950, restaurant);
                toggleCart();
            });
        });

        // Search Input
        const searchInput = document.querySelector('.search-input');
        if(searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    alert('Search functionality coming soon!');
                }
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});