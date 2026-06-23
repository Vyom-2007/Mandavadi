// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // STICKY HEADER & ACTIVE SECTION HIGHLIGHT
    // ==========================================
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Header class toggling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav Link highlight on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
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
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }

    // ==========================================
    // FAQ ACCORDION TOGGLE
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            
            // Check if item is already active
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // If the clicked item was not active, open it
            if (!isActive) {
                faqItem.classList.add('active');
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

    // Open Modal
    bookingTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        });
    });

    // Close Modal
    const closeModal = () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling back
    };

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

    // Handle Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const passes = document.getElementById('passes').value;
            
            alert(`Thank you, ${name}! Your request for ${passes} season pass(es) has been registered. An email confirmation has been sent to ${email}.`);
            
            // Reset and close
            bookingForm.reset();
            closeModal();
        });
    }

});

