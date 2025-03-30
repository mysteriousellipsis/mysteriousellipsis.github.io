window.addEventListener('DOMContentLoaded', function() {
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

    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    }
});

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

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

contactForm.addEventListener('submit', (event) => {
    let hasErrors = false;

    if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        hasErrors = true;
    } else {
        nameError.style.display = 'none';
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailError.style.display = 'block';
        hasErrors = true;
    } else {
        emailError.style.display = 'none';
    }

    if (!messageInput.value.trim()) {
        messageError.style.display = 'block';
        hasErrors = true;
    } else {
        messageError.style.display = 'none';
    }

    if (hasErrors) {
        event.preventDefault();
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
