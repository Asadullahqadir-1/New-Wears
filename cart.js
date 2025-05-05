// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                color: product.selectedColor
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item added to cart!');
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item removed from cart!');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.saveCart();
        this.updateCartCount();
    }

    calculateTotal() {
        this.total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return this.total;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'block' : 'none';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const product = {
            id: productCard.dataset.id,
            name: productCard.querySelector('h3').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
            image: productCard.querySelector('img').src,
            selectedColor: productCard.querySelector('.color-dot.active')?.style.backgroundColor || 'default'
        };
        cart.addItem(product);
    });
});

// Color selection
document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        productCard.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Cart Sidebar Toggle
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.cart-sidebar').classList.add('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    document.querySelector('.cart-sidebar').classList.remove('active');
});

// Modal Toggle
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.toggle('active');
}

// Login/Register Modal Triggers
document.querySelector('.login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal('login-modal');
});

document.querySelector('.register-btn').addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal('register-modal');
});

// Close Modal Buttons
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').classList.remove('active');
    });
});

// Close Modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Filter Buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Add your filtering logic here
    });
});

// Quick View Button (Add this to your product cards in HTML)
document.querySelectorAll('.product-card').forEach(card => {
    const quickViewBtn = document.createElement('button');
    quickViewBtn.className = 'quick-view-btn';
    quickViewBtn.textContent = 'Quick View';
    card.appendChild(quickViewBtn);

    quickViewBtn.addEventListener('click', () => {
        // Add your quick view logic here
        console.log('Quick view for:', card.querySelector('h3').textContent);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect to product images
document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Newsletter Form Animation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = newsletterForm.querySelector('button');
        button.textContent = 'Subscribing...';
        button.style.opacity = '0.7';
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.opacity = '1';
            newsletterForm.reset();
            
            setTimeout(() => {
                button.textContent = 'Subscribe';
            }, 2000);
        }, 1000);
    });
}

// Add loading animation to Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Adding...';
        this.style.opacity = '0.7';
        
        setTimeout(() => {
            this.textContent = 'Added!';
            this.style.opacity = '1';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        }, 500);
    });
}); 