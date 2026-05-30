document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    let autoSlideTimer; // টাইমারটি রাখার জন্য ভেরিয়েবল

    // ১. লেখা ভেঙে আলাদা করার ফাংশন
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

    // ২. ইমেজ ব্যাকগ্রাউন্ড লোড করা
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

    // ৩. স্লাইড বদলানোর মেইন ফাংশন
    function changeSlide(n) {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex += n;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }

        slides[currentSlideIndex].classList.add('active');
        
        // ইউজার যখন ম্যানুয়ালি বাটনে ক্লিক করবে, তখন অটো-প্লে টাইমারটি রিস্টার্ট হবে
        resetAutoSlide();
    }

    // ⏱️ ৪. অটো-প্লে টাইমার ফাংশন (প্রতি ৪ সেকেন্ড পর পর ছবি বদলাবে)
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            changeSlide(1); // ১ মানে সামনের স্লাইডে যাবে
        }, 4000); // ৪০০০ মিলিডিসেকেন্ড = ৪ সেকেন্ড (আপনি চাইলে সময় বাড়াতে বা কমাতে পারেন)
    }

    // ৫. টাইমার রিস্টার্ট করার ফাংশন
    function resetAutoSlide() {
        clearInterval(autoSlideTimer); // আগের টাইমার বন্ধ করবে
        startAutoSlide(); // নতুন করে ৪ সেকেন্ড গোনা শুরু করবে
    }

    // প্রজেক্ট রান করা
    prepareAnimatedTexts();
    setBackgroundImages();
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // স্লাইডার চালু হওয়ার সাথে সাথে অটো-প্লে শুরু হবে
    startAutoSlide();

    window.changeSlide = changeSlide;
});
