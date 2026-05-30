document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    let autoSlideTimer;

    // ১. টেক্সট ভেঙে আলাদা অক্ষরে রূপান্তর এবং Delay সেট করার ফাংশন
    function prepareAnimatedTexts() {
        slides.forEach(slide => {
            const nameElement = slide.querySelector('.image-name');
            if (nameElement) {
                const originalText = nameElement.textContent.trim();
                nameElement.innerHTML = ''; 
                
                for (let i = 0; i < originalText.length; i++) {
                    const span = document.createElement('span');
                    span.innerText = originalText[i];
                    span.style.transitionDelay = `${i * 0.12}s`; 
                    nameElement.appendChild(span);
                }
            }
        });
    }

    // ২. data-image থেকে ব্যাকগ্রাউন্ড ইমেজ সেট করার ফাংশন
    function setBackgroundImages() {
        slides.forEach(slide => {
            const container = slide.querySelector('.image-container');
            if (container) {
                const imageUrl = container.getAttribute('data-image');
                if (imageUrl) {
                    container.style.backgroundImage = `url("${imageUrl}")`;
                }
            }
        });
    }

    // ৩. স্লাইড পরিবর্তনের মূল ফাংশন
    function changeSlide() {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex++;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }

        slides[currentSlideIndex].classList.add('active');
    }

    // ⏱️ ৪. অটো-প্লে টাইমার (প্রতি ৪ সেকেন্ড পর পর ছবি বদলাবে)
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            changeSlide(); 
        }, 4000); 
    }

    // সব ফাংশন চালু করা
    prepareAnimatedTexts();
    setBackgroundImages();
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // স্লাইডার চালু হওয়ার সাথে সাথে অটো-প্লে শুরু হবে
    startAutoSlide();
});
