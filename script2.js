// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    // Create lightbox elements
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    const prevBtn = document.createElement('span');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '&#10094;';
    
    const nextBtn = document.createElement('span');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '&#10095;';
    
    // Append elements to DOM
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxCaption);
    lightboxContainer.appendChild(closeBtn);
    lightboxContainer.appendChild(prevBtn);
    lightboxContainer.appendChild(nextBtn);
    lightboxContainer.appendChild(lightboxContent);
    document.body.appendChild(lightboxContainer);
    
    // Track current image index
    let currentIndex = 0;
    let visibleItems = [];
    
    // Show lightbox
    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        
        const item = visibleItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        lightboxContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Update nav buttons visibility
        updateNavButtons();
    }
    
    // Close lightbox
    function closeLightbox() {
        lightboxContainer.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            const item = visibleItems[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            
            updateNavButtons();
        }
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentIndex < visibleItems.length - 1) {
            currentIndex++;
            const item = visibleItems[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            
            updateNavButtons();
        }
    }
    
    // Update visible items based on current filter
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            window.getComputedStyle(item).display !== 'none'
        );
    }
    
    // Update navigation buttons visibility
    function updateNavButtons() {
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentIndex < visibleItems.length - 1 ? 'block' : 'none';
    }
    
    // Add event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleItems();
            const visibleIndex = visibleItems.indexOf(this);
            openLightbox(visibleIndex);
        });
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxContainer.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
    
    // Close when clicking outside of image
    lightboxContainer.addEventListener('click', function(e) {
        if (e.target === lightboxContainer) {
            closeLightbox();
        }
    });
});