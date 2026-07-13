/* ============================================
   FUTURISTIC PORTFOLIO — INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initParticles();
    initCursor();
    initHeader();
    initNav();
    initScrollReveal();
    initTypedText();
    initSkillBars();
    initCounters();
    initScrollProgress();
    initContactForm();
    initPlayground();
    initMissionCards();
    initCertFlips();
    initButtonAnimations();
});

/* ---- Preloader ---- */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const barFill = document.querySelector('.preloader-bar-fill');
    const percentEl = document.querySelector('.preloader-percent');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.add('loaded');
                document.querySelectorAll('.hero .reveal').forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 120);
                });
            }, 400);
        }
        barFill.style.width = progress + '%';
        percentEl.textContent = Math.floor(progress) + '%';
    }, 80);
}

/* ---- Particle Network ---- */
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.min(Math.floor(window.innerWidth / 15), 80);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            if (!prefersReduced) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

/* ---- Custom Cursor ---- */
function initCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactives = document.querySelectorAll('a, button, .btn, input, textarea, .glass-card, .nav-link, .tcg-card, .memory-card, .game-tab, .pipeline-piece, .stack-btn, .fab-play');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
}

/* ---- Sticky Header ---- */
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* ---- Navigation ---- */
function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal:not(.hero .reveal)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* ---- Typed Text ---- */
function initTypedText() {
    const el = document.querySelector('.typed-text');
    if (!el) return;

    const strings = [
        'Aspiring DevOps Engineer',
        'AWS Cloud Specialist',
        'Docker & Kubernetes Enthusiast',
        'CI/CD Pipeline Builder',
        'Infrastructure Automator'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseCount = 0;

    function type() {
        const current = strings[stringIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1000);
}

/* ---- Skill Bars ---- */
function initSkillBars() {
    const items = document.querySelectorAll('.skill-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                const fill = entry.target.querySelector('.skill-fill');
                if (fill) {
                    setTimeout(() => {
                        fill.style.width = level + '%';
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    items.forEach(item => observer.observe(item));
}

/* ---- Counter Animation ---- */
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'), 10);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
}

/* ---- Contact Form ---- */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

/* ---- Magnetic Button Effect ---- */
document.querySelectorAll('.btn-primary, .hero-social a').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ---- Tilt Effect on Glass Cards ---- */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(max-width: 768px)').matches) {

    document.querySelectorAll('.edu-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ============================================
   PLAYGROUND — INTERACTIVE GAMES
   ============================================ */

const SKILL_CARDS = [
    { name: 'AWS', icon: 'fa-brands fa-aws', cls: 'aws', rarity: 'legendary', power: 95, type: 'Cloud', desc: 'EC2, VPC, S3, RDS, CloudFront mastery' },
    { name: 'Docker', icon: 'fa-brands fa-docker', cls: 'docker', rarity: 'legendary', power: 90, type: 'Container', desc: 'Containerization & Docker Compose orchestration' },
    { name: 'Kubernetes', icon: 'fa-solid fa-dharmachakra', cls: 'k8s', rarity: 'epic', power: 82, type: 'Orchestration', desc: 'Container orchestration at scale' },
    { name: 'Jenkins', icon: 'fa-solid fa-gears', cls: 'jenkins', rarity: 'epic', power: 85, type: 'CI/CD', desc: 'Automated build & deploy pipelines' },
    { name: 'Linux', icon: 'fa-brands fa-linux', cls: 'default', rarity: 'epic', power: 88, type: 'OS', desc: 'Server administration & shell scripting' },
    { name: 'Git', icon: 'fa-brands fa-git-alt', cls: 'default', rarity: 'rare', power: 92, type: 'VCS', desc: 'Version control & GitHub workflows' },
    { name: 'Nginx', icon: 'fa-solid fa-server', cls: 'default', rarity: 'rare', power: 80, type: 'Proxy', desc: 'Reverse proxy & load balancing' },
    { name: 'Python', icon: 'fa-brands fa-python', cls: 'default', rarity: 'rare', power: 78, type: 'Language', desc: 'Automation scripts & backend APIs' },
    { name: 'Java', icon: 'fa-brands fa-java', cls: 'default', rarity: 'rare', power: 85, type: 'Language', desc: 'Enterprise application development' },
    { name: 'React', icon: 'fa-brands fa-react', cls: 'default', rarity: 'rare', power: 75, type: 'Frontend', desc: 'Dynamic UI components' },
    { name: 'MySQL', icon: 'fa-solid fa-database', cls: 'default', rarity: 'rare', power: 85, type: 'Database', desc: 'Relational data management' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', cls: 'default', rarity: 'rare', power: 72, type: 'Runtime', desc: 'JavaScript backend services' }
];

const PIPELINE_STAGES = [
    { id: 'git', label: 'Git Push', icon: 'fa-brands fa-github', order: 0 },
    { id: 'jenkins', label: 'Jenkins Build', icon: 'fa-solid fa-gears', order: 1 },
    { id: 'docker', label: 'Docker Build', icon: 'fa-brands fa-docker', order: 2 },
    { id: 'ecr', label: 'ECR Push', icon: 'fa-solid fa-box', order: 3 },
    { id: 'deploy', label: 'EC2 Deploy', icon: 'fa-solid fa-rocket', order: 4 }
];

const MEMORY_PAIRS = [
    { id: 'aws', icon: 'fa-brands fa-aws', color: '#ff9900' },
    { id: 'docker', icon: 'fa-brands fa-docker', color: '#2496ed' },
    { id: 'k8s', icon: 'fa-solid fa-dharmachakra', color: '#a855f7' },
    { id: 'jenkins', icon: 'fa-solid fa-gears', color: '#d33833' },
    { id: 'linux', icon: 'fa-brands fa-linux', color: '#fCC624' },
    { id: 'git', icon: 'fa-brands fa-git-alt', color: '#f05032' },
    { id: 'nginx', icon: 'fa-solid fa-server', color: '#009639' },
    { id: 'python', icon: 'fa-brands fa-python', color: '#3776ab' }
];

const STACK_CARDS = [
    {
        title: 'DevOps Engineer Trainee',
        company: 'Tudip Technologies Pvt. Ltd.',
        duration: '3 Months',
        points: [
            'Provisioned AWS cloud infrastructure & Docker containerization',
            'Built CI/CD pipelines with Jenkins and GitHub for automated deployments'
        ]
    },
    {
        title: 'Web Development Intern',
        company: 'Demy Software Solutions (DSS)',
        duration: '6 Months',
        points: [
            'Developed responsive web features with modern technologies',
            'Database integration, bug fixing & feature enhancements'
        ]
    }
];

function initPlayground() {
    initGameTabs();
    initSkillDeck();
    initPipelineGame();
    initMemoryGame();
    initCardStack();
}

function initGameTabs() {
    const tabs = document.querySelectorAll('.game-tab');
    const panels = document.querySelectorAll('.game-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const game = tab.dataset.game;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('game-' + game)?.classList.add('active');
        });
    });
}

/* ---- Skill Card Deck ---- */
function initSkillDeck() {
    const deck = document.getElementById('skill-deck');
    const drawnSlot = document.getElementById('drawn-slot');
    const collectedEl = document.getElementById('collected-count');
    if (!deck) return;

    let collected = new Set();

    function renderDeck(cards) {
        deck.innerHTML = '';
        cards.forEach((card, i) => {
            deck.appendChild(createTcgCard(card, i, collected, collectedEl, drawnSlot));
        });
    }

    renderDeck(SKILL_CARDS);

    document.getElementById('shuffle-deck')?.addEventListener('click', () => {
        deck.querySelectorAll('.tcg-card').forEach((c, i) => {
            setTimeout(() => c.classList.add('shuffling'), i * 30);
            setTimeout(() => c.classList.remove('shuffling'), 400 + i * 30);
        });
        const shuffled = [...SKILL_CARDS].sort(() => Math.random() - 0.5);
        setTimeout(() => renderDeck(shuffled), 200);
    });

    document.getElementById('draw-card')?.addEventListener('click', () => {
        const uncollected = SKILL_CARDS.filter(c => !collected.has(c.name));
        if (!uncollected.length) return;
        const card = uncollected[Math.floor(Math.random() * uncollected.length)];
        drawnSlot.innerHTML = '';
        const el = createTcgCard(card, 0, collected, collectedEl, drawnSlot, true);
        el.classList.add('flipped');
        drawnSlot.appendChild(el);
        if (!collected.has(card.name)) {
            collected.add(card.name);
            collectedEl.textContent = collected.size;
        }
    });
}

function createTcgCard(card, index, collected, collectedEl, drawnSlot, autoFlip) {
    const wrap = document.createElement('div');
    wrap.className = `tcg-card rarity-${card.rarity}`;
    wrap.style.animationDelay = index * 0.05 + 's';
    wrap.innerHTML = `
        <div class="tcg-card-inner">
            <div class="tcg-card-front">
                <span class="tcg-rarity">${card.rarity.toUpperCase()}</span>
                <i class="${card.icon} tcg-icon ${card.cls}"></i>
                <span class="tcg-name">${card.name}</span>
                <span class="tcg-power">PWR ${card.power}</span>
            </div>
            <div class="tcg-card-back">
                <strong>${card.type}</strong>
                <p>${card.desc}</p>
                <span class="tcg-power">⚡ ${card.power}/100</span>
            </div>
        </div>`;

    wrap.addEventListener('click', () => {
        wrap.classList.toggle('flipped');
        if (!collected.has(card.name)) {
            collected.add(card.name);
            collectedEl.textContent = collected.size;
            wrap.classList.add('collected');
        }
    });

    return wrap;
}

/* ---- Pipeline Puzzle ---- */
function initPipelineGame() {
    const slotsEl = document.getElementById('pipeline-slots');
    const poolEl = document.getElementById('pipeline-pool');
    const statusEl = document.getElementById('pipeline-status');
    const timeEl = document.getElementById('pipeline-time');
    const deployZone = document.getElementById('deploy-result');
    if (!slotsEl || !poolEl) return;

    let timer = null;
    let seconds = 0;
    let filled = {};

    function reset() {
        clearInterval(timer);
        seconds = 0;
        timeEl.textContent = '0';
        filled = {};
        statusEl.textContent = 'Waiting...';
        deployZone.classList.remove('success');
        document.getElementById('pipeline-celebration')?.classList.add('hidden');
        render();
        timer = setInterval(() => {
            seconds++;
            timeEl.textContent = seconds;
        }, 1000);
    }

    function render() {
        slotsEl.innerHTML = '';
        poolEl.innerHTML = '';

        PIPELINE_STAGES.forEach((stage, i) => {
            const slot = document.createElement('div');
            slot.className = 'pipeline-slot';
            slot.dataset.index = i;
            slot.innerHTML = `<span class="pipeline-slot-num">${i + 1}</span><span>${stage.label}</span>`;
            if (filled[i]) {
                slot.classList.add('filled');
                slot.innerHTML = `<span class="pipeline-slot-num">${i + 1}</span><i class="${filled[i].icon}"></i><span>${filled[i].label}</span>`;
            }
            setupDropSlot(slot, i);
            slotsEl.appendChild(slot);
        });

        const shuffled = [...PIPELINE_STAGES].sort(() => Math.random() - 0.5);
        shuffled.forEach(stage => {
            if (Object.values(filled).some(f => f.id === stage.id)) return;
            const piece = document.createElement('div');
            piece.className = 'pipeline-piece';
            piece.draggable = true;
            piece.dataset.id = stage.id;
            piece.dataset.order = stage.order;
            piece.innerHTML = `<i class="${stage.icon}"></i><span>${stage.label}</span>`;
            setupDragPiece(piece);
            poolEl.appendChild(piece);
        });
    }

    function setupDragPiece(piece) {
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', piece.dataset.id);
            piece.classList.add('dragging');
        });
        piece.addEventListener('dragend', () => piece.classList.remove('dragging'));

        let touchId = null;
        piece.addEventListener('touchstart', (e) => {
            touchId = piece.dataset.id;
            piece.classList.add('dragging');
        }, { passive: true });

        piece.addEventListener('touchend', (e) => {
            piece.classList.remove('dragging');
            const touch = e.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            const slot = target?.closest('.pipeline-slot');
            if (slot && touchId) placePiece(touchId, parseInt(slot.dataset.index));
            touchId = null;
        });
    }

    function setupDropSlot(slot, index) {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('drag-over');
        });
        slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            const id = e.dataTransfer.getData('text/plain');
            placePiece(id, index);
        });
    }

    function placePiece(id, slotIndex) {
        const stage = PIPELINE_STAGES.find(s => s.id === id);
        if (!stage || filled[slotIndex]) return;

        if (stage.order === slotIndex) {
            filled[slotIndex] = stage;
            statusEl.textContent = 'Correct!';
            const slot = slotsEl.children[slotIndex];
            slot?.classList.add('correct', 'correct-flash');
            setTimeout(() => slot?.classList.remove('correct-flash'), 600);
            checkWin();
        } else {
            statusEl.textContent = 'Wrong order — try again!';
            const slot = slotsEl.children[slotIndex];
            slot?.classList.add('wrong');
            setTimeout(() => slot?.classList.remove('wrong'), 500);
        }
        render();
    }

    function checkWin() {
        if (Object.keys(filled).length === PIPELINE_STAGES.length) {
            clearInterval(timer);
            statusEl.textContent = 'DEPLOYED!';
            deployZone.classList.add('success');

            PIPELINE_STAGES.forEach((_, i) => {
                setTimeout(() => {
                    slotsEl.children[i]?.classList.add('correct-flash');
                    setTimeout(() => slotsEl.children[i]?.classList.remove('correct-flash'), 500);
                }, i * 150);
            });

            setTimeout(() => showPipelineCelebration(seconds), 400);
        }
    }

    document.getElementById('reset-pipeline')?.addEventListener('click', reset);
    reset();
}

