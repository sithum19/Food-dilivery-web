// animations.js - Premium Animation System
class AnimationSystem {
    constructor() {
        this.initAnimations();
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    initAnimations() {
        this.createFloatingCards();
        this.setupCounterAnimations();
        this.setupStaggerAnimations();
        this.setupParallaxEffect();
    }

    // 1. Floating Cards Animation
    createFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        cards.forEach((card, index) => {
            // Remove default float animation from CSS
            card.style.animation = 'none';
            
            // Create custom floating animation with different patterns
            this.floatAnimation(card, index);
            
            // Add hover scale effect
            this.addHoverScale(card);
        });
    }

    floatAnimation(element, index) {
        const amplitude = 15 + (index * 5); // Different heights for each card
        const duration = 3000 + (index * 500); // Different speeds
        
        gsap.to(element, {
            duration: duration / 1000,
            y: amplitude,
            rotation: index % 2 === 0 ? 1 : -1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3
        });
    }

    // 2. Counter Animations for Stats
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    this.animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, stepTime);
    }

    // 3. Stagger Entrance Animations
    setupStaggerAnimations() {
        // Restaurant cards stagger
        const restaurantCards = document.querySelectorAll('.restaurant-card');
        gsap.from(restaurantCards, {
            scrollTrigger: {
                trigger: '.restaurants',
                start: 'top 80%',
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });


        
    }

    // 4. Parallax Scrolling Effect
    setupParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        
        gsap.to('.floating-card', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            y: (i, target) => {
                // Different parallax speeds for each card
                const speeds = [0.3, 0.5, 0.4];
                return window.scrollY * speeds[i];
            },
            ease: "none"
        });
    }

    // 5. Hover Effects with GSAP
    setupHoverEffects() {
        // Restaurant Cards
        document.querySelectorAll('.restaurant-card').forEach(card => {
            const image = card.querySelector('.restaurant-image img');
            const badge = card.querySelector('.restaurant-badge');
            
            // Mouse Enter
            card.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    duration: 0.5,
                    scale: 1.1,
                    ease: "power2.out"
                });
                
                if (badge) {
                    gsap.to(badge, {
                        duration: 0.3,
                        scale: 1.1,
                        yoyo: true,
                        repeat: 1
                    });
                }
            });
            
            // Mouse Leave
            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    duration: 0.5,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });

        // Food Item Cards
        document.querySelectorAll('.food-item-card').forEach(card => {
            const addButton = card.querySelector('.add-to-cart-btn');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(addButton, {
                    duration: 0.3,
                    bottom: '20px',
                    opacity: 1,
                    ease: "back.out(1.7)"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(addButton, {
                    duration: 0.3,
                    bottom: '-20px',
                    opacity: 0,
                    ease: "power2.in"
                });
            });
        });

        // Category Cards
        document.querySelectorAll('.category-card').forEach(card => {
            const icon = card.querySelector('.category-icon');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.2,
                    rotation: 360,
                    ease: "back.out(1.7)"
                });
                
                gsap.to(card, {
                    duration: 0.3,
                    boxShadow: '0 20px 40px rgba(255, 107, 0, 0.3)',
                    borderColor: '#FF6B00'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: "power2.out"
                });
                
                gsap.to(card, {
                    duration: 0.3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    borderColor: 'transparent'
                });
            });
        });

        // Buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    duration: 0.2,
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(255, 107, 0, 0.4)',
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    duration: 0.2,
                    scale: 1,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    ease: "power2.out"
                });
            });
            
            // Click animation
            button.addEventListener('mousedown', () => {
                gsap.to(button, {
                    duration: 0.1,
                    scale: 0.95,
                    ease: "power2.in"
                });
            });
            
            button.addEventListener('mouseup', () => {
                gsap.to(button, {
                    duration: 0.1,
                    scale: 1.05,
                    ease: "power2.out"
                });
            });
        });
    }

    // 6. Add to Cart Animation (Enhanced)
    setupAddToCartAnimation() {
        document.addEventListener('addToCart', (e) => {
            const { button, itemName, price } = e.detail;
            this.playAddToCartAnimation(button, itemName, price);
        });
    }

    playAddToCartAnimation(button, itemName, price) {
        // Create flying item element
        const flyingItem = document.createElement('div');
        flyingItem.className = 'flying-item';
        flyingItem.innerHTML = `
            <div class="flying-item-content">
                <i class="fas fa-shopping-cart"></i>
                <span>+1</span>
            </div>
        `;
        
        // Get positions
        const buttonRect = button.getBoundingClientRect();
        const cartBtn = document.querySelector('.cart-btn');
        const cartRect = cartBtn.getBoundingClientRect();
        
        // Style flying item
        Object.assign(flyingItem.style, {
            position: 'fixed',
            left: `${buttonRect.left + buttonRect.width / 2}px`,
            top: `${buttonRect.top + buttonRect.height / 2}px`,
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #FF6B00, #FF8B00)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: '1003',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%) scale(0)'
        });
        
        document.body.appendChild(flyingItem);
        
        // Animation timeline
        const tl = gsap.timeline();
        
        tl.to(flyingItem, {
            duration: 0.3,
            scale: 1,
            ease: "back.out(1.7)"
        })
        .to(flyingItem, {
            duration: 0.6,
            x: cartRect.left - buttonRect.left + cartRect.width / 2 - buttonRect.width / 2,
            y: cartRect.top - buttonRect.top + cartRect.height / 2 - buttonRect.height / 2,
            scale: 0.5,
            rotation: 360,
            ease: "power2.inOut"
        })
        .to(flyingItem, {
            duration: 0.2,
            scale: 0,
            opacity: 0,
            onComplete: () => {
                flyingItem.remove();
                
                // Cart icon bounce effect
                this.bounceCartIcon();
                
                // Show item name in notification
                this.showFloatingNotification(itemName, price);
            }
        });
    }

    bounceCartIcon() {
        const cartIcon = document.querySelector('.cart-btn');
        
        gsap.to(cartIcon, {
            duration: 0.2,
            scale: 1.3,
            ease: "back.out(1.7)",
            yoyo: true,
            repeat: 1
        });
        
        // Update cart count with animation
        const countElement = cartIcon.querySelector('.cart-count');
        if (countElement) {
            gsap.fromTo(countElement,
                { scale: 0 },
                { duration: 0.3, scale: 1.5, yoyo: true, repeat: 1, ease: "back.out(1.7)" }
            );
        }
    }

    showFloatingNotification(itemName, price) {
        const notification = document.createElement('div');
        notification.className = 'floating-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${itemName}</strong>
                    <small>LKR ${price.toLocaleString()} added to cart</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(22, 33, 62, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '15px',
            color: 'white',
            zIndex: '1002',
            transform: 'translateX(150%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            minWidth: '300px'
        });
        
        // Animate in
        gsap.to(notification, {
            duration: 0.5,
            x: 0,
            ease: "back.out(1.7)"
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            gsap.to(notification, {
                duration: 0.3,
                x: 150,
                opacity: 0,
                onComplete: () => notification.remove()
            });
        }, 3000);
    }

    // 7. Scroll Animations
    setupScrollAnimations() {
        // Navbar scroll effect
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.style.background = 'rgba(22, 33, 62, 0.85)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(22, 33, 62, 0.95)';
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down
                    gsap.to(navbar, {
                        duration: 0.3,
                        y: -100,
                        ease: "power2.inOut"
                    });
                } else {
                    // Scrolling up
                    gsap.to(navbar, {
                        duration: 0.3,
                        y: 0,
                        ease: "power2.out"
                    });
                }
            }
            
            lastScroll = currentScroll;
        });

        // Section reveal animations
        this.setupSectionReveals();
    }

    setupSectionReveals() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const title = section.querySelector('.section-title');
            const subtitle = section.querySelector('.section-subtitle');
            
            if (title && subtitle) {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: "power2.out"
                });
                
                gsap.from(subtitle, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                    },
                    duration: 0.6,
                    y: 20,
                    opacity: 0,
                    delay: 0.2,
                    ease: "power2.out"
                });
            }
        });
    }

    // 8. Loading Animations
    setupLoadingAnimations() {
        // Image loading animation
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                // Add shimmer effect
                const shimmer = document.createElement('div');
                shimmer.className = 'shimmer';
                img.parentNode.insertBefore(shimmer, img);
                
                Object.assign(shimmer.style, {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: 'inherit'
                });
                
                img.onload = () => {
                    shimmer.remove();
                    gsap.from(img, {
                        duration: 0.5,
                        opacity: 0,
                        scale: 1.1,
                        ease: "power2.out"
                    });
                };
            }
        });

        // Add shimmer animation to CSS
        if (!document.querySelector('#shimmer-style')) {
            const style = document.createElement('style');
            style.id = 'shimmer-style';
            style.textContent = `
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                .flying-item-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .notification-content i {
                    font-size: 20px;
                    color: #00E096;
                }
                
                .notification-content div {
                    flex: 1;
                }
                
                .notification-content strong {
                    display: block;
                    margin-bottom: 4px;
                }
                
                .notification-content small {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 12px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 9. Text Animation Effects
    setupTextAnimations() {
        // Hero title animation
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const lines = heroTitle.querySelectorAll('.title-line');
            
            gsap.from(lines, {
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.3,
                ease: "power3.out",
                delay: 0.5
            });
        }

        // Price ticker animation
        this.setupPriceTicker();
    }

    setupPriceTicker() {
        const prices = document.querySelectorAll('.current-price');
        
        prices.forEach(price => {
            price.addEventListener('mouseenter', () => {
                gsap.to(price, {
                    duration: 0.3,
                    scale: 1.1,
                    color: '#FFD166',
                    ease: "back.out(1.7)"
                });
            });
            
            price.addEventListener('mouseleave', () => {
                gsap.to(price, {
                    duration: 0.3,
                    scale: 1,
                    color: '#FF6B00',
                    ease: "power2.out"
                });
            });
        });
    }

    // 10. Interactive Rating Stars
    setupRatingAnimations() {
        const ratings = document.querySelectorAll('.restaurant-rating');
        
        ratings.forEach(rating => {
            const stars = rating.querySelectorAll('i.fa-star');
            
            stars.forEach((star, index) => {
                star.addEventListener('mouseenter', () => {
                    // Highlight stars up to this index
                    for (let i = 0; i <= index; i++) {
                        gsap.to(stars[i], {
                            duration: 0.2,
                            scale: 1.3,
                            color: '#FFD166',
                            ease: "power2.out"
                        });
                    }
                });
                
                star.addEventListener('mouseleave', () => {
                    // Reset all stars
                    stars.forEach(s => {
                        gsap.to(s, {
                            duration: 0.2,
                            scale: 1,
                            color: '#00E096',
                            ease: "power2.out"
                        });
                    });
                });
            });
        });
    }

    // 11. Page Transition Animation
    setupPageTransitions() {
        // Smooth page load animation
        window.addEventListener('load', () => {
            gsap.from('body', {
                duration: 0.5,
                opacity: 0,
                ease: "power2.inOut"
            });
        });

        // Link hover animation
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.2,
                    color: '#FF6B00',
                    ease: "power2.out"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    gsap.to(link, {
                        duration: 0.2,
                        color: 'inherit',
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // 12. Cart Sidebar Animations
    setupCartAnimations() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const overlay = document.querySelector('.cart-overlay');
        
        if (cartSidebar) {
            // Open animation
            const openCart = () => {
                gsap.to(overlay, {
                    duration: 0.3,
                    opacity: 1,
                    visibility: 'visible',
                    ease: "power2.out"
                });
                
                gsap.fromTo(cartSidebar,
                    { x: 400 },
                    {
                        duration: 0.4,
                        x: 0,
                        ease: "back.out(1.7)"
                    }
                );
                
                // Animate cart items
                const cartItems = cartSidebar.querySelectorAll('.cart-item');
                gsap.from(cartItems, {
                    duration: 0.5,
                    x: 50,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.2
                });
            };
            
            // Close animation
            const closeCart = () => {
                gsap.to(cartSidebar, {
                    duration: 0.3,
                    x: 400,
                    ease: "power2.in"
                });
                
                gsap.to(overlay, {
                    duration: 0.3,
                    opacity: 0,
                    delay: 0.1,
                    onComplete: () => {
                        overlay.style.visibility = 'hidden';
                    }
                });
            };
            
            // Expose these methods globally
            window.openCart = openCart;
            window.closeCart = closeCart;
        }
    }

    // 13. Search Bar Animation
    setupSearchAnimation() {
        const searchInput = document.querySelector('.search-input');
        const searchContainer = document.querySelector('.search-container');
        
        if (searchInput) {
            // Focus animation
            searchInput.addEventListener('focus', () => {
                gsap.to(searchContainer, {
                    duration: 0.3,
                    borderColor: '#FF6B00',
                    boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.2)',
                    scale: 1.02,
                    ease: "power2.out"
                });
                
                // Expand search suggestions
                const suggestions = document.querySelector('.search-suggestions');
                if (suggestions) {
                    gsap.from(suggestions, {
                        duration: 0.4,
                        height: 0,
                        opacity: 0,
                        ease: "power2.out"
                    });
                }
            });
            
            // Blur animation
            searchInput.addEventListener('blur', () => {
                gsap.to(searchContainer, {
                    duration: 0.3,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: 'none',
                    scale: 1,
                    ease: "power2.out"
                });
            });
        }
    }

    // 14. Order Button Success Animation
    setupOrderSuccessAnimation() {
        document.addEventListener('orderSuccess', () => {
            // Create success animation
            const successOverlay = document.createElement('div');
            successOverlay.className = 'order-success-overlay';
            successOverlay.innerHTML = `
                <div class="success-content">
                    <lottie-player
                        src="https://assets10.lottiefiles.com/packages/lf20_27aisbxe.json"
                        background="transparent"
                        speed="1"
                        style="width: 150px; height: 150px;"
                        autoplay>
                    </lottie-player>
                    <h3>Order Confirmed!</h3>
                    <p>Your delicious food is being prepared</p>
                </div>
            `;
            
            document.body.appendChild(successOverlay);
            
            // Style overlay
            Object.assign(successOverlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(22, 33, 62, 0.95)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '1004',
                opacity: '0'
            });
            
            // Animate in
            gsap.to(successOverlay, {
                duration: 0.5,
                opacity: 1,
                ease: "power2.out"
            });
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                gsap.to(successOverlay, {
                    duration: 0.5,
                    opacity: 0,
                    onComplete: () => successOverlay.remove()
                });
            }, 3000);
        });
    }

    // 15. Initialize all animations
    initialize() {
        // Load GSAP and plugins
        this.loadGSAP();
        
        // Initialize all animation systems
        setTimeout(() => {
            this.setupTextAnimations();
            this.setupRatingAnimations();
            this.setupPageTransitions();
            this.setupCartAnimations();
            this.setupSearchAnimation();
            this.setupOrderSuccessAnimation();
            this.setupAddToCartAnimation();
        }, 100);
    }

    loadGSAP() {
        // Check if GSAP is already loaded
        if (typeof gsap === 'undefined') {
            // Load GSAP from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
            script.onload = () => {
                // Load ScrollTrigger plugin
                const scrollTriggerScript = document.createElement('script');
                scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
                scrollTriggerScript.onload = () => {
                    gsap.registerPlugin(ScrollTrigger);
                    console.log('GSAP loaded successfully');
                };
                document.head.appendChild(scrollTriggerScript);
            };
            document.head.appendChild(script);
        }
    }

    addHoverScale(element) {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
                ease: "power2.out"
            });
        });
    }
}

// Intersection Observer Setup
AnimationSystem.prototype.setupIntersectionObservers = function() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out"
                });
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        fadeObserver.observe(el);
    });
};

// Initialize animation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationSystem = new AnimationSystem();
    animationSystem.initialize();
    
    // Make it globally available
    window.AnimationSystem = animationSystem;
    
    // Add animation classes to elements
    document.querySelectorAll('.restaurant-card, .category-card, .food-item-card').forEach(el => {
        el.classList.add('fade-in');
    });
});

// Custom event for add to cart
document.addEventListener('DOMContentLoaded', () => {
    // Override add to cart to trigger animation
    const originalAddToCart = window.Cart?.prototype?.addItem;
    
    if (originalAddToCart) {
        window.Cart.prototype.addItem = function(itemName, price, restaurant) {
            // Call original method
            originalAddToCart.call(this, itemName, price, restaurant);
            
            // Trigger animation event
            const event = new CustomEvent('addToCart', {
                detail: { itemName, price, restaurant }
            });
            document.dispatchEvent(event);
        };
    }
});

// Export animation utility functions
window.AnimationUtils = {
    // Shake animation for errors
    shake: function(element) {
        gsap.to(element, {
            duration: 0.1,
            x: -10,
            yoyo: true,
            repeat: 5,
            ease: "power1.inOut",
            onComplete: () => {
                gsap.to(element, { duration: 0.1, x: 0 });
            }
        });
    },
    
    // Pulse animation for highlights
    pulse: function(element) {
        gsap.to(element, {
            duration: 0.5,
            scale: 1.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    },
    
    // Bounce animation
    bounce: function(element) {
        gsap.to(element, {
            duration: 0.5,
            y: -20,
            yoyo: true,
            repeat: 1,
            ease: "bounce.out"
        });
    },
    
    // Fade out and remove
    fadeOutRemove: function(element, duration = 0.3) {
        gsap.to(element, {
            duration: duration,
            opacity: 0,
            scale: 0.8,
            onComplete: () => element.remove()
        });
    },
    
    // Color flash animation
    flashColor: function(element, color, duration = 0.3) {
        const originalColor = element.style.color;
        gsap.to(element, {
            duration: duration / 2,
            color: color,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                element.style.color = originalColor;
            }
        });
    }
};