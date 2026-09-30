/* ==============================================================================
   JADAPALLI GOVIND — EDITORIAL STORY-BASED PORTFOLIO ENGINE
   Crafted with: Three.js 3D WebGL · VisionOS Liquid Glass · GSAP ScrollTrigger
   Specialization: Cloud & DevOps Architecture · Autonomous AI Systems
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins if available
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
        if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
    }

    initBackgroundThree();
    initHeroThreeMonolith();
    initLiquidCursor();
    initStoryScrollEngine();
    initDynamicIsland();
    initScrollLaserProgress();
    initMagneticPhysics();
    initGlassCardTilt();
    initRoleTypewriter();
    initMetricCounters();
    initMissionSimulations();
    initTerminalSandbox();
    initPipelineSimulator();
    initScrollTriggerReveals();
});

/* ==============================================================================
   1. THREE.JS DYNAMIC CELESTIAL BACKGROUND CANVAS
   ============================================================================== */
function initBackgroundThree() {
    const canvas = document.getElementById('threeBackgroundCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle constellation
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color('#38bdf8'), // Cerulean
        new THREE.Color('#818cf8'), // Indigo
        new THREE.Color('#64748b'), // Slate
        new THREE.Color('#10b981')  // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

        const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle connecting lines network
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending
    });

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let scrollParallaxY = 0;
    window.addEventListener('scroll', () => {
        scrollParallaxY = window.scrollY * 0.02;
    });

    function animateBg() {
        requestAnimationFrame(animateBg);
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;

        camera.position.x += (mouseX - camera.position.x) * 0.04;
        camera.position.y += (-mouseY - scrollParallaxY - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animateBg();
}

/* ==============================================================================
   2. THREE.JS HERO MONOLITH (HIGH-REFRACTIVE LIQUID GLASS CRYSTAL)
   ============================================================================== */
function initHeroThreeMonolith() {
    const canvas = document.getElementById('threeHeroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 460;
    let height = parent.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Refractive Torus Knot Monolith
    const geometry = new THREE.TorusKnotGeometry(1.22, 0.38, 160, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#38bdf8'),
        emissive: new THREE.Color('#0a1020'),
        roughness: 0.08,
        metalness: 0.15,
        transmission: 0.88,
        ior: 1.52,
        reflectivity: 0.9,
        transparent: true,
        opacity: 0.95
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner wireframe lattice for high-tech architectural aesthetic
    const wireGeo = new THREE.TorusKnotGeometry(1.23, 0.39, 80, 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#818cf8'),
        wireframe: true,
        transparent: true,
        opacity: 0.16
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Dynamic light cluster
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x38bdf8, 3.5, 12);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x818cf8, 3, 12);
    light2.position.set(-3, -3, 2);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x10b981, 2.5, 10);
    light3.position.set(0, 4, -2);
    scene.add(light3);

    // Interactive Drag Physics
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;
            targetRotationY += deltaX * 0.008;
            targetRotationX += deltaY * 0.008;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        } else {
            const rect = canvas.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                targetRotationY += relX * 0.002;
                targetRotationX += relY * 0.002;
            }
        }
    });

    // Touch Drag
    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            targetRotationY += ((touch.clientX - rect.left - rect.width / 2) / rect.width) * 0.03;
        }
    }, { passive: true });

    // Resize
    window.addEventListener('resize', () => {
        width = parent.clientWidth || 460;
        height = parent.clientHeight || 500;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // GSAP ScrollTrigger Integration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.to(mesh.rotation, {
            scrollTrigger: {
                trigger: "#prologue",
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            },
            x: Math.PI * 3,
            y: Math.PI * 4,
            ease: "none"
        });
    }

    const clock = new THREE.Clock();
    function animateHero() {
        requestAnimationFrame(animateHero);
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation interpolation
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.06 + 0.004;
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.06 + 0.006;
        wireMesh.rotation.copy(mesh.rotation);

        // Orbiting lights
        light1.position.x = Math.sin(elapsedTime * 0.9) * 4;
        light1.position.y = Math.cos(elapsedTime * 0.9) * 4;
        light2.position.x = Math.cos(elapsedTime * 0.7) * 4;
        light2.position.z = Math.sin(elapsedTime * 0.7) * 4;

        renderer.render(scene, camera);
    }
    animateHero();
}