function showPipelineCelebration(time) {
    const celebration = document.getElementById('pipeline-celebration');
    const timeEl = document.getElementById('celebration-time');
    if (!celebration) return;

    timeEl.textContent = time;
    celebration.classList.remove('hidden');
    launchConfetti(document.getElementById('pipeline-confetti'));
}

function launchConfetti(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const colors = ['#00f0ff', '#a855f7', '#ec4899', '#10b981', '#ffd700'];
    const particles = Array.from({ length: 80 }, () => ({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1) * 12 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        life: 1,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 10
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.life <= 0) return;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15;
            p.life -= 0.012;
            p.rotation += p.spin;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        });
        frame++;
        if (alive && frame < 180) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}

/* ---- Memory Match ---- */
function initMemoryGame() {
    const board = document.getElementById('memory-board');
    const movesEl = document.getElementById('memory-moves');
    const pairsEl = document.getElementById('memory-pairs');
    const timeEl = document.getElementById('memory-time');
    const winEl = document.getElementById('memory-win');
    const winMsg = document.getElementById('memory-win-msg');
    if (!board) return;

    let flipped = [];
    let matched = 0;
    let moves = 0;
    let lock = false;
    let timer = null;
    let seconds = 0;

    function newGame() {
        clearInterval(timer);
        flipped = [];
        matched = 0;
        moves = 0;
        lock = false;
        seconds = 0;
        movesEl.textContent = '0';
        pairsEl.textContent = '0';
        timeEl.textContent = '0';
        winEl.classList.add('hidden');
        board.innerHTML = '';

        const cards = [...MEMORY_PAIRS, ...MEMORY_PAIRS]
            .sort(() => Math.random() - 0.5);

        cards.forEach((card, i) => {
            const el = document.createElement('div');
            el.className = 'memory-card';
            el.dataset.id = card.id;
            el.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front"></div>
                    <div class="memory-card-back"><i class="${card.icon}" style="color:${card.color}"></i></div>
                </div>`;
            el.addEventListener('click', () => flipCard(el));
            board.appendChild(el);
        });

        timer = setInterval(() => {
            seconds++;
            timeEl.textContent = seconds;
        }, 1000);
    }

    function flipCard(el) {
        if (lock || el.classList.contains('flipped') || el.classList.contains('matched')) return;

        el.classList.add('flipped');
        flipped.push(el);

        if (flipped.length === 2) {
            moves++;
            movesEl.textContent = moves;
            lock = true;

            const [a, b] = flipped;
            if (a.dataset.id === b.dataset.id) {
                a.classList.add('matched');
                b.classList.add('matched');
                matched++;
                pairsEl.textContent = matched;
                flipped = [];
                lock = false;

                if (matched === 8) {
                    clearInterval(timer);
                    winEl.classList.remove('hidden');
                    winMsg.textContent = `${moves} moves in ${seconds} seconds — DevOps memory: unlocked!`;
                }
            } else {
                setTimeout(() => {
                    a.classList.remove('flipped');
                    b.classList.remove('flipped');
                    flipped = [];
                    lock = false;
                }, 800);
            }
        }
    }

    document.getElementById('reset-memory')?.addEventListener('click', newGame);
    newGame();
}

/* ---- Experience Card Stack ---- */
function initCardStack() {
    const stack = document.getElementById('card-stack');
    const indexEl = document.getElementById('stack-index');
    const likesEl = document.getElementById('stack-likes');
    if (!stack) return;

    let current = 0;
    let likes = 0;

    function render() {
        stack.innerHTML = '';
        const remaining = STACK_CARDS.slice(current);
        remaining.slice(0, 3).forEach((card, i) => {
            const el = document.createElement('div');
            el.className = 'stack-card';
            el.innerHTML = `
                <span class="stack-card-badge">EXPERIENCE CARD</span>
                <h3>${card.title}</h3>
                <p class="stack-card-company">${card.company}</p>
                <span class="stack-card-duration">${card.duration}</span>
                <ul>${card.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
            if (i === 0) setupSwipe(el);
            stack.appendChild(el);
        });
        indexEl.textContent = Math.min(current + 1, STACK_CARDS.length);
    }

    function swipe(direction) {
        const top = stack.querySelector('.stack-card');
        if (!top || current >= STACK_CARDS.length) return;

        top.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');
        if (direction === 'right') {
            likes++;
            likesEl.textContent = `${likes} cards liked — great experience stack! 🚀`;
        }
        current++;
        setTimeout(render, 400);
    }

    function setupSwipe(el) {
        let startX = 0;
        let currentX = 0;

        el.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            el.classList.add('dragging');
        });
        document.addEventListener('mousemove', (e) => {
            if (!el.classList.contains('dragging')) return;
            currentX = e.clientX - startX;
            el.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
        });
        document.addEventListener('mouseup', () => {
            if (!el.classList.contains('dragging')) return;
            el.classList.remove('dragging');
            if (currentX > 100) swipe('right');
            else if (currentX < -100) swipe('left');
            else el.style.transform = '';
            currentX = 0;
        });

        el.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        el.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX - startX;
            el.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
        }, { passive: true });
        el.addEventListener('touchend', () => {
            if (currentX > 80) swipe('right');
            else if (currentX < -80) swipe('left');
            else el.style.transform = '';
            currentX = 0;
        });
    }

    document.getElementById('stack-prev')?.addEventListener('click', () => {
        if (current > 0) { current--; render(); }
    });
    document.getElementById('stack-next')?.addEventListener('click', () => swipe('left'));
    document.getElementById('stack-pass')?.addEventListener('click', () => swipe('left'));
    document.getElementById('stack-like')?.addEventListener('click', () => swipe('right'));

    render();
}

