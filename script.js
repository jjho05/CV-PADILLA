document.addEventListener('DOMContentLoaded', () => {
    // Reveal components on scroll
    const revealElements = () => {
        const elements = document.querySelectorAll('.section, .research-card, .timeline-item, .pub-item, .gallery-img, .conf-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    };

    // Smooth scroll for anchors
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 90, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Navbar scroll effect
    const setupNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.height = '70px';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            } else {
                navbar.style.height = '90px';
                navbar.style.boxShadow = 'none';
            }
        });
    };

    // Mobile Menu Toggle
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    };

    // Lightbox Logic
    const setupLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                setTimeout(() => lightbox.classList.add('active'), 10);
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) closeLightbox();
        });
    };

    // Initialize all functions
    revealElements();
    setupSmoothScroll();
    setupNavbarScroll();
    setupMobileMenu();
    setupLightbox();
});
