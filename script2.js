let index = 0;

function showSlide(n) {
    const slides = document.querySelector('.carousel-inner');
    const totalSlides = slides.children.length;
    if (n >= totalSlides) index = 0;
    else if (n < 0) index = totalSlides - 1;
    else index = n;
    
    slides.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

setInterval(nextSlide, 3000);