/* ---- Mission Flip Cards ---- */
function initMissionCards() {
    document.querySelectorAll('.flip-card').forEach(card => {
        const inner = card.querySelector('.flip-card-inner');

        card.querySelector('.flip-trigger')?.addEventListener('click', (e) => {
            e.stopPropagation();
            flipMissionCard(card, true);
        });

        card.querySelector('.flip-back-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            flipMissionCard(card, false);
        });

        card.querySelector('.flip-card-front')?.addEventListener('click', (e) => {
            if (e.target.closest('.flip-trigger')) return;
            flipMissionCard(card, true);
        });
    });

    document.querySelectorAll('.btn-deploy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.add('launching');
            setTimeout(() => btn.classList.remove('launching'), 900);

            const flipCard = btn.closest('.flip-card');
            const anim = flipCard.querySelector('.deploy-animation');
            const log = flipCard.querySelector('.deploy-log');
            const badge = flipCard.querySelector('.deploy-success-badge');
            const mission = btn.dataset.deploy;

            const logs = mission === 'cloud' ? [
                '$ git push origin main',
                '→ Jenkins: Build triggered...',
                '→ Docker: Building images... ✓',
                '→ ECR: Pushing to registry... ✓',
                '→ EC2: Pulling & deploying... ✓',
                '→ CloudFront: Cache invalidated ✓',
                '🚀 DEPLOYMENT SUCCESSFUL — All services live!'
            ] : [
                '$ php artisan migrate',
                '→ Database: Tables created ✓',
                '→ Auth module: Online ✓',
                '→ Forum API: Running ✓',
                '→ Frontend: Assets compiled ✓',
                '🚀 PORTAL DEPLOYED — Students can connect!'
            ];

            badge?.classList.add('hidden');
            anim.classList.add('active');
            log.innerHTML = '';

            logs.forEach((line, i) => {
                setTimeout(() => {
                    const p = document.createElement('div');
                    p.className = 'log-line';
                    p.textContent = line;
                    log.appendChild(p);
                    log.scrollTop = log.scrollHeight;

                    if (i === logs.length - 1) {
                        badge?.classList.remove('hidden');
                    }
                }, i * 600);
            });

            setTimeout(() => {
                anim.classList.remove('active');
                badge?.classList.add('hidden');
            }, logs.length * 600 + 2500);
        });
    });
}

function flipMissionCard(card, toBack) {
    if (!card) return;
    card.classList.add('flipping');
    if (toBack) {
        card.classList.add('flipped');
    } else {
        card.classList.remove('flipped');
    }
    setTimeout(() => card.classList.remove('flipping'), 700);
}

/* ---- Certification Flips ---- */
function initCertFlips() {
    document.querySelectorAll('.cert-flip').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            card.classList.add('clicked');
            setTimeout(() => card.classList.remove('clicked'), 400);
        });
    });
}

/* ---- Global Button Animations ---- */
function initButtonAnimations() {
    const selectors = '.btn, .game-tab, .stack-btn, .stack-nav, .flip-trigger, .flip-back-btn, .fab-play';

    document.querySelectorAll(selectors).forEach(btn => {
        btn.addEventListener('click', (e) => animateButtonClick(e.currentTarget));
    });
}

function animateButtonClick(el) {
    if (!el) return;

    el.classList.remove('clicked');
    void el.offsetWidth;
    el.classList.add('clicked');
    setTimeout(() => el.classList.remove('clicked'), 450);

    if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
    }

    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'btn-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}
