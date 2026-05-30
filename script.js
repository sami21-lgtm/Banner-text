document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    // ১. টেক্সট ভেঙে আলাদা অক্ষরে রূপান্তর এবং Delay সেট করার ফাংশন
    function prepareAnimatedTexts() {
        slides.forEach(slide => {
            const nameElement = slide.querySelector('.image-name');
            if (nameElement) {
                const originalText = nameElement.innerText.trim();
                nameElement.innerHTML = ''; // আগের টেক্সট ক্লিয়ার করা
                
                // প্রতিটা অক্ষরকে আলাদা Span এ নেওয়া হচ্ছে
                for (let i = 0; i < originalText.length; i++) {
                    const span = document.createElement('span');
                    span.innerText = originalText[i];
                    // বাম থেকে ডানে একটার পর একটা অক্ষর আসার জন্য delay
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
    function changeSlide(n) {
        // বর্তমান একটিভ স্লাইড থেকে active ক্লাস রিমুভ করা
        slides[currentSlideIndex].classList.remove('active');
        
        currentSlideIndex += n;
        
        // স্লাইড শেষ হয়ে গেলে আবার প্রথম থেকে শুরু হবে
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }

        // নতুন স্লাইডে active ক্লাস যোগ করা (যা অ্যানিমেশন স্টার্ট করবে)
        slides[currentSlideIndex].classList.add('active');
    }

    // সব ফাংশন ইনিশিয়ালাইজ করা
    prepareAnimatedTexts();
    setBackgroundImages();
    
    // প্রথম স্লাইডটি একটিভ করা
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // HTML-এর onclick="changeSlide()" এর সাথে কানেক্ট করার জন্য গ্লোবাল স্কোপে দেওয়া হলো
    window.changeSlide = changeSlide;
});
