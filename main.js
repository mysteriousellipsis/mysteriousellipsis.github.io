window.addEventListener('DOMContentLoaded', function() {
    // initial fade-in animation
    setTimeout(function() {
        document.body.style.opacity = '1';
        
        setTimeout(function() {
            const mainContent = document.querySelector('main');
            mainContent.style.opacity = '1';
            
            setTimeout(function() {
                const footer = document.querySelector('footer');
                footer.style.opacity = '1';
            }, 600);
        }, 600);
    }, 300);

    // section visibility animation
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // triggers when 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('visible');
            } else {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // direct links to sections
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    }

    // scroll arrow functionality (down arrow & back to top button)
    const scrollArrow = document.querySelector('.scroll-arrow');
    const heroContainer = document.querySelector('.hero-container');
    
    function handleScroll() {
        if (!heroContainer) return;
        
        const heroBottom = heroContainer.offsetTop + heroContainer.offsetHeight;
        
        if (window.scrollY > heroBottom) {
            scrollArrow.classList.add('show-top');
            scrollArrow.querySelector('a').setAttribute('href', '#');
        } else {
            scrollArrow.classList.remove('show-top');
            scrollArrow.querySelector('a').setAttribute('href', '#projects');
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // handle scroll arrow clicks (now with firefox support! wow!)
    function smoothScroll(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    function handleArrowClick(e) {
        e.preventDefault();
        
        if (scrollArrow.classList.contains('show-top')) {
            smoothScroll(heroContainer);
        } else {
            const firstSection = document.querySelector('section');
            if (firstSection) {
                smoothScroll(firstSection);
            }
        }
    }

    // apply click handler 
    scrollArrow.addEventListener('click', handleArrowClick);
    scrollArrow.querySelector('a').addEventListener('click', handleArrowClick);

    handleScroll();
});

// smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-input');

    // Add 'touched' class only after user interacts with an input
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            this.classList.add('touched');
            validateInput(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('touched')) {
                validateInput(this);
            }
        });
    });

    function validateInput(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        
        if (input.id === 'email' && input.value.trim()) {
            const isValid = isValidEmail(input.value.trim());
            errorElement.style.display = isValid ? 'none' : 'block';
        } else {
            errorElement.style.display = input.value.trim() ? 'none' : 'block';
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const buttonText = form.querySelector('.button-text');
        const buttonLoader = form.querySelector('.button-loader');
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');
        
        // Mark all inputs as touched on submit
        inputs.forEach(input => input.classList.add('touched'));
        
        // Validate form
        let hasErrors = false;
        
        if (!nameInput.value.trim()) {
            document.getElementById('name-error').style.display = 'block';
            hasErrors = true;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            document.getElementById('email-error').style.display = 'block';
            hasErrors = true;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }
        
        if (!messageInput.value.trim()) {
            document.getElementById('message-error').style.display = 'block';
            hasErrors = true;
        } else {
            document.getElementById('message-error').style.display = 'none';
        }
        
        if (hasErrors) return;
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        
        // Prepare email parameters
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value,
            to_name: 'Charles Ng',
            to_email: 'ellipticobj@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function() {
                alert('Message sent successfully!');
                form.reset();
                inputs.forEach(input => input.classList.remove('touched'));
            }, function(error) {
                alert('Failed to send message. Please try again.');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                buttonText.style.display = 'block';
                buttonLoader.style.display = 'none';
            });
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
