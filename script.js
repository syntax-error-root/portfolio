/* =============================================
   script.js — Critical Developer Portfolio
   ============================================= */

// ---- RAIN CANVAS ----
(function initRain() {
  const canvas = document.getElementById('rain-canvas');
  const ctx = canvas.getContext('2d');
  let drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
  }

  function initDrops() {
    drops = [];
    const cols = Math.floor(canvas.width / 18);
    for (let i = 0; i < cols; i++) {
      drops.push({
        x: i * 18 + Math.random() * 10,
        y: Math.random() * -canvas.height,
        speed: 1.5 + Math.random() * 3,
        length: 60 + Math.random() * 120,
        opacity: 0.3 + Math.random() * 0.7,
        char: getChar(),
        charTimer: 0
      });
    }
  }

  function getChar() {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[];:,./?!@#$%^&*';
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(d => {
      // Gradient line
      const grad = ctx.createLinearGradient(d.x, d.y - d.length, d.x, d.y);
      grad.addColorStop(0, 'rgba(59,130,246,0)');
      grad.addColorStop(0.7, `rgba(59,130,246,${d.opacity * 0.3})`);
      grad.addColorStop(1, `rgba(147,197,253,${d.opacity})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y - d.length);
      ctx.lineTo(d.x, d.y);
      ctx.stroke();

      // Character at tip
      d.charTimer++;
      if (d.charTimer > 8) { d.char = getChar(); d.charTimer = 0; }
      ctx.fillStyle = `rgba(147,197,253,${d.opacity})`;
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(d.char, d.x - 4, d.y);

      d.y += d.speed;
      if (d.y - d.length > canvas.height) {
        d.y = -10;
        d.x = Math.random() * canvas.width;
        d.speed = 1.5 + Math.random() * 3;
      }
    });
  }

  function loop() { draw(); requestAnimationFrame(loop); }
  window.addEventListener('resize', resize);
  resize();
  loop();
})();


// ---- HEADER SCROLL ----
(function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();


// ---- HAMBURGER ----
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
    });
  });
})();


// ---- ROTATING HERO TEXT ----
(function initRotatingText() {
  const el = document.getElementById('rotating-text');
  if (!el) return;
  const phrases = [
    'web experiences',
    'expressive UIs',
    'scalable APIs',
    'AI integrations',
    'developer tools',
    'robust systems'
  ];
  let idx = 0;
  function rotate() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => {
      idx = (idx + 1) % phrases.length;
      el.textContent = phrases[idx];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 350);
  }
  el.style.transition = 'opacity .35s ease, transform .35s ease';
  setInterval(rotate, 3000);
})();


// ---- SCROLL REVEAL ----
(function initReveal() {
  const items = document.querySelectorAll('.card, .section__h2, .about__p, .about__text h2, .ref-card, .project-card, .section__tag, .hero__h1, .hero__sub, .hero__btns, .hero__available');
  items.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => io.observe(el));
})();


// ---- SMOOTH NAV ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ---- LANG SWITCHER (UI only) ----
(function initLang() {
  const btns = document.querySelectorAll('.lang__btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();


// ---- CURSOR GLOW (desktop) ----
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;pointer-events:none;z-index:0;
    background:radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%);
    border-radius:50%;transform:translate(-50%,-50%);transition:opacity .3s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// ---- 3D FLOATING SHAPES ----
(function init3DShapes() {
  const container = document.getElementById('shapes-container');
  if (!container) return;
  const numShapes = 8;
  for (let i = 0; i < numShapes; i++) {
    const shape = document.createElement('div');
    shape.className = 'shape-3d';
    // Randomize size, position, and animation timing
    const size = 60 + Math.random() * 120;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${Math.random() * 90}vw`;
    shape.style.top = `${Math.random() * 90}vh`;
    shape.style.animationDelay = `-${Math.random() * 10}s`;
    shape.style.animationDuration = `${12 + Math.random() * 8}s`;
    
    // Add vivid colors to match the new gradient theme
    const colors = [
      'rgba(59,130,246,0.15)', // Blue
      'rgba(168,85,247,0.15)', // Purple
      'rgba(236,72,153,0.15)', // Pink
      'rgba(16,185,129,0.15)'  // Emerald
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    shape.style.background = `linear-gradient(135deg, ${color}, rgba(255,255,255,0.02))`;
    
    // Some are circles, some are rounded squares
    shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '24px';
    
    container.appendChild(shape);
  }

  // Smooth mouse parallax effect
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 80;
      const y = (window.innerHeight - e.pageY * 2) / 80;
      container.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }
})();
