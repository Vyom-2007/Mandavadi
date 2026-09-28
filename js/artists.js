/**
 * ==========================================
 * MANDAVADI ARTISTS PAGE INTERACTIVE LOGIC
 * Dynamic grid rendering, filtering, lightbox, video modal & FAQs
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. STICKY HEADER & SCROLL BEHAVIOR
    // ------------------------------------------
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ------------------------------------------
    // 2. MOBILE NAV MENU TOGGLE
    // ------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpened = mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ------------------------------------------
    // 3. DYNAMIC ARTISTS GRID RENDERING & FILTERING
    // ------------------------------------------
    const artistsGrid = document.getElementById('artists-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderArtists(filter = 'all') {
        if (!artistsGrid || typeof mandavadiArtists === 'undefined') return;

        const filtered = mandavadiArtists.filter(artist => {
            if (filter === 'all') return true;
            const normFilter = filter.toLowerCase();
            const inMainCat = artist.category && artist.category.toLowerCase().includes(normFilter);
            const inSecCats = artist.secondaryCategories && artist.secondaryCategories.some(cat => cat.toLowerCase().includes(normFilter));
            const inGenres = artist.genres && artist.genres.some(g => g.toLowerCase().includes(normFilter));
            return inMainCat || inSecCats || inGenres;
        });

        if (filtered.length === 0) {
            artistsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
                    <p style="font-size: 1.1rem; margin-bottom: 12px;">No artists found in this specific category.</p>
                    <button class="btn-hero-secondary" onclick="document.querySelector('[data-filter=\"all\"]').click();">View All Artists</button>
                </div>
            `;
            return;
        }

        artistsGrid.innerHTML = filtered.map(artist => `
            <article class="artist-card" data-slug="${artist.slug}">
                <div class="artist-card-thumb-wrap">
                    <img src="${artist.photo}" alt="${artist.name} performing Garba at Mandavadi Navratri in Ahmedabad" class="artist-card-img" loading="lazy">
                    <div class="artist-card-overlay"></div>
                    <span class="artist-card-badge">${artist.role || artist.category}</span>
                </div>
                <div class="artist-card-body">
                    <span class="artist-card-category">${artist.category}</span>
                    <h3 class="artist-card-name">${artist.name}</h3>
                    <p class="artist-card-desc">${artist.shortBio}</p>
                    <div class="artist-card-footer">
                        <div class="artist-card-tags">
                            <span class="tag-pill">${artist.genres ? artist.genres[0] : 'Garba'}</span>
                        </div>
                        <a href="artists/${artist.slug}.html" class="btn-card-link" title="Explore ${artist.name}'s profile">
                            View Artist Profile
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // Initial render
    renderArtists('all');

    // Filter button click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetFilter = btn.getAttribute('data-filter') || 'all';
            renderArtists(targetFilter);
        });
    });

    // ------------------------------------------
    // 4. VIDEO PREVIEW MODAL
    // ------------------------------------------
    const videoModal = document.getElementById('video-modal');
    const modalClose = document.getElementById('modal-close-video');
    const modalTitle = document.getElementById('modal-video-title');
    const modalArtist = document.getElementById('modal-video-artist');
    const videoContainer = document.getElementById('modal-video-container');
    const videoTriggers = document.querySelectorAll('.video-card-thumb-wrap, .btn-play-video');

    function openVideoModal(title, artist, videoSrc) {
        if (!videoModal) return;
        if (modalTitle) modalTitle.textContent = title;
        if (modalArtist) modalArtist.textContent = artist;
        
        if (videoContainer) {
            videoContainer.innerHTML = `
                <video controls autoplay playsinline style="width:100%; height:100%; object-fit:cover;">
                    <source src="${videoSrc || 'assets/images/Highlight.mp4'}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        }

        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal) return;
        videoModal.classList.remove('active');
        if (videoContainer) videoContainer.innerHTML = '';
        document.body.style.overflow = '';
    }

    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const card = trigger.closest('.video-card');
            const title = card ? card.querySelector('.video-title').textContent : 'Mandavadi Live Performance';
            const artist = card ? card.querySelector('.video-artist-tag').textContent : 'Nishad Soni';
            openVideoModal(title, artist, 'assets/images/Highlight.mp4');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeVideoModal);
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }

    // ------------------------------------------
    // 5. GALLERY LIGHTBOX MODAL
    // ------------------------------------------
    const lightboxModal = document.getElementById('gallery-lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryTiles = document.querySelectorAll('.gallery-tile');

    function openLightbox(src, caption) {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption || 'Mandavadi Garba Performance in Ahmedabad';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const img = tile.querySelector('img');
            const caption = tile.querySelector('.gallery-tile-title')?.textContent;
            if (img) openLightbox(img.src, caption);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    // Escape key listener for all modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
            closeLightbox();
        }
    });

    // ------------------------------------------
    // 6. ACCESSIBLE FAQ ACCORDION
    // ------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            const isCurrentlyActive = faqItem.classList.contains('active');

            // Close siblings
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                const ans = item.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
            });

            // Toggle active state
            if (!isCurrentlyActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                if (faqAnswer) {
                    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                }
            }
        });
    });

    // ------------------------------------------
    // 7. BOOK PASS MODAL TRIGGER
    // ------------------------------------------
    const bookingModal = document.getElementById('booking-modal');
    const bookingClose = document.getElementById('modal-close');
    const bookingTriggers = document.querySelectorAll('.trigger-booking');

    if (bookingModal) {
        bookingTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (bookingClose) {
            bookingClose.addEventListener('click', () => {
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
