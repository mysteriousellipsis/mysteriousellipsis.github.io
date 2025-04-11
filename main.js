document.addEventListener('DOMContentLoaded', function() {
    // --- page transition ---
    const FADEDURATION = 400;
    document.body.style.opacity = '1';

    const navLinks = document.querySelectorAll('a[data-page-nav]'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const destination = this.href;

            if (destination && destination !== window.location.href && !destination.startsWith('#')) {
                event.preventDefault();
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = destination;
                }, FADEDURATION);
            }
        });
    });

    // --- theme toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
    } else {
        body.classList.add('theme-light');
    }
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('theme-light');
        body.classList.toggle('theme-dark');
        localStorage.setItem('theme', body.classList.contains('theme-dark') ? 'dark' : 'light');
    });

    // --- intersection observer for main page sections ---
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const childrenToFade = entry.target.querySelectorAll('.fade-in');
                    childrenToFade.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 150); 
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- animations for subpages ---
    if (document.querySelector('.page-content .projects-container') || document.querySelector('.page-content .achievements-container')) {
        const elementsToFade = document.querySelectorAll('.fade-in');
        requestAnimationFrame(() => {
            setTimeout(() => {
                elementsToFade.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 150); 
                });
            }, 50);
        });
    }

    // --- homepage hero animations ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
        const linksContainer = document.querySelector('.links-container');
        if (linksContainer) linksContainer.classList.add('fade-in');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) scrollIndicator.classList.add('fade-in');

        setTimeout(() => {
            if (heroContent) heroContent.classList.add('visible');
            setTimeout(() => {
                if (linksContainer) linksContainer.classList.add('visible');
            }, 150);
            setTimeout(() => {
                if (scrollIndicator) scrollIndicator.classList.add('visible');
            }, 300);
        }, 100);
    }


    // --- scroll arrow behavior ---
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        const heroContainer = document.querySelector('.hero-container');
        const heroScrollIndicator = document.getElementById('heroScrollIndicator');

        function handleScroll() {
            if (!heroContainer) return;
            const heroBottom = heroContainer.offsetTop + heroContainer.offsetHeight;
            const scrollArrowVisible = scrollArrow.classList.contains('visible');

            if (window.scrollY > heroBottom / 2) {
                if (!scrollArrowVisible) scrollArrow.classList.add('visible');
                
                if (window.scrollY > heroBottom) {
                    scrollArrow.classList.add('show-top');
                    scrollArrow.setAttribute('data-target', 'top');
                } else {
                    scrollArrow.classList.remove('show-top');
                    scrollArrow.setAttribute('data-target', 'next');
                }
            } else {
                if (scrollArrowVisible) scrollArrow.classList.remove('visible');
            }
        }
        window.addEventListener('scroll', handleScroll);
        scrollArrow.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            if (target === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const firstSection = document.querySelector('section');
                if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        if (heroScrollIndicator) {
            heroScrollIndicator.addEventListener('click', function() {
                const firstSection = document.querySelector('section');
                if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
        handleScroll();
    }

    // --- smooth scrolling for nave links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 60; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            } else if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});
