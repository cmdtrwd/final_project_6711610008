document.addEventListener('DOMContentLoaded', () => {
    // ── MOBILE MENU LOGIC ──
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav a');

    const toggle = (isOpen) => {
        if (!overlay) return; 
        if (isOpen) {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    };

    menuToggle?.addEventListener('click', () => toggle(true));
    closeMenu?.addEventListener('click', () => toggle(false));

    links.forEach(link => {
        link.addEventListener('click', () => toggle(false));
    });

    // ── SCROLL REVEAL ANIMATIONS ──
    const initObserver = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(element => {
            observer.observe(element);
        });
    };

    // ── LOADER LOGIC ──
    // Wait for the window (and images) to fully load
    window.addEventListener('load', () => {
        const loader = document.querySelector('.site-loader');
        if (loader) {
            // Add a tiny delay so the user actually sees the logo pulse
            setTimeout(() => {
                loader.classList.add('fade-out');
                // Wait for the CSS fade-out transition to finish, then start animations
                setTimeout(() => {
                    initObserver();
                }, 800); 
            }, 500);
        } else {
            initObserver(); // Fallback if no loader exists
        }
    });
});