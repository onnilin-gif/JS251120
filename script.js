document.addEventListener('DOMContentLoaded', function() {
    // Tab-switching logic
    const cardSem1 = document.getElementById('card-sem1');
    const cardSem2 = document.getElementById('card-sem2');
    const contentSem1 = document.getElementById('content-sem1');
    const contentSem2 = document.getElementById('content-sem2');

    function showContent(contentToShow, activeCard) {
        if (contentSem1) contentSem1.style.display = 'none';
        if (contentSem2) contentSem2.style.display = 'none';
        if (cardSem1) cardSem1.classList.remove('active');
        if (cardSem2) cardSem2.classList.remove('active');
        
        if (contentToShow && activeCard) {
            contentToShow.style.display = 'block';
            activeCard.classList.add('active');
        }
    }

    if (cardSem1) {
        cardSem1.addEventListener('click', function() {
            if (contentSem1.style.display === 'block') {
                showContent(null, null);
            } else {
                showContent(contentSem1, cardSem1);
            }
        });
    }

    if (cardSem2) {
        cardSem2.addEventListener('click', function() {
             if (contentSem2.style.display === 'block') {
                showContent(null, null);
            } else {
                showContent(contentSem2, cardSem2);
            }
        });
    }

    // --- Dynamic & More Dynamic JavaScript Cloud Animation ---
    
    const sky = document.getElementById('animated-sky');
    if (!sky) return;

    const NUM_CLOUDS = 15;
    const clouds = [];
    const screenWidth = window.innerWidth;

    function createCloud() {
        const cloudEl = document.createElement('div');
        cloudEl.classList.add('cloud');

        // Randomize visual properties
        const size = 150 + Math.random() * 150; // width from 150px to 300px
        const blur = 10 + Math.random() * 15;   // blur from 10px to 25px
        const top = Math.random() * 85;         // top from 0% to 85%
        const fadeDuration = 5 + Math.random() * 5; // fade-in from 5s to 10s
        const driftDuration = 6 + Math.random() * 8;  // drift from 6s to 14s

        cloudEl.style.width = `${size}px`;
        cloudEl.style.height = `${size * 0.4}px`;
        cloudEl.style.filter = `blur(${blur}px)`;
        cloudEl.style.top = `${top}%`;
        
        // The core animations (fade-in, drift) are still in CSS, but we set random durations
        cloudEl.style.animation = `fade-in ${fadeDuration}s forwards, drift ${driftDuration}s ease-in-out infinite alternate`;
        
        sky.appendChild(cloudEl);

        // Create pseudo-elements for more complex shapes
        const before = document.createElement('div');
        before.style.width = `${size * 0.6}px`;
        before.style.height = `${size * 0.5}px`;
        before.style.top = `-${size * 0.2}px`;
        before.style.left = `${size * 0.1}px`;
        cloudEl.appendChild(before);

        const after = document.createElement('div');
        after.style.width = `${size * 0.8}px`;
        after.style.height = `${size * 0.35}px`;
        after.style.top = `0px`;
        after.style.right = `${size * 0.05}px`;
        cloudEl.appendChild(after);
        
        return cloudEl;
    }

    // Initialize clouds
    for (let i = 0; i < NUM_CLOUDS; i++) {
        const cloudEl = createCloud();
        const startX = Math.random() * screenWidth;
        cloudEl.style.transform = `translateX(${startX}px)`;
        
        clouds.push({
            el: cloudEl,
            x: startX,
            // Randomize speed and direction
            speed: 0.05 + Math.random() * 0.2, // speed from 0.05 to 0.25
            // ~90% move LTR, ~10% move RTL
            direction: Math.random() > 0.1 ? 1 : -1 
        });
    }

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
            
            cloud.el.style.transform = `translateX(${cloud.x}px)`;
        });

        requestAnimationFrame(animateClouds);
    }

    requestAnimationFrame(animateClouds);
});