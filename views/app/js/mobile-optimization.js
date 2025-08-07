/**
 * Mobile Optimization JavaScript for IQX P2P Trading Platform
 * Provides enhanced mobile functionality and touch interactions
 */

class MobileOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupViewportHandler();
        this.setupTouchOptimizations();
        this.setupFormOptimizations();
        this.setupModalOptimizations();
        this.setupSwipeGestures();
        this.setupPullToRefresh();
        this.setupVirtualKeyboardHandling();
    }

    // Handle viewport changes and orientation
    setupViewportHandler() {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.adjustViewport();
            }, 500);
        });

        // Handle resize events
        window.addEventListener('resize', this.debounce(() => {
            this.adjustViewport();
        }, 250));
    }

    // Adjust viewport for different screen sizes
    adjustViewport() {
        const isMobile = window.innerWidth < 768;
        const isLandscape = window.innerWidth > window.innerHeight;
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
            
            if (isLandscape) {
                document.body.classList.add('landscape-mode');
            } else {
                document.body.classList.remove('landscape-mode');
            }
        } else {
            document.body.classList.remove('mobile-device', 'landscape-mode');
        }
    }

    // Enhanced touch interactions
    setupTouchOptimizations() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.btn, .card, .nav-link, .clickable');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
            element.addEventListener('touchcancel', this.handleTouchEnd.bind(this), { passive: true });
        });

        // Prevent scrolling when touching buttons
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    handleTouchStart(event) {
        event.currentTarget.classList.add('touch-active');
    }

    handleTouchEnd(event) {
        setTimeout(() => {
            event.currentTarget.classList.remove('touch-active');
        }, 150);
    }

    // Optimize forms for mobile
    setupFormOptimizations() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Auto-capitalize and input modes
            if (input.type === 'email') {
                input.setAttribute('autocapitalize', 'none');
                input.setAttribute('autocorrect', 'off');
                input.setAttribute('inputmode', 'email');
            }
            
            if (input.type === 'tel') {
                input.setAttribute('inputmode', 'tel');
            }
            
            if (input.type === 'number') {
                input.setAttribute('inputmode', 'numeric');
            }
            
            // Handle focus events
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });
    }

    handleInputFocus(event) {
        // Scroll input into view on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                event.target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
        }
    }

    handleInputBlur(event) {
        // Remove any scrolling artifacts
        window.scrollTo(window.scrollX, window.scrollY);
    }

    // Enhanced modal handling for mobile
    setupModalOptimizations() {
        // Handle modal opening
        document.addEventListener('show.bs.modal', (event) => {
            this.handleModalOpen(event.target);
        });

        // Handle modal closing
        document.addEventListener('hidden.bs.modal', (event) => {
            this.handleModalClose(event.target);
        });
    }

    handleModalOpen(modal) {
        if (window.innerWidth < 768) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            modal.classList.add('mobile-modal');
        }
    }

    handleModalClose(modal) {
        if (window.innerWidth < 768) {
            document.body.style.position = '';
            document.body.style.width = '';
            modal.classList.remove('mobile-modal');
        }
    }

    // Simple swipe gesture support
    setupSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });

        this.handleSwipe = () => {
            const threshold = 50;
            const restraint = 100;
            const allowedTime = 300;
            
            const distX = touchEndX - touchStartX;
            const distY = touchEndY - touchStartY;
            
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    this.triggerCustomEvent('swipeRight');
                } else {
                    this.triggerCustomEvent('swipeLeft');
                }
            }
            
            if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                if (distY > 0) {
                    this.triggerCustomEvent('swipeDown');
                } else {
                    this.triggerCustomEvent('swipeUp');
                }
            }
        };
    }

    // Pull to refresh functionality
    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let pullThreshold = 80;
        let isRefreshing = false;

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].pageY;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0 && !isRefreshing) {
                currentY = e.touches[0].pageY;
                const pullDistance = currentY - startY;
                
                if (pullDistance > 0) {
                    this.updatePullIndicator(pullDistance, pullThreshold);
                }
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (window.scrollY === 0 && !isRefreshing) {
                const pullDistance = currentY - startY;
                
                if (pullDistance > pullThreshold) {
                    this.triggerRefresh();
                } else {
                    this.resetPullIndicator();
                }
            }
        }, { passive: true });
    }

    updatePullIndicator(distance, threshold) {
        const percentage = Math.min(distance / threshold, 1);
        const indicator = document.querySelector('.pull-refresh-indicator');
        
        if (indicator) {
            indicator.style.transform = `translateY(${Math.min(distance, threshold)}px)`;
            indicator.style.opacity = percentage;
        }
    }

    triggerRefresh() {
        this.triggerCustomEvent('pullToRefresh');
        // Reset after animation
        setTimeout(() => {
            this.resetPullIndicator();
        }, 1000);
    }

    resetPullIndicator() {
        const indicator = document.querySelector('.pull-refresh-indicator');
        if (indicator) {
            indicator.style.transform = 'translateY(0)';
            indicator.style.opacity = '0';
        }
    }

    // Handle virtual keyboard
    setupVirtualKeyboardHandling() {
        let initialViewportHeight = window.innerHeight;
        
        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            const heightDifference = initialViewportHeight - currentHeight;
            
            if (heightDifference > 150) {
                // Virtual keyboard is likely open
                document.body.classList.add('keyboard-open');
                this.triggerCustomEvent('keyboardOpen');
            } else {
                // Virtual keyboard is likely closed
                document.body.classList.remove('keyboard-open');
                this.triggerCustomEvent('keyboardClose');
            }
        });
    }

    // Utility function to trigger custom events
    triggerCustomEvent(eventName, data = {}) {
        const event = new CustomEvent(eventName, { 
            detail: data,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }

    // Debounce utility
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

    // Check if device is mobile
    static isMobile() {
        return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Check if device supports touch
    static hasTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Get safe area insets
    static getSafeAreaInsets() {
        const style = getComputedStyle(document.documentElement);
        return {
            top: parseInt(style.getPropertyValue('env(safe-area-inset-top)')) || 0,
            right: parseInt(style.getPropertyValue('env(safe-area-inset-right)')) || 0,
            bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
            left: parseInt(style.getPropertyValue('env(safe-area-inset-left)')) || 0
        };
    }
}

// CSS for touch feedback
const touchFeedbackCSS = `
.touch-active {
    transform: scale(0.98) !important;
    opacity: 0.8 !important;
    transition: all 0.1s ease !important;
}

.keyboard-open {
    padding-bottom: 0 !important;
}

.mobile-modal {
    padding: 0 !important;
}

.mobile-modal .modal-dialog {
    margin: 0 !important;
    max-width: 100% !important;
    height: 100vh !important;
}

.mobile-modal .modal-content {
    height: 100% !important;
    border-radius: 0 !important;
}

.pull-refresh-indicator {
    position: fixed;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: var(--color-primary, #3B82F6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
}
`;

// Add CSS to document
const style = document.createElement('style');
style.textContent = touchFeedbackCSS;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MobileOptimizer();
    });
} else {
    new MobileOptimizer();
}

// Export for use in other scripts
window.MobileOptimizer = MobileOptimizer;
