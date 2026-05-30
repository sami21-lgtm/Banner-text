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
        if(slides.length === 0) return;
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

    // 🎵 ৫. মিউজিক প্লে করার শক্তিশালী ফাংশন (মোবাইল ও পিসির জন্য)
    function initMusicController() {
        const music = document.getElementById('bg-music');
        if (!music) return;

        const playAudio = () => {
            if (music.paused) {
                music.play()
                    .then(() => {
                        console.log("Music playing successfully!");
                        // একবার গান চালু হয়ে গেলে ক্লিক ইভেন্টগুলো বন্ধ করে দেওয়া হবে
                        document.removeEventListener('click', playAudio);
                        document.removeEventListener('touchstart', playAudio);
                    })
                    .catch(error => console.log("Waiting for user input to play audio...", error));
            }
        };

        // ব্রাউজার পলিসি অনুযায়ী প্রথম টাচ বা ক্লিকেই মিউজিক ট্রিগার হবে
        document.addEventListener('click', playAudio);
        document.addEventListener('touchstart', playAudio);
    }

    // সব ফাংশন চালু করা
    prepareAnimatedTexts();
    setBackgroundImages();
    initMusicController();
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    startAutoSlide();
});
