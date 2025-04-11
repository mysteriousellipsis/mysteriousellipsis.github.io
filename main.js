document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('theme-light')) {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth reveal on scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animations to children
                const children = entry.target.querySelectorAll('.project-card, .achievement-card, .about-card, .contact-link');
                children.forEach((child, index) => {
                    child.classList.add('fade-in', `delay-${index + 1}`);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Scroll arrow behavior
    const scrollArrow = document.getElementById('scrollArrow');
    const heroContainer = document.querySelector('.hero-container');
    const heroScrollIndicator = document.getElementById('heroScrollIndicator');
    
    // Initial state: hide the scroll arrow on the hero page
    scrollArrow.style.display = 'flex';
    scrollArrow.classList.remove('visible');
    
    function handleScroll() {
        const heroBottom = heroContainer.offsetTop + heroContainer.offsetHeight;
        
        // Show/hide scroll arrow based on scroll position
        if (window.scrollY > heroBottom / 2) {
            scrollArrow.classList.add('visible');
            
            // Determine if we should show up or down arrow
            if (window.scrollY > heroBottom) {
                scrollArrow.classList.add('show-top');
                scrollArrow.setAttribute('data-target', 'top');
            } else {
                scrollArrow.classList.remove('show-top');
                scrollArrow.setAttribute('data-target', 'next');
            }
        } else {
            scrollArrow.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle scroll arrow click
    scrollArrow.addEventListener('click', function() {
        if (this.getAttribute('data-target') === 'top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const firstSection = document.querySelector('section');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Handle hero scroll indicator click
    heroScrollIndicator.addEventListener('click', function() {
        const firstSection = document.querySelector('section');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to elements on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const linksContainer = document.querySelector('.links-container');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        heroContent.classList.add('fade-in');
        linksContainer.classList.add('fade-in', 'delay-1');
        scrollIndicator.classList.add('fade-in', 'delay-2');
    }, 100);
    
    // Call once on load
    handleScroll();
});