/* ==============================================================================
   3. STORY SCROLL ENGINE & BACKGROUND ENVIRONMENT MORPH
   ============================================================================== */
function initStoryScrollEngine() {
    const chapters = [
        { id: 'prologue', name: 'Prologue', num: '00', bg: '#06070a', mesh: 'radial-gradient(circle at 60% 25%, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.05) 35%, transparent 65%)' },
        { id: 'chapter-philosophy', name: 'Philosophy', num: '01', chapterKey: 'philosophy', bg: '#07090e', mesh: 'radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.14) 0%, rgba(14, 165, 233, 0.06) 40%, transparent 70%)' },
        { id: 'chapter-cloud', name: 'Cloud Forge', num: '02', chapterKey: 'cloud', bg: '#060b14', mesh: 'radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.08) 45%, transparent 70%)' },
        { id: 'chapter-ai', name: 'AI Systems', num: '03', chapterKey: 'ai', bg: '#050d12', mesh: 'radial-gradient(circle at 30% 35%, rgba(16, 185, 129, 0.12) 0%, rgba(56, 189, 248, 0.07) 40%, transparent 65%)' },
        { id: 'chapter-missions', name: 'Missions', num: '04', chapterKey: 'missions', bg: '#080a10', mesh: 'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.12) 0%, rgba(129, 140, 248, 0.08) 45%, transparent 70%)' },
        { id: 'chapter-lab', name: 'Interactive Lab', num: '05', chapterKey: 'lab', bg: '#07080d', mesh: 'radial-gradient(circle at 55% 45%, rgba(56, 189, 248, 0.13) 0%, rgba(16, 185, 129, 0.06) 50%, transparent 70%)' },
        { id: 'chapter-trajectory', name: 'Trajectory', num: '06', chapterKey: 'trajectory', bg: '#08070e', mesh: 'radial-gradient(circle at 45% 35%, rgba(245, 158, 11, 0.09) 0%, rgba(99, 102, 241, 0.06) 45%, transparent 70%)' },
        { id: 'chapter-uplink', name: 'Uplink', num: '07', chapterKey: 'uplink', bg: '#050609', mesh: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.14) 0%, rgba(99, 102, 241, 0.07) 45%, transparent 70%)' }
    ];

    const railItems = document.querySelectorAll('.rail-item');
    const railPip = document.getElementById('railActivePip');
    const ambientMesh = document.getElementById('ambientMesh');
    const dockLinks = document.querySelectorAll('.dock-link');
    const dockPill = document.getElementById('dockSlidingPill');

    function updateActiveChapter(index) {
        const ch = chapters[index];
        if (!ch) return;

        const targetKey = ch.chapterKey || ch.id;
        document.body.dataset.chapter = targetKey;

        // Ambient mesh light transition
        if (ambientMesh && ch.mesh) {
            ambientMesh.style.background = ch.mesh;
        }

        // Update Right Rail HUD
        railItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                if (railPip) {
                    const topPos = item.offsetTop + (item.offsetHeight / 2) - 4;
                    railPip.style.transform = `translateY(${topPos}px)`;
                }
            } else {
                item.classList.remove('active');
            }
        });

        // Update Dynamic Island Dock
        dockLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${ch.id}`) {
                dockLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                if (dockPill && window.innerWidth > 768) {
                    const rect = link.getBoundingClientRect();
                    const parentRect = link.parentElement.parentElement.getBoundingClientRect();
                    dockPill.style.width = `${rect.width}px`;
                    dockPill.style.height = `${rect.height}px`;
                    dockPill.style.left = `${rect.left - parentRect.left}px`;
                    dockPill.style.top = `${rect.top - parentRect.top}px`;
                    dockPill.style.opacity = '1';
                }
            }
        });
    }

    // Scroll Observer for Sections
    function checkScroll() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;
        let activeIdx = 0;

        chapters.forEach((ch, idx) => {
            const section = document.getElementById(ch.id);
            if (section) {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < bottom) {
                    activeIdx = idx;
                }
            }
        });

        updateActiveChapter(activeIdx);
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // Smooth Scroll Click Handlers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ==============================================================================
   4. APPLE DYNAMIC ISLAND (FLOATING HEADER DOCK)
   ============================================================================== */
function initDynamicIsland() {
    const header = document.getElementById('header');
    const dockToggle = document.getElementById('dockToggle');
    const dockMenuList = document.getElementById('dockMenuList');
    const links = document.querySelectorAll('.dock-link');
    const dockPill = document.getElementById('dockSlidingPill');

    // Mobile Toggle
    if (dockToggle && dockMenuList) {
        dockToggle.addEventListener('click', () => {
            const isOpen = dockMenuList.classList.toggle('open');
            dockToggle.setAttribute('aria-expanded', isOpen);
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                dockMenuList.classList.remove('open');
                dockToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Dock Shrink on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Hover Tracking on Pill
    if (dockPill && dockMenuList) {
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (window.innerWidth <= 768) return;
                const rect = link.getBoundingClientRect();
                const parentRect = dockMenuList.getBoundingClientRect();
                dockPill.style.width = `${rect.width}px`;
                dockPill.style.height = `${rect.height}px`;
                dockPill.style.left = `${rect.left - parentRect.left}px`;
                dockPill.style.top = `${rect.top - parentRect.top}px`;
                dockPill.style.opacity = '1';
            });
        });

        dockMenuList.addEventListener('mouseleave', () => {
            const active = dockMenuList.querySelector('.dock-link.active');
            if (active && window.innerWidth > 768) {
                const rect = active.getBoundingClientRect();
                const parentRect = dockMenuList.getBoundingClientRect();
                dockPill.style.width = `${rect.width}px`;
                dockPill.style.height = `${rect.height}px`;
                dockPill.style.left = `${rect.left - parentRect.left}px`;
                dockPill.style.top = `${rect.top - parentRect.top}px`;
            } else {
                dockPill.style.opacity = '0';
            }
        });
    }
}

/* ==============================================================================
   5. TOP SCROLL PROGRESS LASER
   ============================================================================== */
function initScrollLaserProgress() {
    const laser = document.getElementById('scrollProgressFill');
    if (!laser) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        laser.style.width = `${progress}%`;
    }, { passive: true });
}

/* ==============================================================================
   6. VISIONOS LIQUID LENS CURSOR
   ============================================================================== */
function initLiquidCursor() {
    const cursor = document.getElementById('liquidCursor');
    if (!cursor) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function renderCursor() {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Expansion over interactive elements
    const dot = cursor.querySelector('.lens-dot');
    const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .stage-draggable-pill, .magnetic');

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (dot) {
                dot.style.width = '44px';
                dot.style.height = '44px';
                dot.style.background = 'rgba(56, 189, 248, 0.15)';
                dot.style.borderColor = 'rgba(56, 189, 248, 0.6)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (dot) {
                dot.style.width = '28px';
                dot.style.height = '28px';
                dot.style.background = 'rgba(255, 255, 255, 0.08)';
                dot.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
    });
}

/* ==============================================================================
   7. MAGNETIC PHYSICS
   ============================================================================== */
function initMagneticPhysics() {
    if (window.innerWidth <= 768) return;
    const magnetics = document.querySelectorAll('.magnetic');

    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) * 0.32;
            const y = (e.clientY - (rect.top + rect.height / 2)) * 0.32;

            if (typeof gsap !== 'undefined') {
                gsap.to(el, { x, y, duration: 0.25, ease: "power2.out" });
            } else {
                el.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
            } else {
                el.style.transform = `translate(0px, 0px)`;
            }
        });
    });
}

/* ==============================================================================
   8. 3D GLASS CARD TILT & SPECULAR SHEEN
   ============================================================================== */
function initGlassCardTilt() {
    if (window.innerWidth <= 768) return;
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotX = ((y - centerY) / centerY) * -6;
            const rotY = ((x - centerX) / centerX) * 6;

            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    rotateX: rotX,
                    rotateY: rotY,
                    transformPerspective: 1200,
                    scale: 1.012,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });
    });
}

/* ==============================================================================
   9. ROLE TYPEWRITER
   ============================================================================== */
function initRoleTypewriter() {
    const target = document.getElementById('roleScroller');
    if (!target) return;

    const titles = [
        "Cloud & DevOps Architect",
        "Autonomous AI Systems Engineer",
        "AWS Multi-Tier Infrastructure Builder",
        "Kubernetes & Docker Orchestrator",
        "CI/CD Zero-Downtime Automation Specialist"
    ];

    let tIndex = 0;
    let cIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function typeStep() {
        const currentTitle = titles[tIndex];

        if (isDeleting) {
            target.textContent = currentTitle.substring(0, cIndex - 1);
            cIndex--;
            speed = 40;
        } else {
            target.textContent = currentTitle.substring(0, cIndex + 1);
            cIndex++;
            speed = 85;
        }

        if (!isDeleting && cIndex === currentTitle.length) {
            isDeleting = true;
            speed = 2000; // Pause at full word
        } else if (isDeleting && cIndex === 0) {
            isDeleting = false;
            tIndex = (tIndex + 1) % titles.length;
            speed = 400; // Pause before typing new word
        }

        setTimeout(typeStep, speed);
    }
    typeStep();
}

/* ==============================================================================
   10. METRIC NUMBER COUNTERS
   ============================================================================== */
function initMetricCounters() {
    const figures = document.querySelectorAll('.metric-figure');
    if (!figures.length) return;

    figures.forEach(fig => {
        const val = parseInt(fig.getAttribute('data-val'), 10);
        if (isNaN(val)) return;

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: fig,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    const counterObj = { v: 0 };
                    gsap.to(counterObj, {
                        v: val,
                        duration: 1.6,
                        ease: "power2.out",
                        onUpdate: () => {
                            fig.textContent = Math.floor(counterObj.v) + (val > 80 ? "%" : "+");
                        }
                    });
                }
            });
        } else {
            fig.textContent = val + (val > 80 ? "%" : "+");
        }
    });
}

/* ==============================================================================
   11. INTERACTIVE CASE STUDY SIMULATIONS
   ============================================================================== */
function initMissionSimulations() {
    const simBtns = document.querySelectorAll('.trigger-sim-btn');

    simBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const simType = this.getAttribute('data-sim');
            const feedbackEl = document.getElementById(`${simType}SimFeedback`);
            if (!feedbackEl) return;

            this.disabled = true;
            const originalHTML = this.innerHTML;
            this.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Executing Sequence...`;

            if (simType === 'notetaker') {
                feedbackEl.textContent = '1/4 Connecting Playwright Bot to Google Meet...';
                feedbackEl.style.color = '#38bdf8';

                setTimeout(() => {
                    feedbackEl.textContent = '2/4 In-call WebRTC Audio streaming to Whisper...';
                }, 900);

                setTimeout(() => {
                    feedbackEl.textContent = '3/4 FastAPI Async Pipeline synthesizing Action Items...';
                }, 1900);

                setTimeout(() => {
                    feedbackEl.textContent = '✓ Sovereign Executive Brief Generated & Saved to SQLite!';
                    feedbackEl.style.color = '#34d399';
                    this.disabled = false;
                    this.innerHTML = originalHTML;
                }, 3000);
            } else if (simType === 'cloud') {
                feedbackEl.textContent = '1/3 Validating Multi-AZ VPC Subnets & NAT Gateway...';
                feedbackEl.style.color = '#38bdf8';

                setTimeout(() => {
                    feedbackEl.textContent = '2/3 Pulling tagged Docker container from Amazon ECR...';
                }, 1000);

                setTimeout(() => {
                    feedbackEl.textContent = '✓ Application Load Balancer Health Check: HTTP 200 OK! [Zero-Downtime]';
                    feedbackEl.style.color = '#34d399';
                    this.disabled = false;
                    this.innerHTML = originalHTML;
                }, 2400);
            } else if (simType === 'portal') {
                feedbackEl.textContent = '1/2 Probing Campus MySQL Cluster Nodes...';
                feedbackEl.style.color = '#38bdf8';

                setTimeout(() => {
                    feedbackEl.textContent = '✓ Query Latency: 6.8ms · All 14 Academic Microservices Operational';
                    feedbackEl.style.color = '#34d399';
                    this.disabled = false;
                    this.innerHTML = originalHTML;
                }, 1200);
            }
        });
    });
}

