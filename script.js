// --- CURSOR LOGIC ---
        const cursorRing = document.getElementById('cursor-ring');
        const cursorDot = document.getElementById('cursor-dot');
        
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instant tracking for the center dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth trailing animation for the outer ring
        function animateCursor() {
            let distX = mouseX - ringX;
            let distY = mouseY - ringY;
            
            ringX += distX * 0.15;
            ringY += distY * 0.15;
            
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor morphs on hoverable elements
        const hoverTargets = document.querySelectorAll('.hover-target, button');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorRing.style.width = '70px';
                cursorRing.style.height = '70px';
                cursorRing.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorRing.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)'; // Intense hover glow
                cursorDot.style.opacity = '0'; // Hide dot on hover
            });
            target.addEventListener('mouseleave', () => {
                cursorRing.style.width = '36px';
                cursorRing.style.height = '36px';
                cursorRing.style.backgroundColor = 'transparent';
                cursorRing.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.9)'; // Reset glow
                cursorDot.style.opacity = '1'; // Show dot
            });
        });

        // --- INTERSECTION OBSERVER FOR FADE-IN SCROLLING ---
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.observe-me').forEach((element) => {
            observer.observe(element);
        });

        // --- MODAL LOGIC ---
        function openModal(id) {
            document.getElementById(id).classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Close modal when clicking outside of the content
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if(e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });