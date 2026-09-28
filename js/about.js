// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // STICKY HEADER & SCROLL STATE
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksList = document.getElementById('nav-links');

    if (mobileToggle && navLinksList) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');
            const expanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', expanded);
        });

        // Close menu when clicking links
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinksList.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // FAQ ACCORDION WITH ACCESSIBILITY
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            const isCurrentlyActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items for a clean accordion experience
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                const ans = item.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
            });
            
            // Toggle clicked item
            if (!isCurrentlyActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // BOOKING PASS MODAL CONTROLS
    // ==========================================
    const bookingModal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('modal-close');
    const bookingTriggers = document.querySelectorAll('.trigger-booking');
    const bookingForm = document.getElementById('booking-form');

    const openModal = (e) => {
        if (e) e.preventDefault();
        if (bookingModal) {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Focus first input if available
            const firstInput = bookingModal.querySelector('input');
            if (firstInput) setTimeout(() => firstInput.focus(), 100);
        }
    };

    const closeModal = () => {
        if (bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    bookingTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || 'Devotee';
            const email = document.getElementById('email')?.value || '';
            const passes = document.getElementById('passes')?.value || '1';
            
            alert(`Thank you, ${name}! Your inquiry for ${passes} Mandavadi season pass(es) has been received. Our ticketing team will send pass verification details to ${email}.`);
            
            bookingForm.reset();
            closeModal();
        });
    }

    // ==========================================
    // REVEAL ON SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const animatedElements = document.querySelectorAll('.timeline-item, .exp-feature-card, .why-pillar-card, .value-card, .blog-card');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.observe(el);
        });
    }

});
