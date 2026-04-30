/* ============================================
   HEALING ROOTS COLLECTIVE - Main JavaScript
   
   This file handles:
   - Mobile navigation toggle
   - Sticky header on scroll
   - Smooth scroll for navigation links
   - FAQ accordion functionality
   - Contact form submission (mock)
   - Scroll reveal animations
============================================ */

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ELEMENT SELECTORS
    // ============================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const fadeElements = document.querySelectorAll('.fade-in');

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // Opens/closes the mobile menu when hamburger is clicked
    // ============================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ============================================
    // CLOSE MOBILE MENU ON LINK CLICK
    // When a nav link is clicked, close the mobile menu
    // ============================================
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ============================================
    // CLOSE MOBILE MENU ON OUTSIDE CLICK
    // Click outside the menu to close it
    // ============================================
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // STICKY HEADER ON SCROLL
    // Add 'scrolled' class when user scrolls down
    // ============================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Run on scroll and on page load
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Check initial position

    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // Handles anchor links with smooth scrolling
    // ============================================
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Get header height for offset
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // Highlights the current section in navigation
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's link
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // FAQ ACCORDION
    // Toggle FAQ answers when questions are clicked
    // ============================================
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(function(faqItem) {
                    faqItem.classList.remove('active');
                    const btn = faqItem.querySelector('.faq-question');
                    if (btn) {
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ============================================
    // CONTACT FORM SUBMISSION (MOCK)
    // Shows success message when form is submitted
    // Form does not actually send data anywhere
    // ============================================
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent actual form submission
            event.preventDefault();
            
            // Get form values for validation feedback (optional)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation check
            if (name && email && message) {
                // Hide the form
                contactForm.classList.add('hidden');
                
                // Show success message
                formSuccess.classList.add('show');
                
                // Optional: Log to console for demonstration
                console.log('Form submitted (mock):', {
                    name: name,
                    email: email,
                    message: message
                });
                
                // Optional: Reset form after a delay (if user wants to submit again)
                setTimeout(function() {
                    contactForm.reset();
                }, 1000);
            }
        });
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // Shows reading progress at the top of the page
    // ============================================
    const scrollProgress = document.getElementById('scroll-progress');
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // Fade in elements as they come into view
    // ============================================
    const allRevealElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Pixels from bottom to trigger
        
        allRevealElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }

    // Run on scroll and on page load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check elements visible on load

    // ============================================
    // PARALLAX EFFECT ON HERO LEAVES
    // Subtle movement on scroll for depth
    // ============================================
    const leaves = document.querySelectorAll('.leaf');

    function parallaxLeaves() {
        const scrollY = window.scrollY;
        leaves.forEach(function(leaf, index) {
            const speed = (index + 1) * 0.03;
            leaf.style.transform = leaf.style.transform || '';
            const yOffset = scrollY * speed;
            if (leaf.classList.contains('leaf--1')) {
                leaf.style.marginTop = -yOffset + 'px';
            } else if (leaf.classList.contains('leaf--2')) {
                leaf.style.marginTop = -yOffset * 0.7 + 'px';
            } else {
                leaf.style.marginTop = -yOffset * 0.5 + 'px';
            }
        });
    }

    window.addEventListener('scroll', parallaxLeaves);

    // ============================================
    // SUBTLE TILT ON SERVICE CARDS
    // Gentle 3D tilt on mouse move
    // ============================================
    const tiltCards = document.querySelectorAll('.service-card, .value-card');

    tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;
            card.style.transform = 'translateY(-8px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // Handles any anchor link on the page (CTAs, etc.)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or already handled by nav
            if (href === '#') {
                event.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // KEYBOARD ACCESSIBILITY FOR FAQ
    // Allow Enter and Space to toggle FAQ items
    // ============================================
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    question.click();
                }
            });
        }
    });

    // ============================================
    // ESCAPE KEY TO CLOSE MOBILE MENU
    // ============================================
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // CONSOLE MESSAGE (FOR DEVELOPERS)
    // ============================================
    console.log('%c🌿 Healing Roots Collective', 
        'color: #4a6741; font-size: 20px; font-weight: bold;');
    console.log('%cThis is a mock website created for educational purposes.', 
        'color: #6b6b6b; font-size: 12px;');

});

// ============================================
// OPTIONAL: PREVENT FLASH OF UNSTYLED CONTENT
// Adds a class when JS is loaded
// ============================================
document.documentElement.classList.add('js-loaded');
