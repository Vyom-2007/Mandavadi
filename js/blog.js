/**
 * ==========================================
 * MANDAVADI BLOG CLIENT ENGINE
 * Search, Category Filtering, Pagination, TOC, & Social Sharing
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. STICKY HEADER SCROLL STATE
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
    // 2. MOBILE MENU TOGGLE
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
    // 3. BLOG SEARCH & CATEGORY FILTER ENGINE
    // ------------------------------------------
    const blogGrid = document.getElementById('blog-grid');
    const searchInput = document.getElementById('blog-search-input');
    const searchClearBtn = document.getElementById('blog-search-clear');
    const searchResultCount = document.getElementById('search-result-count');
    const categoryTabs = document.querySelectorAll('.category-tab-btn');
    const paginationContainer = document.getElementById('blog-pagination');

    let currentCategory = 'all';
    let searchQuery = '';
    let currentPage = 1;
    const postsPerPage = 6;

    function getFilteredPosts() {
        if (typeof mandavadiBlogPosts === 'undefined') return [];

        return mandavadiBlogPosts.filter(post => {
            // Category match
            const matchesCategory = currentCategory === 'all' || 
                post.category.toLowerCase().replace(/\s+/g, '-') === currentCategory ||
                post.category.toLowerCase() === currentCategory.toLowerCase();

            // Search query match
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || 
                post.title.toLowerCase().includes(q) ||
                post.excerpt.toLowerCase().includes(q) ||
                post.category.toLowerCase().includes(q) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(q)));

            return matchesCategory && matchesSearch;
        });
    }

    function renderBlogCards() {
        if (!blogGrid) return;

        const filtered = getFilteredPosts();
        const totalPosts = filtered.length;

        // Update search feedback count if search active
        if (searchResultCount) {
            if (searchQuery) {
                searchResultCount.textContent = `Found ${totalPosts} article${totalPosts === 1 ? '' : 's'} for "${searchQuery}"`;
                searchResultCount.style.display = 'block';
            } else {
                searchResultCount.style.display = 'none';
            }
        }

        if (totalPosts === 0) {
            blogGrid.innerHTML = `
                <div class="blog-empty-state">
                    <svg class="empty-state-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <h3 class="empty-state-title">No Articles Found</h3>
                    <p class="empty-state-desc">We couldn't find any articles matching your search criteria. Try exploring another topic or browse all guides.</p>
                    <button class="btn-hero-secondary" id="reset-search-btn" style="cursor:pointer;">Reset Filter &amp; Search</button>
                </div>
            `;
            const resetBtn = document.getElementById('reset-search-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (searchInput) searchInput.value = '';
                    searchQuery = '';
                    currentCategory = 'all';
                    categoryTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.category === 'all'));
                    if (searchClearBtn) searchClearBtn.style.display = 'none';
                    renderBlogCards();
                });
            }
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        // Pagination slice
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        if (currentPage > totalPages) currentPage = 1;
        
        const startIndex = (currentPage - 1) * postsPerPage;
        const pagePosts = filtered.slice(startIndex, startIndex + postsPerPage);

        blogGrid.innerHTML = pagePosts.map(post => `
            <article class="blog-card" data-slug="${post.slug}">
                <div class="blog-card-thumb-wrap">
                    <img src="${post.heroImage}" alt="${post.imageAlt}" class="blog-card-img" loading="lazy" width="400" height="230">
                    <span class="blog-card-cat-badge">${post.category}</span>
                </div>
                <div class="blog-card-body">
                    <div class="blog-card-meta">
                        <span>${formatDate(post.datePublished)}</span>
                        <span>&bull;</span>
                        <span>${post.readTime}</span>
                    </div>
                    <h3 class="blog-card-title">
                        <a href="blog/${post.slug}.html" title="${post.title}">${post.title}</a>
                    </h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-footer">
                        <span class="blog-card-author">${post.author.name}</span>
                        <a href="blog/${post.slug}.html" class="blog-card-link" title="Read full guide: ${post.title}">
                            Read Guide
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        if (!paginationContainer || totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} id="prev-page-btn" aria-label="Previous page">
                &larr; Prev
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                    ${i}
                </button>
            `;
        }

        html += `
            <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} id="next-page-btn" aria-label="Next page">
                Next &rarr;
            </button>
        `;

        paginationContainer.innerHTML = html;

        // Attach listeners
        paginationContainer.querySelectorAll('.pagination-number').forEach(btn => {
            btn.addEventListener('click', () => {
                currentPage = parseInt(btn.dataset.page);
                renderBlogCards();
                blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        const prevBtn = document.getElementById('prev-page-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderBlogCards();
                    blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        const nextBtn = document.getElementById('next-page-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderBlogCards();
                    blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Category click handler
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-category') || 'all';
            currentPage = 1;
            renderBlogCards();
        });
    });

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (searchClearBtn) {
                searchClearBtn.style.display = searchQuery ? 'block' : 'none';
            }
            currentPage = 1;
            renderBlogCards();
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            searchClearBtn.style.display = 'none';
            currentPage = 1;
            renderBlogCards();
        });
    }

    // Initial render
    renderBlogCards();

    // ------------------------------------------
    // 4. ARTICLE PAGE TOC & ACTIVE SCROLL SPY
    // ------------------------------------------
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (tocLinks.length > 0) {
        const headings = Array.from(tocLinks).map(link => {
            const targetId = link.getAttribute('href').substring(1);
            return document.getElementById(targetId);
        }).filter(Boolean);

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 160;
            let currentHeading = null;

            headings.forEach(heading => {
                if (heading.offsetTop <= scrollPos) {
                    currentHeading = heading;
                }
            });

            if (currentHeading) {
                tocLinks.forEach(link => {
                    const match = link.getAttribute('href') === `#${currentHeading.id}`;
                    link.style.color = match ? 'var(--gold-bright)' : '';
                    link.style.fontWeight = match ? '700' : '400';
                });
            }
        });
    }

    // ------------------------------------------
    // 5. SOCIAL SHARING BUTTONS
    // ------------------------------------------
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = btn.dataset.share;
            const url = window.location.href;
            const title = document.title;

            if (action === 'copy') {
                e.preventDefault();
                navigator.clipboard.writeText(url).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `<span>Copied Link!</span>`;
                    setTimeout(() => btn.innerHTML = originalText, 2500);
                });
            } else if (action === 'whatsapp') {
                e.preventDefault();
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
            } else if (action === 'facebook') {
                e.preventDefault();
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            } else if (action === 'twitter') {
                e.preventDefault();
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
            }
        });
    });

    // ------------------------------------------
    // 6. ACCESSIBLE FAQ ACCORDION
    // ------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Close siblings
            document.querySelectorAll('.faq-item').forEach(other => {
                other.classList.remove('active');
                const btn = other.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                const ans = other.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
