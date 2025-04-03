
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
});