/* ==============================================================================
   12. INTERACTIVE TERMINAL EMULATOR (CHAPTER 05)
   ============================================================================== */
function initTerminalSandbox() {
    const form = document.getElementById('terminalForm');
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    if (!form || !input || !output) return;

    const commands = {
        help: `Available commands:
  <span class="cmd-highlight">help</span>       - List all executable terminal commands
  <span class="cmd-highlight">status</span>     - Live system telemetry & cloud health
  <span class="cmd-highlight">skills</span>     - Cloud, DevOps, and AI engineering stack
  <span class="cmd-highlight">projects</span>   - Summary of flagship engineering missions
  <span class="cmd-highlight">whoami</span>     - Professional identity & credential brief
  <span class="cmd-highlight">contact</span>    - Direct transmission channels
  <span class="cmd-highlight">clear</span>      - Flush terminal history`,

        status: `[CLOUD BASTION TELEMETRY]
  Region:           ap-south-1 (Mumbai)
  EC2 Nodes:        4 Nodes Active (t3.medium)
  Docker Containers: 12 Running / 0 Degraded
  Whisper Latency:  142ms (Transcribing)
  Memory Usage:     42.8% [Healthy]
  Cluster Uptime:   99.98% SLA Guaranteed`,

        skills: `[CORE CAPABILITIES MATRIX]
  Cloud & IaaS:     AWS (VPC, EC2, S3, RDS, IAM, Route53, ALB)
  Containers:       Docker, Docker Compose, Kubernetes
  Automation:       Jenkins CI/CD, GitHub Actions, Bash, Python
  AI & Media:       OpenAI API, Whisper STT, WebRTC, Playwright
  Architecture:     3-Tier Distributed Systems, Reverse Proxy (Nginx)`,

        projects: `[FLAGSHIP MISSIONS]
  1. Autonomous AI Meeting Notetaker (Playwright + WebRTC + Whisper + FastAPI)
  2. Cloud-Native Multi-Backend AWS Cluster (VPC, Docker, Jenkins, ECR)
  3. Audisankara Campus Knowledge Hub (PHP, MySQL, AJAX, RBAC)`,

        whoami: `[IDENTITY RECORD]
  Name:        Jadapalli Govind
  Role:        Cloud Architect & AI Systems Engineer
  Education:   B.Tech in Computer Science & Engineering (87% Aggregate)
  Internships: Tudip Technologies (Full Stack) · DSS (Python AI)
  Focus:       Zero-downtime Cloud Reliability & Autonomous AI Workflows`,

        contact: `[TRANSMISSION CHANNELS]
  Email:    <a href="mailto:govindjadapalli28@gmail.com" class="cmd-highlight">govindjadapalli28@gmail.com</a>
  Phone:    <a href="tel:+919381753363" class="cmd-highlight">+91 9381753363</a>
  LinkedIn: <a href="https://linkedin.com/in/govind28" target="_blank" class="cmd-highlight">linkedin.com/in/govind28</a>
  GitHub:   <a href="https://github.com/GoviGt650" target="_blank" class="cmd-highlight">github.com/GoviGt650</a>`,

        neofetch: `
      .--.          govind@cloud-bastion
     |o_o |         --------------------
     |:_/ |         OS: Ubuntu 22.04 LTS x86_64
    //   \\ \\        Host: AWS EC2 Multi-AZ Cluster
   (|     | )       Kernel: 6.2.0-generic
  /'\\_   _/\`\\      Shell: bash 5.1.16
  \\___)=(___/       Uptime: 243 days, 14 hours`
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawCmd = input.value.trim();
        const cmd = rawCmd.toLowerCase();
        if (!rawCmd) return;

        // Print user command line
        const promptEcho = document.createElement('p');
        promptEcho.className = 'term-line user-echo';
        promptEcho.innerHTML = `<span class="term-prompt-label">govind@cloud-bastion:~$</span> ${escapeHTML(rawCmd)}`;
        output.appendChild(promptEcho);

        // Process response
        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (commands[cmd]) {
            const resp = document.createElement('div');
            resp.className = 'term-line term-response';
            resp.innerHTML = commands[cmd];
            output.appendChild(resp);
        } else {
            const err = document.createElement('p');
            err.className = 'term-line term-error';
            err.style.color = '#ef4444';
            err.innerHTML = `bash: command not found: ${escapeHTML(rawCmd)}. Type <span class="cmd-highlight">'help'</span> for valid directives.`;
            output.appendChild(err);
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }
}

/* ==============================================================================
   13. INTERACTIVE CI/CD PIPELINE FLOW SIMULATOR (CHAPTER 05)
   ============================================================================== */
function initPipelineSimulator() {
    const availableContainer = document.getElementById('pipelineAvailableStages');
    const track = document.getElementById('pipelineAssemblyTrack');
    const resetBtn = document.getElementById('resetPipelineBtn');
    const resultBanner = document.getElementById('pipelineResultBanner');
    if (!availableContainer || !track) return;

    const stages = [
        { id: 1, label: '1. Git Commit & Tag', icon: 'fa-brands fa-git-alt' },
        { id: 2, label: '2. Jenkins CI Build', icon: 'fa-solid fa-gears' },
        { id: 3, label: '3. Automated PyTest Suite', icon: 'fa-solid fa-vial' },
        { id: 4, label: '4. Docker Package & ECR Push', icon: 'fa-brands fa-docker' },
        { id: 5, label: '5. AWS ECS Service Update', icon: 'fa-brands fa-aws' }
    ];

    let currentSlots = [null, null, null, null, null];

    function renderSimulator() {
        // Clear slots
        const slotEls = track.querySelectorAll('.assembly-slot');
        slotEls.forEach((slot, i) => {
            slot.classList.remove('filled', 'error');
            slot.innerHTML = `<span>Stage ${i + 1}</span>`;
            currentSlots[i] = null;
        });

        // Hide result banner
        if (resultBanner) resultBanner.classList.add('hidden');

        // Shuffle available stages
        availableContainer.innerHTML = '';
        const shuffled = [...stages].sort(() => Math.random() - 0.5);

        shuffled.forEach(stage => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'stage-draggable-pill magnetic';
            chip.innerHTML = `<i class="${stage.icon}"></i> ${stage.label}`;
            chip.setAttribute('data-id', stage.id);

            chip.addEventListener('click', () => {
                // Find first open slot
                const nextOpenIndex = currentSlots.findIndex(s => s === null);
                if (nextOpenIndex !== -1) {
                    currentSlots[nextOpenIndex] = stage;
                    chip.style.opacity = '0.3';
                    chip.style.pointerEvents = 'none';

                    const targetSlot = slotEls[nextOpenIndex];
                    targetSlot.classList.add('filled');
                    targetSlot.innerHTML = `<i class="${stage.icon}"></i> <span>${stage.label}</span>`;

                    // Check if complete
                    if (currentSlots.every(s => s !== null)) {
                        validatePipeline(slotEls);
                    }
                }
            });

            availableContainer.appendChild(chip);
        });

        // Re-attach magnetic
        initMagneticPhysics();
    }

    function validatePipeline(slotEls) {
        const isCorrect = currentSlots.every((s, idx) => s.id === idx + 1);

        if (isCorrect) {
            if (resultBanner) {
                resultBanner.classList.remove('hidden');
                resultBanner.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>All Stages Verified! Automated Release Deployed to AWS EC2 Cluster with Zero Downtime.</span>`;
            }
        } else {
            slotEls.forEach(s => s.classList.add('error'));
            if (resultBanner) {
                resultBanner.classList.remove('hidden');
                resultBanner.style.background = 'rgba(239, 68, 68, 0.15)';
                resultBanner.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                resultBanner.style.color = '#f87171';
                resultBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>Sequence Mismatch: Code must be Committed → Built → Tested → Packaged → Deployed! Resetting...</span>`;
            }
            setTimeout(() => {
                if (resultBanner) {
                    resultBanner.style.background = '';
                    resultBanner.style.borderColor = '';
                    resultBanner.style.color = '';
                }
                renderSimulator();
            }, 2500);
        }
    }

    renderSimulator();

    if (resetBtn) {
        resetBtn.addEventListener('click', renderSimulator);
    }
}

/* ==============================================================================
   14. GSAP SCROLLTRIGGER SOFT ENTRANCE REVEALS
   ============================================================================== */
function initScrollTriggerReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const reveals = document.querySelectorAll('.st-reveal');

    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 35,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.85,
            ease: "power2.out"
        });
    });
}
