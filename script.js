// GrwStore - Main Application Module
// Refactored with ES6 modules, accessibility improvements, and better practices

import { products } from './products-data.js';

// ============================================================================
// Store Class - Encapsulates all store functionality
// ============================================================================
class GrwStore {
    constructor() {
        this.cart = [];
        this.products = products;
        this.domElements = {};
        this.searchDebounceTimer = null;
    }

    // Initialize the application
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderProducts(this.products);
        this.loadCart();
        this.setupKeyboardNavigation();
    }

    // Cache DOM elements for performance
    cacheDOM() {
        this.domElements = {
            productsGrid: document.getElementById('productsGrid'),
            cartBtn: document.getElementById('cartBtn'),
            cartModal: document.getElementById('cartModal'),
            closeCart: document.getElementById('closeCart'),
            cartItems: document.getElementById('cartItems'),
            cartCount: document.getElementById('cartCount'),
            cartTotal: document.getElementById('cartTotal'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            searchInput: document.getElementById('searchInput'),
            mobileMenuToggle: document.getElementById('mobileMenuToggle'),
            navMenu: document.getElementById('navMenu'),
            toastContainer: document.getElementById('toastContainer'),
            checkoutBtn: document.querySelector('.checkout-btn'),
            contactForm: document.querySelector('.contact-form'),
            newsletterForm: document.querySelector('.newsletter-form')
        };
    }

    // Bind all event listeners
    bindEvents() {
        // Cart modal events
        this.domElements.cartBtn?.addEventListener('click', () => this.openCart());
        this.domElements.closeCart?.addEventListener('click', () => this.closeCartModal());
        this.domElements.cartModal?.addEventListener('click', (e) => {
            if (e.target === this.domElements.cartModal) {
                this.closeCartModal();
            }
        });

        // Filter buttons
        this.domElements.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Search with debounce
        this.domElements.searchInput?.addEventListener('input', (e) => {
            this.debounceSearch(e.target.value);
        });

        // Mobile menu toggle
        this.domElements.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking nav links
        this.domElements.navMenu?.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Form submissions
        this.domElements.contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));
        this.domElements.newsletterForm?.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));

        // Checkout button
        this.domElements.checkoutBtn?.addEventListener('click', () => this.handleCheckout());

        // Keyboard navigation for cart
        document.addEventListener('keydown', (e) => this.handleKeyboardEvents(e));
    }

    // Setup keyboard navigation for accessibility
    setupKeyboardNavigation() {
        // Make product cards focusable and add keyboard support
        const productCards = this.domElements.productsGrid?.querySelectorAll('.product-card');
        productCards?.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const addToCartBtn = card.querySelector('.add-to-cart');
                    if (addToCartBtn) {
                        addToCartBtn.click();
                    }
                }
            });
        });
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        this.domElements.mobileMenuToggle?.classList.toggle('active');
        this.domElements.navMenu?.classList.toggle('active');
        
        const isActive = this.domElements.navMenu?.classList.contains('active');
        this.domElements.mobileMenuToggle?.setAttribute('aria-expanded', isActive.toString());
    }

    // Close mobile menu
    closeMobileMenu() {
        this.domElements.mobileMenuToggle?.classList.remove('active');
        this.domElements.navMenu?.classList.remove('active');
        this.domElements.mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    }

    // Render products to the grid
    renderProducts(productsToRender) {
        if (!this.domElements.productsGrid) return;

        if (productsToRender.length === 0) {
            this.domElements.productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No se encontraron productos</p>
                </div>
            `;
            return;
        }

        this.domElements.productsGrid.innerHTML = productsToRender.map(product => `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="product-image" aria-hidden="true">${product.icon}</div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price" aria-label="Precio: $${product.price.toFixed(2)}">
                        $${product.price.toFixed(2)}
                    </div>
                    <button 
                        class="add-to-cart" 
                        data-product-id="${product.id}"
                        aria-label="Agregar ${product.name} al carrito"
                    >
                        <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to new add-to-cart buttons
        this.domElements.productsGrid.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.productId);
                this.addToCart(productId);
            });
        });

        // Re-setup keyboard navigation
        this.setupKeyboardNavigation();
    }

    // Handle filter button clicks
    handleFilter(e) {
        const btn = e.currentTarget;
        this.domElements.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        if (filter === 'all') {
            this.renderProducts(this.products);
        } else {
            const filtered = this.products.filter(p => p.category === filter);
            this.renderProducts(filtered);
        }
    }

    // Debounce search input
    debounceSearch(searchTerm) {
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => {
            this.performSearch(searchTerm);
        }, 300);
    }

    // Perform search
    performSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (!term) {
            this.renderProducts(this.products);
            return;
        }

        const filtered = this.products.filter(p => 
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            (p.description && p.description.toLowerCase().includes(term))
        );
        
        this.renderProducts(filtered);
    }

    // Add item to cart
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateCartUI();
        this.saveCart();
        this.showToast(`✅ ${product.name} agregado al carrito`, 'success');
    }

    // Remove item from cart
    removeFromCart(productId) {
        const item = this.cart.find(i => i.id === productId);
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
        this.saveCart();
        
        if (item) {
            this.showToast(`${item.name} eliminado del carrito`, 'info');
        }
    }

    // Update cart UI
    updateCartUI() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (this.domElements.cartCount) {
            this.domElements.cartCount.textContent = totalItems;
        }
        
        if (this.domElements.cartTotal) {
            this.domElements.cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }
        
        if (this.domElements.cartItems) {
            if (this.cart.length === 0) {
                this.domElements.cartItems.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                        <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>Tu carrito está vacío</p>
                    </div>
                `;
            } else {
                this.domElements.cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item" role="listitem">
                        <div class="cart-item-image" aria-hidden="true">${item.icon}</div>
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">
                                $${item.price.toFixed(2)} x ${item.quantity}
                            </div>
                        </div>
                        <button 
                            class="cart-item-remove" 
                            onclick="window.store.removeFromCart(${item.id})"
                            aria-label="Eliminar ${item.name} del carrito"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
            }
        }
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('grwCart', JSON.stringify(this.cart));
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('grwCart');
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart);
                this.updateCartUI();
            } catch (e) {
                console.error('Error loading cart:', e);
                this.cart = [];
            }
        }
    }

    // Open cart modal
    openCart() {
        this.domElements.cartModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        const firstFocusable = this.domElements.cartModal?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        firstFocusable?.focus();
    }

    // Close cart modal
    closeCartModal() {
        this.domElements.cartModal?.classList.remove('active');
        document.body.style.overflow = '';
        this.domElements.cartBtn?.focus();
    }

    // Handle keyboard events
    handleKeyboardEvents(e) {
        // Close cart on Escape
        if (e.key === 'Escape' && this.domElements.cartModal?.classList.contains('active')) {
            this.closeCartModal();
        }
    }

    // Handle smooth scroll
    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            this.closeMobileMenu();
        }
    }

    // Handle contact form submission
    handleContactSubmit(e) {
        e.preventDefault();
        const form = e.target;
        
        // Basic validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            this.showToast('¡Mensaje enviado con éxito!', 'success');
            form.reset();
        } else {
            this.showToast('Por favor completa todos los campos requeridos', 'error');
        }
    }

    // Handle newsletter subscription
    handleNewsletterSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]');
        
        if (email && email.value.trim()) {
            this.showToast('¡Gracias por suscribirte!', 'success');
            form.reset();
        } else {
            this.showToast('Por favor ingresa un email válido', 'error');
        }
    }

    // Handle checkout
    handleCheckout() {
        if (this.cart.length === 0) {
            this.showToast('Tu carrito está vacío', 'error');
        } else {
            this.showToast('🚀 Redirigiendo al pago...', 'info');
            // Integration point for payment gateway
            // window.location.href = '/checkout';
        }
    }

    // Show toast notification
    showToast(message, type = 'info') {
        if (!this.domElements.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        
        this.domElements.toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ============================================================================
// Initialize Application
// ============================================================================
const store = new GrwStore();

// Expose store to window for inline onclick handlers (temporary compatibility)
window.store = store;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    store.init();
});

// Export for potential use in other modules
export { GrwStore, store };
