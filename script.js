
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
