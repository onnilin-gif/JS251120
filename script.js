document.addEventListener('DOMContentLoaded', function() {
    // --- Popup Logic ---
    const popup = document.getElementById('welcome-popup');
    const popupForm = popup.querySelector('form');
    const visitDateInput = document.getElementById('visit-date');

    // Set today's date for the visit date input
    if (visitDateInput) {
        const today = new Date().toISOString().split('T')[0];
        visitDateInput.value = today;
    }

    // Show the popup
    if (popup) {
        // We use a small timeout to ensure the initial render is complete
        // and the CSS transition will be visible to the user.
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);
    }

    // Handle form submission
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            if (popup) {
                popup.classList.remove('show');
            }
        });
    }

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

    // --- Interactive JavaScript Cloud Animation ---
    
    const sky = document.getElementById('animated-sky');
    if (!sky) return;

    const NUM_CLOUDS = 15;
    const clouds = [];
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Mouse position variables, normalized from -1 to 1
    let mouseX = 0;
    let mouseY = 0;

    // Listen for mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / screenWidth) * 2 - 1;
        mouseY = (e.clientY / screenHeight) * 2 - 1;
    }, { passive: true });


    function createCloud() {
        const cloudEl = document.createElement('div');
        cloudEl.classList.add('cloud');

        // Randomize visual properties
        const size = 150 + Math.random() * 150;
        const blur = 10 + Math.random() * 15;
        const top = Math.random() * 85;
        const fadeDuration = 5 + Math.random() * 5;

        cloudEl.style.width = `${size}px`;
        cloudEl.style.height = `${size * 0.4}px`;
        cloudEl.style.filter = `blur(${blur}px)`;
        cloudEl.style.top = `${top}%`;
        cloudEl.style.animation = `fade-in ${fadeDuration}s forwards`;
        
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
        
        clouds.push({
            el: cloudEl,
            x: startX,
            speed: 0.05 + Math.random() * 0.2,
            direction: Math.random() > 0.1 ? 1 : -1,
            // Properties for JS-based vertical drift
            driftSpeed: Math.random() * 0.2 + 0.1,
            driftRange: Math.random() * 10 + 5,
            driftOffset: Math.random() * Math.PI * 2, // Random start point in sine wave
        });
    }

    let lastTime = 0;
    function animateClouds(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        const parallaxStrength = 40; // Max pixels to shift for the fastest cloud

        clouds.forEach(cloud => {
            // Base horizontal movement
            cloud.x += cloud.speed * cloud.direction * (deltaTime / 16);
            
            const cloudWidth = cloud.el.offsetWidth;

            // Wrap around screen
            if (cloud.direction === 1 && cloud.x > screenWidth) {
                cloud.x = -cloudWidth;
            } else if (cloud.direction === -1 && cloud.x < -cloudWidth) {
                cloud.x = screenWidth;
            }
            
            // Parallax effect based on mouse position
            // Faster clouds (higher speed) are more affected
            const parallaxOffsetX = -mouseX * parallaxStrength * cloud.speed;
            const parallaxOffsetY = -mouseY * parallaxStrength * cloud.speed;

            // Vertical drift effect using a sine wave
            const driftY = Math.sin(currentTime * 0.0005 * cloud.driftSpeed + cloud.driftOffset) * cloud.driftRange;
            
            // Combine all transforms
            cloud.el.style.transform = `translateX(${cloud.x + parallaxOffsetX}px) translateY(${driftY + parallaxOffsetY}px)`;
        });

        requestAnimationFrame(animateClouds);
    }

    requestAnimationFrame(animateClouds);
});
