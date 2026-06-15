console.log("Qalamsha Portfolio Loaded");

/* ==========================================
   PORTFOLIO TEXT ANIMATION
========================================== */

const portfolioText = document.querySelector(".portfolio-text");

if (portfolioText) {

    let pos = 50;
    let direction = 1;

    function animateEyes() {

        pos += direction * 0.1;

        if (pos >= 65) direction = -1;
        if (pos <= 35) direction = 1;

        portfolioText.style.backgroundPosition = `center ${pos}%`;

        requestAnimationFrame(animateEyes);
    }

    animateEyes();
}


/* ==========================================
   POSTER PARALLAX SCALE EFFECT
========================================== */

const posters = document.querySelectorAll(".poster-card");

if (posters.length > 0) {

    function animatePosters() {

        posters.forEach(card => {

            const image = card.querySelector("img");

            if (!image) return;

            const rect = card.getBoundingClientRect();

            const center = window.innerHeight / 2;

            const distance = Math.abs(
                rect.top + rect.height / 2 - center
            );

            let scale = 1.2 - distance / 1200;

            scale = Math.max(0.65, Math.min(scale, 1.2));

            image.style.transform = `scale(${scale})`;
        });
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(animatePosters);
    });

    animatePosters();
}


/* ==========================================
   JOURNAL PAGE SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".page");

    if (pages.length === 0) return;

    console.log("Journal Loaded");

    let current = 0;
    let lock = false;
    let startY = 0;

    function showPage(index) {

        if (index < 0 || index >= pages.length) return;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        pages[index].classList.add("active");

        current = index;
    }

    function nextPage() {

        if (current < pages.length - 1) {
            showPage(current + 1);
        }
    }

    function prevPage() {

        if (current > 0) {
            showPage(current - 1);
        }
    }

    function unlock() {

        setTimeout(() => {
            lock = false;
        }, 500);
    }

    showPage(0);

    /* Mouse Wheel */

    window.addEventListener("wheel", (e) => {

        if (lock) return;

        lock = true;

        if (e.deltaY > 0) {
            nextPage();
        } else {
            prevPage();
        }

        unlock();

    }, { passive: true });

    /* Touch Start */

    window.addEventListener("touchstart", (e) => {

        startY = e.touches[0].clientY;

    }, { passive: true });

    /* Touch End */

    window.addEventListener("touchend", (e) => {

        if (lock) return;

        const endY = e.changedTouches[0].clientY;

        const diff = startY - endY;

        if (Math.abs(diff) < 50) return;

        lock = true;

        if (diff > 0) {
            nextPage();
        } else {
            prevPage();
        }

        unlock();

    }, { passive: true });

});