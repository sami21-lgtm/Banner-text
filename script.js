document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    let autoSlideTimer;

    // ১. টেক্সট অ্যানিমেশন সেটআপ
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

    // ২. ব্যাকগ্রাউন্ড ইমেজ লোড করা
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

    // ৩. স্লাইড পরিবর্তন
    function changeSlide() {
        if(slides.length === 0) return;
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex++;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }

        slides[currentSlideIndex].classList.add('active');
    }

    // ৪. অটো-প্লে টাইমার (৪ সেকেন্ড)
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            changeSlide(); 
        }, 4000); 
    }

    // 🎵 ৫. গান বাজানোর আল্টিমেট ট্রিক (ক্লিক বা টাচ ডিটেকশন)
    function initMusicController() {
        const music = document.getElementById('bg-music');
        if (!music) {
            console.error("Audio element with ID 'bg-music' not found in HTML!");
            return;
        }

        const playAudio = () => {
            // ব্রাউজারকে ফোর্স করা হচ্ছে গানটি প্লে করার জন্য
            music.play()
                .then(() => {
                    console.log("SUCCESS: Music is now playing!");
                    // গান সফলভাবে চালু হলে ইভেন্ট রিমুভ হবে যেন বারবার ফায়ার না হয়
                    document.removeEventListener('click', playAudio);
                    document.removeEventListener('touchstart', playAudio);
                })
                .catch(error => {
                    console.error("ERROR: Browser blocked music or file not found:", error);
                });
        };

        // মোবাইল বা পিসিতে যেকোনো একটি টাচ বা ক্লিক পেলেই গান বাজবে
        document.addEventListener('click', playAudio);
        document.addEventListener('touchstart', playAudio);
    }

    // রান করা হলো
    prepareAnimatedTexts();
    setBackgroundImages();
    initMusicController();
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    startAutoSlide();
});
