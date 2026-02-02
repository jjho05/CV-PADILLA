document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress & Navbar State
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) progressBar.style.width = scrolled + '%';
        
        if (winScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            // Animate lines
            const lines = menuToggle.querySelectorAll('.line');
            if (isActive) {
                lines[0].style.transform = 'translateY(4px) rotate(45deg)';
                lines[1].style.transform = 'translateY(-4px) rotate(-45deg)';
            } else {
                lines[0].style.transform = '';
                lines[1].style.transform = '';
            }
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            const lines = menuToggle.querySelectorAll('.line');
            lines.forEach(l => l.style.transform = '');
        });
    });

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Lightbox logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption');
            
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
            
            lightboxImg.src = img.src;
            if (caption) lightboxCaption.textContent = caption.textContent;
            
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 500);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox.querySelector('.lightbox-overlay') || e.target === closeBtn) {
                closeLightbox();
            }
        });
    }

    // 5. Entrance Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const entranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entranceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.node-card, .log-entry, .journal-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        entranceObserver.observe(el);
    });
});
