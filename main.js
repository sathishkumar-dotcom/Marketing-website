// Navigation functionality
const initNavigation = () => {
    const nav = document.querySelector('nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky navigation
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 0) {
                nav.classList.add('shadow-md', 'bg-white/95');
            } else {
                nav.classList.remove('shadow-md', 'bg-white/95');
            }
        }
    });
};

// Portfolio filtering functionality
const initPortfolioFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // Add active class to clicked button
                button.classList.remove('bg-gray-200', 'text-gray-800');
                button.classList.add('bg-blue-600', 'text-white');

                const filter = button.getAttribute('data-filter');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }
};

// Contact form handling
const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            for (let key in data) {
                if (!data[key]) {
                    alert('Please fill in all fields');
                    return;
                }
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate form submission
            try {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                alert('There was an error sending your message. Please try again.');
            } finally {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        });
    }
};

// Stats counter animation
const initStatsCounter = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length) {
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-value'));
                    animateValue(target, 0, endValue, 2000);
                    observer.unobserve(target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });

        stats.forEach(stat => observer.observe(stat));
    }
};

// Helper function for stats counter
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
};

// Initialize all functionality
const initializeWebsite = () => {
    initNavigation();
    initPortfolioFilter();
    initContactForm();
    initStatsCounter();
    initSmoothScroll();
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);