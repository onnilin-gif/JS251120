document.addEventListener('DOMContentLoaded', function() {
    // Tab-switching logic
    const cardSem1 = document.getElementById('card-sem1');
    const cardSem2 = document.getElementById('card-sem2');
    const contentSem1 = document.getElementById('content-sem1');
    const contentSem2 = document.getElementById('content-sem2');

    function showContent(contentToShow, activeCard) {
        contentSem1.style.display = 'none';
        contentSem2.style.display = 'none';
        cardSem1.classList.remove('active');
        cardSem2.classList.remove('active');
        if (contentToShow && activeCard) {
            contentToShow.style.display = 'block';
            activeCard.classList.add('active');
        }
    }

    cardSem1.addEventListener('click', function() {
        if (contentSem1.style.display === 'block') {
            showContent(null, null);
        } else {
            showContent(contentSem1, cardSem1);
        }
    });

    cardSem2.addEventListener('click', function() {
         if (contentSem2.style.display === 'block') {
            showContent(null, null);
        } else {
            showContent(contentSem2, cardSem2);
        }
    });

    // --- JavaScript Cloud Animation ---
    const clouds = [
        { el: document.querySelector('.cloud-1'), speed: 0.1,  direction: 1 },
        { el: document.querySelector('.cloud-2'), speed: 0.25, direction: 1 },
        { el: document.querySelector('.cloud-3'), speed: 0.15, direction: 1 },
        { el: document.querySelector('.cloud-4'), speed: 0.3,  direction: 1 },
        { el: document.querySelector('.cloud-5'), speed: 0.12, direction: -1 }, // Moves right to left
        { el: document.querySelector('.cloud-6'), speed: 0.35, direction: 1 },
        { el: document.querySelector('.cloud-7'), speed: 0.08, direction: 1 }
    ];

    const screenWidth = window.innerWidth;

    // Initialize cloud positions
    clouds.forEach(cloud => {
        const startPos = Math.random() * screenWidth;
        cloud.el.style.transform = `translateX(${startPos}px)`;
        cloud.x = startPos;
    });

    let lastTime = 0;
    function animateClouds(currentTime) {
        if (!lastTime) {
            lastTime = currentTime;
        }
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        clouds.forEach(cloud => {
            cloud.x += cloud.speed * cloud.direction * (deltaTime / 16); // Normalize speed
            
            const cloudWidth = cloud.el.offsetWidth;

            // If cloud moves off screen, wrap it around
            if (cloud.direction === 1 && cloud.x > screenWidth) {
                cloud.x = -cloudWidth;
            } else if (cloud.direction === -1 && cloud.x < -cloudWidth) {
                cloud.x = screenWidth;
            }
            
            // Apply both horizontal movement and the vertical drift from CSS
            // Note: The 'drift' animation is still running via CSS. 
            // To combine, we'd typically handle both in JS, but this works if they don't conflict.
            // For clean separation, we only set the translateX part. The drift is additive.
            cloud.el.style.transform = `translateX(${cloud.x}px)`;
        });

        requestAnimationFrame(animateClouds);
    }

    requestAnimationFrame(animateClouds);
});
