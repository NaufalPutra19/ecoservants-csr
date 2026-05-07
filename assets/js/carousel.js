// Display a "Please wait" message as an overlay over the submit button
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.csr-form-container form');
    if (form) {
        form.addEventListener('submit', (event) => {
            // Step 3: validation guard
            const weightEl = document.getElementById('csr_unsorted_litter_weight');
            const bagsEl = document.getElementById('csr_unsorted_bags_count');
            const weight = parseFloat(weightEl?.value || 0);
            const bags = parseFloat(bagsEl?.value || 0);
            if (weight > 0 && bags > 0 && weight < bags) {
                alert("Unsorted litter weight seems too low for the number of bags collected. Please double-check your entry.");
                event.preventDefault();
                if (weightEl) weightEl.focus();
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const overlay = document.createElement('div');
                overlay.textContent = 'Please wait while your photo(s) upload...';
                overlay.style.position = 'absolute';
                overlay.style.top = `${submitButton.offsetTop}px`;
                overlay.style.left = `${submitButton.offsetLeft}px`;
                overlay.style.width = `${submitButton.offsetWidth}px`;
                overlay.style.height = `${submitButton.offsetHeight}px`;
                overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                overlay.style.color = '#333';
                overlay.style.display = 'flex';
                overlay.style.alignItems = 'center';
                overlay.style.justifyContent = 'center';
                overlay.style.borderRadius = '8px';
                overlay.style.zIndex = '1000';
                overlay.style.fontWeight = 'bold';
                submitButton.style.position = 'relative';
                submitButton.parentElement.appendChild(overlay);
            }
        });
    }
});

// Lazy load additional Wall of Fame entries
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.wall-of-fame-carousel');
    if (carousel) {
        let page = 2; // Start with the second page (first page is already loaded)
        let loading = false;
        const ajaxurl = window.ajaxurl || '/wp-admin/admin-ajax.php';

        const loadMoreEntries = () => {
            if (loading) return;
            loading = true;
            const url = `${ajaxurl}?action=load_wall_of_fame&page=${page}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const newEntries = tempDiv.querySelectorAll('.wall-of-fame-entry');
                    if (newEntries.length > 0) {
                        newEntries.forEach(entry => carousel.appendChild(entry));
                        page++;
                        loading = false;
                    }
                })
                .catch(error => {
                    // Silently fail if 404 or no more entries
                    loading = false;
                });
        };

        carousel.addEventListener('scroll', () => {
            if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 100) {
                loadMoreEntries();
            }
        });
    }
});

// Handle collapsible sections
document.addEventListener('DOMContentLoaded', () => {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const fieldset = header.parentElement;
            fieldset.classList.toggle('open');
        });
    });
});

// Lightbox for Wall of Fame photos
document.addEventListener('DOMContentLoaded', () => {
    // Inject modal HTML if not present
    if (!document.getElementById('wof-lightbox-modal')) {
        const modal = document.createElement('div');
        modal.id = 'wof-lightbox-modal';
        modal.innerHTML = `
            <div class="wof-lightbox-overlay"></div>
            <img class="wof-lightbox-img" src="" alt="Full Size Photo">
            <button class="wof-lightbox-close" aria-label="Close">&times;</button>
            <a class="wof-lightbox-link" href="#" target="_blank" rel="noopener" style="display:none">View Full Size</a>
        `;
        modal.style.display = 'none';
        document.body.appendChild(modal);

        // Close logic
        modal.querySelector('.wof-lightbox-overlay').onclick =
        modal.querySelector('.wof-lightbox-close').onclick = () => {
            modal.style.display = 'none';
            modal.querySelector('.wof-lightbox-img').src = '';
            modal.querySelector('.wof-lightbox-link').style.display = 'none';
        };
    }

    // Delegate click for all wall-of-fame-photo images
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('wall-of-fame-photo')) {
            const full = e.target.getAttribute('data-full');
            if (full) {
                const modal = document.getElementById('wof-lightbox-modal');
                modal.querySelector('.wof-lightbox-img').src = full;
                const link = modal.querySelector('.wof-lightbox-link');
                link.href = full;
                link.style.display = 'block';
                modal.style.display = 'flex';
            }
        }
    });
});

// Wall of Fame Shuffle Carousel (random cards with animation)
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.wall-of-fame-carousel');
    if (!carousel) return;

    // Only activate on desktop
    if (window.innerWidth < 900) return;

    // Collect all cards
    const allCards = Array.from(carousel.querySelectorAll('.wall-of-fame-entry'));
    if (allCards.length <= 4) return; // Not enough to shuffle

    // Shuffle utility
    function shuffle(arr) {
        return arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
    }

    // Animation helpers
    function fadeOut(el, cb) {
        el.classList.add('wof-fade-out');
        setTimeout(() => {
            el.style.display = 'none';
            el.classList.remove('wof-fade-out');
            if (cb) cb();
        }, 400);
    }
    function fadeIn(el) {
        el.style.display = '';
        el.classList.add('wof-fade-in');
        setTimeout(() => {
            el.classList.remove('wof-fade-in');
        }, 400);
    }

    // Initial random selection
    let visibleCount = 4;
    let visible = shuffle(allCards).slice(0, visibleCount);
    let hidden = allCards.filter(card => !visible.includes(card));

    // Hide all, show only visible
    allCards.forEach(card => card.style.display = 'none');
    visible.forEach(card => {
        card.style.display = '';
        card.classList.add('wof-fade-in');
        setTimeout(() => card.classList.remove('wof-fade-in'), 400);
    });

    // Shuffle loop
    setInterval(() => {
        if (hidden.length === 0) return;
        // Pick a random visible card to remove
        const outIdx = Math.floor(Math.random() * visible.length);
        const outCard = visible[outIdx];
        // Pick a random hidden card to show
        const inIdx = Math.floor(Math.random() * hidden.length);
        const inCard = hidden[inIdx];

        // Animate out
        fadeOut(outCard, () => {
            // Replace in DOM order
            carousel.insertBefore(inCard, outCard.nextSibling);
            fadeIn(inCard);

            // Update arrays
            visible[outIdx] = inCard;
            hidden[inIdx] = outCard;
        });
    }, 3500);
});
