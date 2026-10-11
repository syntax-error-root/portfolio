/* =============================================
   script.js — Critical Developer Portfolio
   ============================================= */

// ---- HELPERS ----
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function executedFunction() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ---- 3D WEBGL AMBIENT CONSTELLATION BACKGROUND ----
(function initWebGLBackground() {
  const canvas = document.getElementById('webgl-bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 85;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL not available for background:', e);
    return;
  }

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Group to respond to scroll & subtle mouse tilt
  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  // Particle Field
  const particleCount = isMobile ? 250 : 550;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const colorA = new THREE.Color(0x3b82f6); // Azure
  const colorB = new THREE.Color(0xa855f7); // Purple
  const colorC = new THREE.Color(0x06b6d4); // Cyan

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 160;
    const y = (Math.random() - 0.5) * 140;
    const z = (Math.random() - 0.5) * 120;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const mixedColor = i % 3 === 0 ? colorA : (i % 3 === 1 ? colorB : colorC);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular point texture generated dynamically
  const getPointTexture = () => {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(147,197,253,0.8)');
    grad.addColorStop(1, 'rgba(59,130,246,0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    const texture = new THREE.Texture(pCanvas);
    texture.needsUpdate = true;
    return texture;
  };

  const material = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    map: getPointTexture(),
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, material);
  worldGroup.add(particleSystem);

  // Geometric Floating Wireframe polyhedra in background space
  const floatingObjects = [];
  const polyGeos = [
    new THREE.OctahedronGeometry(4, 0),
    new THREE.IcosahedronGeometry(3.5, 0),
    new THREE.TetrahedronGeometry(4, 0),
    new THREE.TorusGeometry(3.2, 0.9, 8, 20)
  ];

  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: true,
    transparent: true,
    opacity: 0.16
  });

  const numPolys = isMobile ? 4 : 8;
  for (let i = 0; i < numPolys; i++) {
    const geo = polyGeos[i % polyGeos.length];
    const mesh = new THREE.Mesh(geo, wireMat.clone());
    mesh.material.color.setHex(i % 2 === 0 ? 0x60a5fa : 0xc084fc);
    mesh.position.set(
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 60 - 15
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.008,
      rotY: (Math.random() - 0.5) * 0.008,
      floatSpeed: 0.5 + Math.random() * 0.5,
      initY: mesh.position.y
    };
    worldGroup.add(mesh);
    floatingObjects.push(mesh);
  }

  // Mouse interactivity
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.035;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.035;
  }, { passive: true });

  // Scroll sync
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', debounce(onResize, 150));

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera inertia
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    worldGroup.rotation.y = targetX * 0.008 + elapsedTime * 0.03;
    worldGroup.rotation.x = targetY * 0.008;

    // React to scroll position smoothly
    worldGroup.position.y = (scrollY * 0.035) % 80;

    // Rotate and float geometric polyhedra
    floatingObjects.forEach((obj) => {
      obj.rotation.x += obj.userData.rotX;
      obj.rotation.y += obj.userData.rotY;
      obj.position.y = obj.userData.initY + Math.sin(elapsedTime * obj.userData.floatSpeed) * 3;
    });

    renderer.render(scene, camera);
  }

  animate();
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
  const items = document.querySelectorAll('.card, .section__h2, .about__p, .about__text h2, .ref-card, .project-card, .section__tag, .hero__h1, .hero__sub, .hero__btns');
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
  document.addEventListener('mousemove', throttle(e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, 16));
})();

