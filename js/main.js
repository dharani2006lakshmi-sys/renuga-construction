document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-in-out',
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileBtnIcon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            mobileBtnIcon.classList.remove('fa-xmark');
            mobileBtnIcon.classList.add('fa-bars');
        } else {
            mobileBtnIcon.classList.remove('fa-bars');
            mobileBtnIcon.classList.add('fa-xmark');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileBtnIcon.classList.remove('fa-xmark');
            mobileBtnIcon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled-nav');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('scrolled-nav');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4');
        }
    });

    // Animated Counter for Statistics
    const counters = document.querySelectorAll('.counter-value');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    if(counter.hasAttribute('data-suffix')) {
                        counter.innerText = target + counter.getAttribute('data-suffix');
                    }
                }
            };
            updateCounter();
        });
    };

    // Use Intersection Observer to trigger counter when in view
    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                startCounters();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});
