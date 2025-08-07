/**
 * Mobile Optimization JavaScript for IQX P2P Trading Platform
 * Enhanced version with stability features to prevent sliding, zooming, and ensure responsive behavior
 */

class MobileOptimizer {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isScrolling = null;
        this.init();
    }

    init() {
        // Critical: Set up viewport stability first
        this.setupViewportStability();
        this.preventUnwantedBehaviors();
        this.setupTouchOptimizations();
        this.setupFormOptimizations();
        this.setupModalOptimizations();
        this.setupScrollOptimizations();
        this.setupOrientationHandling();
        this.setupResizeHandling();
        this.monitorPerformance();
    }

    // ===== VIEWPORT STABILITY =====
    setupViewportStability() {
        // Fix viewport height for mobile browsers (100vh issue)
        this.setVHProperty();
        
        // Prevent all zooming
        document.addEventListener('gesturestart', (e) => e.preventDefault());
        document.addEventListener('gesturechange', (e) => e.preventDefault());
        document.addEventListener('gestureend', (e) => e.preventDefault());
        
        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });

        // Prevent pinch zoom on iOS 10+
        document.addEventListener('touchmove', (event) => {
            if (event.scale !== 1) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    setVHProperty() {
        // Calculate real viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`);
    }

    // ===== PREVENT UNWANTED BEHAVIORS =====
    preventUnwantedBehaviors() {
        // Prevent horizontal scroll and bounce
        this.preventHorizontalScroll();
        this.preventBounceScroll();
        this.preventPullToRefresh();
        
        // Lock body scroll when needed
        this.setupBodyScrollLock();
    }

    preventHorizontalScroll() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!e.target.closest('.scrollable')) {
                const touchEndX = e.touches[0].clientX;
                const touchEndY = e.touches[0].clientY;
                
                const deltaX = Math.abs(touchEndX - touchStartX);
                const deltaY = Math.abs(touchEndY - touchStartY);
                
                // If horizontal movement is greater than vertical, prevent it
                if (deltaX > deltaY && deltaX > 10) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }

    preventBounceScroll() {
        // Prevent overscroll bounce on iOS
        document.body.addEventListener('touchmove', (e) => {
            // Only allow scrolling on elements marked as scrollable
            const scrollable = e.target.closest('.scrollable, .modal-body, .overlay-content');
            
            if (!scrollable) {
                e.preventDefault();
                return;
            }
            
            // Check if scrollable element is at its scroll boundaries
            const isAtTop = scrollable.scrollTop <= 0;
            const isAtBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;
            
            if ((isAtTop && e.touches[0].clientY > this.touchStartY) ||
                (isAtBottom && e.touches[0].clientY < this.touchStartY)) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    preventPullToRefresh() {
        // Prevent pull-to-refresh on Chrome
        document.body.style.overscrollBehaviorY = 'contain';
        
        // Additional prevention for iOS Safari
        let touchStartY = 0;
        
        window.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                touchStartY = e.touches[0].pageY;
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].pageY;
            const touchDiff = touchY - touchStartY;
            
            if (window.scrollY === 0 && touchDiff > 0 && e.cancelable) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    setupBodyScrollLock() {
        // Utility methods for locking body scroll
        window.lockBodyScroll = () => {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.setAttribute('data-scroll-lock', scrollY);
        };

        window.unlockBodyScroll = () => {
            const scrollY = document.body.getAttribute('data-scroll-lock');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY, 10));
                document.body.removeAttribute('data-scroll-lock');
            }
        };
    }

    // ===== TOUCH OPTIMIZATIONS =====
    setupTouchOptimizations() {
        // Fast click implementation
        this.implementFastClick();
        
        // Touch feedback
        this.setupTouchFeedback();
        
        // Swipe detection with direction locking
        this.setupSwipeDetection();
    }

    implementFastClick() {
        let touchStartTime;
        let touchStartPos;
        
        document.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartPos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndTime = Date.now();
            const touchEndPos = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            };
            
            // Check if it's a tap (not a swipe or long press)
            const timeDiff = touchEndTime - touchStartTime;
            const posDiff = Math.sqrt(
                Math.pow(touchEndPos.x - touchStartPos.x, 2) +
                Math.pow(touchEndPos.y - touchStartPos.y, 2)
            );
            
            if (timeDiff < 200 && posDiff < 10) {
                // It's a tap - trigger click immediately
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                e.target.dispatchEvent(clickEvent);
                e.preventDefault();
            }
        }, { passive: false });
    }

    setupTouchFeedback() {
        const interactiveElements = 'button, .btn, .nav-item, .merchant-card, .filter-dropdown, a, .clickable';
        
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest(interactiveElements);
            if (target) {
                target.classList.add('touch-active');
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const target = e.target.closest(interactiveElements);
            if (target) {
                setTimeout(() => {
                    target.classList.remove('touch-active');
                }, 150);
            }
        }, { passive: true });
    }

    setupSwipeDetection() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            this.isScrolling = null;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Determine scroll direction on first move
            if (this.isScrolling === null) {
                this.isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
            }
            
            // Lock to detected direction
            if (!this.isScrolling && Math.abs(deltaX) > 10) {
                e.preventDefault(); // Prevent horizontal scroll
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const deltaTime = touchEndTime - touchStartTime;
            
            // Reset values
            touchStartX = 0;
            touchStartY = 0;
            
            // Detect swipe (threshold: 50px, max time: 300ms)
            if (deltaTime < 300) {
                if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    this.triggerCustomEvent(deltaX > 0 ? 'swiperight' : 'swipeleft');
                } else if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
                    this.triggerCustomEvent(deltaY > 0 ? 'swipedown' : 'swipeup');
                }
            }
        }, { passive: true });
    }

    // ===== FORM OPTIMIZATIONS =====
    setupFormOptimizations() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Set appropriate input modes
            this.setInputMode(input);
            
            // Handle focus/blur for keyboard
            input.addEventListener('focus', (e) => this.handleInputFocus(e));
            input.addEventListener('blur', (e) => this.handleInputBlur(e));
        });

        // Prevent form zoom on iOS
        const metaViewport = document.querySelector('meta[name="viewport"]');
        const defaultContent = metaViewport.getAttribute('content');
        
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input, textarea, select')) {
                metaViewport.setAttribute('content', defaultContent + ', maximum-scale=1.0');
            }
        });
        
        document.addEventListener('focusout', () => {
            metaViewport.setAttribute('content', defaultContent);
        });
    }

    setInputMode(input) {
        const type = input.type;
        const inputModes = {
            'tel': 'tel',
            'email': 'email',
            'number': 'numeric',
            'url': 'url',
            'search': 'search'
        };
        
        if (inputModes[type]) {
            input.setAttribute('inputmode', inputModes[type]);
        }
        
        // Set autocomplete attributes
        if (type === 'email') {
            input.setAttribute('autocapitalize', 'off');
            input.setAttribute('autocorrect', 'off');
        }
    }

    handleInputFocus(e) {
        const input = e.target;
        
        // Smoothly scroll input into view
        setTimeout(() => {
            input.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }, 300);
        
        // Add class to body for keyboard adjustments
        document.body.classList.add('keyboard-visible');
    }

    handleInputBlur(e) {
        // Remove keyboard class
        document.body.classList.remove('keyboard-visible');
        
        // Ensure viewport returns to normal
        window.scrollTo(0, window.scrollY);
    }

    // ===== MODAL OPTIMIZATIONS =====
    setupModalOptimizations() {
        // Track open modals
        this.openModals = new Set();
        
        // Listen for modal events
        document.addEventListener('show.bs.modal', (e) => this.handleModalShow(e));
        document.addEventListener('hidden.bs.modal', (e) => this.handleModalHidden(e));
    }

    handleModalShow(e) {
        const modal = e.target;
        this.openModals.add(modal);
        
        // Lock body scroll
        if (this.openModals.size === 1) {
            window.lockBodyScroll();
        }
        
        // Add mobile modal class
        if (window.innerWidth < 768) {
            modal.classList.add('mobile-modal');
        }
        
        // Ensure modal content is scrollable
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.classList.add('scrollable');
        }
    }

    handleModalHidden(e) {
        const modal = e.target;
        this.openModals.delete(modal);
        
        // Unlock body scroll if no modals open
        if (this.openModals.size === 0) {
            window.unlockBodyScroll();
        }
        
        // Remove mobile modal class
        modal.classList.remove('mobile-modal');
    }

    // ===== SCROLL OPTIMIZATIONS =====
    setupScrollOptimizations() {
        // Passive scroll listeners for performance
        let ticking = false;
        let lastScrollY = 0;
        
        const updateScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide/show elements based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                document.body.classList.add('scrolling-down');
                document.body.classList.remove('scrolling-up');
            } else if (currentScrollY < lastScrollY) {
                document.body.classList.remove('scrolling-down');
                document.body.classList.add('scrolling-up');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    // ===== ORIENTATION HANDLING =====
    setupOrientationHandling() {
        const handleOrientationChange = () => {
            const orientation = window.orientation || screen.orientation?.angle || 0;
            const isLandscape = Math.abs(orientation) === 90;
            
            document.body.classList.toggle('landscape', isLandscape);
            document.body.classList.toggle('portrait', !isLandscape);
            
            // Recalculate viewport height
            this.setVHProperty();
            
            // Trigger custom event
            this.triggerCustomEvent('orientationchange', { isLandscape });
        };
        
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', this.debounce(handleOrientationChange, 150));
        
        // Initial check
        handleOrientationChange();
    }

    // ===== RESIZE HANDLING =====
    setupResizeHandling() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            // Add resizing class
            document.body.classList.add('resizing');
            
            // Clear previous timer
            clearTimeout(resizeTimer);
            
            // Update viewport height
            this.setVHProperty();
            
            // Remove resizing class after resize ends
            resizeTimer = setTimeout(() => {
                document.body.classList.remove('resizing');
            }, 150);
        });
    }

    // ===== PERFORMANCE MONITORING =====
    monitorPerformance() {
        // Check for layout thrashing
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', entry);
                    }
                }
            });
            
            observer.observe({ entryTypes: ['longtask'] });
        }
    }

    // ===== UTILITIES =====
    triggerCustomEvent(eventName, detail = {}) {
        const event = new CustomEvent(`mobile:${eventName}`, {
            detail,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== STATIC HELPERS =====
    static isMobile() {
        return window.innerWidth < 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static hasTouch() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }

    static getDeviceType() {
        const width = window.innerWidth;
        if (width < 576) return 'mobile';
        if (width < 768) return 'tablet-portrait';
        if (width < 992) return 'tablet-landscape';
        return 'desktop';
    }
}

// ===== ENHANCED CSS FOR MOBILE STABILITY =====
const mobileStabilityCSS = `
/* Touch feedback */
.touch-active {
    transform: scale(0.98) !important;
    opacity: 0.8 !important;
    transition: transform 0.1s ease !important;
}

/* Prevent text selection on UI elements */
.no-select {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
}

/* Scrollable areas */
.scrollable {
    -webkit-overflow-scrolling: touch !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}

/* Body states */
body.keyboard-visible {
    padding-bottom: 0 !important;
}

body.scrolling-down .header {
    transform: translateY(-100%);
    transition: transform 0.3s ease;
}

body.scrolling-up .header {
    transform: translateY(0);
    transition: transform 0.3s ease;
}

body.resizing * {
    transition: none !important;
}

/* Mobile modal enhancements */
.mobile-modal .modal-dialog {
    margin: 0 !important;
    max-width: 100% !important;
    height: 100vh !important;
    height: calc(var(--vh, 1vh) * 100) !important;
}

.mobile-modal .modal-content {
    height: 100% !important;
    border-radius: 0 !important;
    display: flex;
    flex-direction: column;
}

.mobile-modal .modal-body {
    flex: 1;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
}

/* Landscape adjustments */
body.landscape {
    --header-height: 50px;
    --bottom-nav-height: 50px;
}

body.landscape .nav-label {
    display: none !important;
}

/* Performance optimizations */
.hardware-accelerated {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: transform;
}

/* Debug mode (remove in production) */
.debug-mobile * {
    outline: 1px solid red !important;
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStabilityCSS;
document.head.appendChild(styleSheet);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mobileOptimizer = new MobileOptimizer();
    });
} else {
    window.mobileOptimizer = new MobileOptimizer();
}

// Export for use in other scripts
window.MobileOptimizer = MobileOptimizer;