// ---- HERO 3D QUANTUM CORE ARTWORK ----
(function initHero3DQuantumCore() {
  const canvas = document.getElementById('three-core-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = document.getElementById('hero-stage-canvas');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 8.5;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL core init failed:', e);
    return;
  }

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Core Group
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 30);
  blueLight.position.set(5, 5, 5);
  scene.add(blueLight);

  const purpleLight = new THREE.PointLight(0xa855f7, 2.2, 30);
  purpleLight.position.set(-5, -4, 4);
  scene.add(purpleLight);

  const pinkLight = new THREE.PointLight(0xec4899, 1.8, 25);
  pinkLight.position.set(0, 6, -3);
  scene.add(pinkLight);

  // 1. Central Quantum Icosahedron Core (Metallic / Glass look)
  const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x1e1b4b,
    metalness: 0.85,
    roughness: 0.25,
    wireframe: false,
    emissive: 0x2e1065,
    emissiveIntensity: 0.35
  });
  const innerCore = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(innerCore);

  // 2. Inner Glow Lattice (Wireframe Layer)
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const wireCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.68, 2), wireMat);
  coreGroup.add(wireCore);

  // 3. Gyroscopic Orbit Rings
  const rings = [];
  const ringGeos = [
    { r: 2.3, tube: 0.035, color: 0x38bdf8 },
    { r: 2.8, tube: 0.03, color: 0xa855f7 },
    { r: 3.3, tube: 0.025, color: 0xec4899 }
  ];

  ringGeos.forEach((cfg, idx) => {
    const rGeo = new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 80);
    const rMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.9
    });
    const ringMesh = new THREE.Mesh(rGeo, rMat);
    ringMesh.rotation.x = (idx * Math.PI) / 3;
    ringMesh.rotation.y = (idx * Math.PI) / 4;
    coreGroup.add(ringMesh);
    rings.push({
      mesh: ringMesh,
      speedX: (idx + 1) * 0.007,
      speedY: (idx + 1) * 0.005
    });
  });

  // 4. Floating Quantum Energy Sparks (Orbital Particles)
  const sparkCount = 65;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i++) {
    const rad = 2.0 + Math.random() * 1.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    sparkPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
    sparkPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
    sparkPos[i * 3 + 2] = rad * Math.cos(phi);
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.12,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const sparkCloud = new THREE.Points(sparkGeo, sparkMat);
  coreGroup.add(sparkCloud);

  // 5. Alternate Mode Meshes (Tesseract & Supernova Nebula)
  const tesseractGroup = new THREE.Group();
  const boxOuter = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.4, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true, roughness: 0.2, metalness: 0.9 })
  );
  const boxInner = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 0.6, wireframe: false, roughness: 0.3 })
  );
  tesseractGroup.add(boxOuter, boxInner);
  tesseractGroup.visible = false;
  coreGroup.add(tesseractGroup);

  const nebulaGroup = new THREE.Group();
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.4, 0.45, 100, 16),
    new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0x831843,
      emissiveIntensity: 0.4,
      metalness: 0.95,
      roughness: 0.15
    })
  );
  nebulaGroup.add(torusKnot);
  nebulaGroup.visible = false;
  coreGroup.add(nebulaGroup);

  // Mode Switcher Controls
  let currentMode = 'quantum';
  const polyDisplay = document.getElementById('render-poly-count');
  const shaderDisplay = document.getElementById('render-shader-mode');

  document.querySelectorAll('.artwork-mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.artwork-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      currentMode = mode;

      if (mode === 'quantum') {
        innerCore.visible = true;
        wireCore.visible = true;
        rings.forEach(r => r.mesh.visible = true);
        sparkCloud.visible = true;
        tesseractGroup.visible = false;
        nebulaGroup.visible = false;
        if (polyDisplay) polyDisplay.textContent = '18.6k';
        if (shaderDisplay) shaderDisplay.textContent = 'METALLIC PBR';
      } else if (mode === 'hypercube') {
        innerCore.visible = false;
        wireCore.visible = false;
        rings.forEach(r => r.mesh.visible = false);
        sparkCloud.visible = true;
        tesseractGroup.visible = true;
        nebulaGroup.visible = false;
        if (polyDisplay) polyDisplay.textContent = '14.2k';
        if (shaderDisplay) shaderDisplay.textContent = 'TESSERACT MATRIX';
      } else if (mode === 'supernova') {
        innerCore.visible = false;
        wireCore.visible = false;
        rings.forEach(r => r.mesh.visible = true);
        sparkCloud.visible = true;
        tesseractGroup.visible = false;
        nebulaGroup.visible = true;
        if (polyDisplay) polyDisplay.textContent = '24.8k';
        if (shaderDisplay) shaderDisplay.textContent = 'NEBULA TOROID';
      }
    });
  });

  // Mouse drag & gesture interactivity
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let rotSpeedX = 0;
  let rotSpeedY = 0;
  const coordDisplay = document.getElementById('artwork-coords');

  const onPointerDown = (e) => {
    isDragging = true;
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
  };

  const onPointerMove = (e) => {
    const curX = e.clientX || (e.touches && e.touches[0].clientX);
    const curY = e.clientY || (e.touches && e.touches[0].clientY);

    if (coordDisplay && curX && curY) {
      const rect = container.getBoundingClientRect();
      const relX = ((curX - rect.left) / rect.width - 0.5) * 2;
      const relY = ((curY - rect.top) / rect.height - 0.5) * -2;
      coordDisplay.textContent = `X: ${relX.toFixed(2)} Y: ${relY.toFixed(2)}`;
    }

    if (!isDragging) return;
    const deltaX = curX - prevMouseX;
    const deltaY = curY - prevMouseY;
    prevMouseX = curX;
    prevMouseY = curY;

    rotSpeedY = deltaX * 0.007;
    rotSpeedX = deltaY * 0.007;

    coreGroup.rotation.y += rotSpeedY;
    coreGroup.rotation.x += rotSpeedX;
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Resize handler
  function resizeStage() {
    if (!container.clientWidth || !container.clientHeight) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', debounce(resizeStage, 150));

  // FPS Monitor
  const fpsDisplay = document.getElementById('render-fps');
  let frameCount = 0;
  let lastTime = performance.now();

  function animateStage(time) {
    requestAnimationFrame(animateStage);

    // Inertial rotation decay
    if (!isDragging) {
      rotSpeedX *= 0.94;
      rotSpeedY *= 0.94;
      coreGroup.rotation.x += rotSpeedX + 0.002;
      coreGroup.rotation.y += rotSpeedY + 0.005;
    }

    // Rings spin at distinctive atomic axes
    rings.forEach((r) => {
      r.mesh.rotation.x += r.speedX;
      r.mesh.rotation.y += r.speedY;
    });

    sparkCloud.rotation.y -= 0.003;
    sparkCloud.rotation.z += 0.002;

    // Specific mode animations
    if (currentMode === 'hypercube') {
      boxOuter.rotation.x += 0.008;
      boxOuter.rotation.y += 0.012;
      boxInner.rotation.x -= 0.015;
      boxInner.rotation.y -= 0.01;
    } else if (currentMode === 'supernova') {
      torusKnot.rotation.x += 0.006;
      torusKnot.rotation.y += 0.009;
    }

    // Pulsing inner wireframe
    const pulseScale = 1.0 + Math.sin(time * 0.0025) * 0.04;
    wireCore.scale.set(pulseScale, pulseScale, pulseScale);

    renderer.render(scene, camera);

    // Frame counter
    frameCount++;
    if (time >= lastTime + 1000) {
      if (fpsDisplay) {
        const fps = Math.round((frameCount * 1000) / (time - lastTime));
        fpsDisplay.textContent = `${fps} FPS`;
      }
      frameCount = 0;
      lastTime = time;
    }
  }

  requestAnimationFrame(animateStage);
})();

// ---- 3D HOLOGRAPHIC AVATAR GYROSCOPE RING ----
(function initAvatarHoloRing() {
  const canvas = document.getElementById('avatar-holo-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4.8;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
  } catch (e) {
    return;
  }
  renderer.setSize(170, 170);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.65 });
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.5 });

  const r1 = new THREE.Mesh(ringGeo, ringMat1);
  const r2 = new THREE.Mesh(ringGeo, ringMat2);
  r2.rotation.x = Math.PI / 2.5;
  group.add(r1, r2);

  function animateHolo() {
    requestAnimationFrame(animateHolo);
    r1.rotation.z += 0.015;
    r1.rotation.x += 0.008;
    r2.rotation.y += 0.012;
    r2.rotation.z -= 0.007;
    renderer.render(scene, camera);
  }
  animateHolo();
})();


// ---- INTERACTIVE 3D CARD TILT EFFECT ----
(function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltTargets = document.querySelectorAll('.card, .project-card, .about__card, .cta-inner');

  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });
})();

// ---- EMAIL PROTECTION (bot-resistant) ----
(function initEmailProtection() {
  const links = document.querySelectorAll('[data-email]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const email = atob(this.dataset.email);
      window.location.href = 'mailto:' + email;
    });
  });
})();
