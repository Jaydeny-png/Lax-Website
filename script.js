
// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.carousel-slides');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    const slideCount = document.querySelectorAll('.carousel-slide').length;
    
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        currentIndex = index;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Set up indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-advance every 5 seconds
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
});
























document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    hamburgerMenu.addEventListener('click', function() {
        // Toggle active class on hamburger icon
        this.classList.toggle('active');
        
        // Toggle active class on mobile menu container
        mobileMenuContainer.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            mobileMenuContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // click-to-zoom modal for schedule images (only if modal exists on page)
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const closeBtn = modal.querySelector('.close');

        document.querySelectorAll('.section2-img').forEach(img => {
            img.addEventListener('click', function(event) {
                event.preventDefault(); // prevent any default link behavior
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // auto-load roster JSON on page load if container exists
    const rosterContainer = document.getElementById('roster-container');
    if (rosterContainer) {
        // try fetching external JSON first
        fetch('roster.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                renderRoster(data);
            })
            .catch(err => {
                console.warn('Fetch failed, attempting inline data', err);
                // fallback to inline <script> data (works when opened via file://)
                const inline = document.getElementById('roster-data');
                if (inline) {
                    try {
                        const data = JSON.parse(inline.textContent);
                        renderRoster(data);
                    } catch (parseErr) {
                        rosterContainer.textContent = 'Failed to parse roster.';
                        console.error('Inline roster parse error:', parseErr);
                    }
                } else {
                    rosterContainer.textContent = 'Failed to load roster.';
                }
            });
    }

    function renderRoster(data) {
        const table = document.createElement('table');
        table.className = 'roster-table';

        // header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['#', 'Name', 'Positions', 'Class'].forEach(txt => {
            const th = document.createElement('th');
            th.textContent = txt;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.players.forEach(player => {
            const tr = document.createElement('tr');
            const numTd = document.createElement('td');
            numTd.textContent = player.number || '';
            tr.appendChild(numTd);

            const nameTd = document.createElement('td');
            nameTd.textContent = player.name || '';
            tr.appendChild(nameTd);

            const posTd = document.createElement('td');
            posTd.textContent = (player.positions || []).join(', ');
            tr.appendChild(posTd);

            const classTd = document.createElement('td');
            classTd.textContent = player.class || '';
            tr.appendChild(classTd);

            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        rosterContainer.appendChild(table);
    }

});




















