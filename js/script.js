document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        // Toggle icon
        const icon = hamburger.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Header scroll background
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            header.style.height = '80px';
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    // Hero Slider (Horizontal Sliding with Dots)
    const heroTrack = document.querySelector('.hero-track');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDotsContainer = document.querySelector('.hero-dots');

    if (heroTrack && heroSlides.length > 0) {
        let currentSlide = 0;

        // Create Dots
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('hero-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            heroDotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.hero-dot');

        function goToSlide(index) {
            currentSlide = index;
            heroTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update Dots
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }

        // Auto-play
        let autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            goToSlide(currentSlide);
        }, 5000);

        // Pause auto-play on dot click is implicitly handled by not resetting it, 
        // but for better UX we could reset it. 
        // Let's keep it simple for now as requested.
    }
});
