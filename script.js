document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    // প্রতিটি টেক্সটকে ভেঙে আলাদা অক্ষরে রূপান্তর করার ফাংশন
    function prepareTexts() {
        slides.forEach(slide => {
            const nameElement = slide.querySelector('.image-name');
            if (nameElement) {
                const text = nameElement.getAttribute('data-text');
                nameElement.innerHTML = ''; // আগের টেক্সট মুছে ফেলা
                
                // প্রতিটি অক্ষরকে <span> ট্যাগ দিয়ে মুড়ে দেওয়া
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.innerText = text[i];
                    // একটার পর একটা অক্ষর আসার জন্য delay যোগ করা
                    span.style.transitionDelay = `${i * 0.1}s`; 
                    nameElement.appendChild(span);
                }
            }
        });
    }

    // ব্যাকগ্রাউন্ড ইমেজ লোড করার ফাংশন
    function setBackgroundImages() {
        slides.forEach(slide => {
            const container = slide.querySelector('.image-container');
            if (container) {
                const imageUrl = container.getAttribute('data-image');
                if (imageUrl) {
                    container.style.backgroundImage = `url(${imageUrl})`;
                }
            }
        });
    }

    // স্লাইড পরিবর্তনের ফাংশন
    function changeSlide(n) {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex += n;

        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }

        slides[currentSlideIndex].classList.add('active');
    }

    // সবকিছু চালু করা
    prepareTexts();
    setBackgroundImages();
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    window.changeSlide = changeSlide;
});
