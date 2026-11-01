pub fn css_bundle() -> &'static str {
    r#"
/* ==========================================================================
   BENTO-GRID & INTERACTIVE SHOWCASE DESIGN SYSTEM
   High-Performance, Dual-Mode WCAG AA Architecture
   ========================================================================== */

:root {
  --canvas-bg: #f8fafc;
  --surface: #ffffff;
  --surface-alt: #f1f5f9;
  --surface-subtle: #f8fafc;
  --surface-overlay: rgba(255, 255, 255, 0.85);
  --border: #e2e8f0;
  --border-focus: #cbd5e1;
  --border-card: #e2e8f0;

  --ink-primary: #0f172a;
  --ink-secondary: #334155;
  --ink-muted: #64748b;
  --ink-subtle: #64748b; /* WCAG 2.1 AA >= 4.5:1 compliant on white */
  --ink-white: #ffffff;

  --spark-blue: #0284c7;
  --spark-pink: #db2777;
  --spark-orange: #ea580c;
  --spark-green: #059669;
  --spark-amber: #d97706;
  --spark-violet: #7c3aed;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  --font-body: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;

  --shadow-subtle: 0 1px 3px rgba(15, 23, 42, 0.05);
  --shadow-card: 0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03);
  --shadow-hover: 0 12px 24px -4px rgba(15, 23, 42, 0.08);
  --shadow-modal: 0 25px 50px -12px rgba(15, 23, 42, 0.35);

  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
}

[data-theme="dark"] {
  --canvas-bg: #090d16;
  --surface: #0f172a;
  --surface-alt: #1e293b;
  --surface-subtle: #131b2e;
  --surface-overlay: rgba(15, 23, 42, 0.85);
  --border: #1e293b;
  --border-focus: #334155;
  --border-card: #1e293b;

  --ink-primary: #f8fafc;
  --ink-secondary: #cbd5e1;
  --ink-muted: #94a3b8;
  --ink-subtle: #94a3b8;
  --ink-white: #ffffff;

  --spark-blue: #38bdf8;
  --spark-pink: #f472b6;
  --spark-orange: #fb923c;
  --spark-green: #34d399;
  --spark-amber: #fbbf24;
  --spark-violet: #a78bfa;

  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 12px 24px -4px rgba(0, 0, 0, 0.5);
  --shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --canvas-bg: #090d16;
    --surface: #0f172a;
    --surface-alt: #1e293b;
    --surface-subtle: #131b2e;
    --surface-overlay: rgba(15, 23, 42, 0.85);
    --border: #1e293b;
    --border-focus: #334155;
    --border-card: #1e293b;

    --ink-primary: #f8fafc;
    --ink-secondary: #cbd5e1;
    --ink-muted: #94a3b8;
    --ink-subtle: #94a3b8;
    --ink-white: #ffffff;

    --spark-blue: #38bdf8;
    --spark-pink: #f472b6;
    --spark-orange: #fb923c;
    --spark-green: #34d399;
    --spark-amber: #fbbf24;
    --spark-violet: #a78bfa;

    --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 12px 24px -4px rgba(0, 0, 0, 0.5);
    --shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  }
}

/* Base Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-body);
  background-color: var(--canvas-bg);
  color: var(--ink-primary);
  line-height: 1.6;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Accessibility Focus Ring */
:focus-visible {
  outline: 2px solid var(--spark-blue);
  outline-offset: 3px;
}

.skip-link {
  position: absolute;
  top: -9999px;
  left: 1rem;
  background: var(--ink-primary);
  color: var(--canvas-bg);
  padding: 0.75rem 1.25rem;
  z-index: 9999;
  border-radius: var(--radius-sm);
}

.skip-link:focus {
  top: 1rem;
}

.container {
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Sticky Navigation */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface-overlay);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  transition: background var(--duration-fast), border-color var(--duration-fast);
}

.site-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.25rem;
}

.site-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

.spark-star {
  color: var(--spark-blue);
  display: inline-flex;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink-secondary);
  transition: color var(--duration-fast);
}

.nav-link:hover {
  color: var(--spark-blue);
}

.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink-secondary);
  transition: background var(--duration-fast), border-color var(--duration-fast), transform var(--duration-fast);
}

.theme-toggle-btn:hover {
  border-color: var(--border-focus);
  color: var(--ink-primary);
  transform: scale(1.05);
}

/* Toast */
#copy-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  background: var(--ink-primary);
  color: var(--canvas-bg);
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  box-shadow: var(--shadow-modal);
  opacity: 0;
  transform: translateY(12px) scale(0.95);
  pointer-events: none;
  transition: opacity 200ms ease, transform 200ms ease;
}

#copy-toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Main Bento Grid */
.bento-section {
  padding: 2.5rem 0 4rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Bento Tile Base */
.bento-tile {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  transition: transform var(--duration-normal) var(--ease-spring), box-shadow var(--duration-normal) var(--ease-spring), border-color var(--duration-normal);
  position: relative;
  overflow: hidden;
}

.bento-tile:hover {
  box-shadow: var(--shadow-hover);
  border-color: var(--border-focus);
}

/* Span Presets */
.tile--hero {
  grid-column: span 2;
  justify-content: space-between;
  background: linear-gradient(135deg, var(--surface) 0%, var(--surface-subtle) 100%);
}

.tile--visual {
  grid-column: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
}

.tile--case-primary {
  grid-column: span 2;
  border-left: 4px solid var(--spark-blue);
}

.tile--case-secondary {
  grid-column: span 1;
  border-left: 4px solid var(--spark-violet);
}

.tile--case-tertiary {
  grid-column: span 1;
  border-left: 4px solid var(--spark-emerald);
}

.tile--case-quaternary {
  grid-column: span 2;
  border-left: 4px solid var(--spark-orange);
}

.tile--case-quinary {
  grid-column: span 3;
  border-left: 4px solid var(--spark-amber);
}

.tile--skills {
  grid-column: span 2;
}

.tile--now {
  grid-column: span 1;
}

.tile--cta {
  grid-column: span 3;
  background: linear-gradient(135deg, var(--surface-alt) 0%, var(--surface) 100%);
  border: 1px solid var(--border-focus);
}

/* Hero Content */
.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

.beacon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--spark-green);
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.25);
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.5); }
  70% { transform: scale(1); box-shadow: 0 0 0 7px rgba(5, 150, 105, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
}

.role-tag {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero__name {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.hero__lead {
  font-size: 1.05rem;
  color: var(--ink-secondary);
  line-height: 1.65;
  margin-bottom: 2rem;
  max-width: 680px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  align-items: center;
}

/* Button Pills */
.btn-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.35rem;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform var(--duration-fast), box-shadow var(--duration-fast), background var(--duration-fast);
}

.btn-pill:hover {
  transform: translateY(-2px);
}

.btn-pill--dark {
  background: var(--ink-primary);
  color: var(--canvas-bg);
}

.btn-pill--dark:hover {
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
}

.btn-pill--subtle {
  background: var(--surface-alt);
  color: var(--ink-primary);
  border: 1px solid var(--border);
}

.btn-pill--subtle:hover {
  background: var(--surface);
  border-color: var(--border-focus);
}

/* Photo Frame */
.photo-avatar {
  width: 220px;
  height: 220px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 3px solid var(--border);
  box-shadow: var(--shadow-card);
  margin-bottom: 1.25rem;
  transition: transform var(--duration-normal) var(--ease-spring);
}

.photo-avatar:hover {
  transform: scale(1.02);
}

.photo-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--ink-muted);
}

/* Case Study Cards */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.category-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--spark-blue);
  background: var(--surface-alt);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 0.65rem;
}

.card-lead {
  font-size: 0.95rem;
  color: var(--ink-secondary);
  line-height: 1.55;
  margin-bottom: 1.5rem;
}

.metrics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.metric-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-primary);
  background: var(--surface-subtle);
  border: 1px solid var(--border);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
}

.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
  margin-top: auto;
}

.tech-tag {
  font-size: 0.8rem;
  color: var(--ink-muted);
  background: var(--surface-alt);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.btn-drawer-trigger {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--spark-blue);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform var(--duration-fast);
}

.btn-drawer-trigger:hover {
  transform: translateX(3px);
}

.btn-source-link {
  font-size: 0.85rem;
  color: var(--ink-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: auto;
  transition: color var(--duration-fast);
}

.btn-source-link:hover {
  color: var(--ink-primary);
}

/* Now Tile */
.now-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.now-entry__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.now-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--spark-blue);
}

.now-entry__text {
  font-size: 0.9rem;
  color: var(--ink-secondary);
  line-height: 1.5;
}

/* Skills Bento Matrix */
.skills-domains {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.skill-domain__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.skill-item__name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ink-primary);
}

.skill-item__note {
  font-size: 0.8rem;
  color: var(--ink-muted);
  line-height: 1.4;
}

/* CTA Banner */
.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.cta-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.cta-desc {
  font-size: 0.95rem;
  color: var(--ink-secondary);
  max-width: 620px;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  align-items: center;
}

/* Native Modal Dialog Drawer */
dialog.project-drawer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.96);
  opacity: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--surface);
  color: var(--ink-primary);
  max-width: 740px;
  width: 92vw;
  max-height: 88vh;
  padding: 2.25rem;
  box-shadow: var(--shadow-modal);
  overflow-y: auto;
  transition: opacity 220ms ease, transform 220ms var(--ease-spring);
}

dialog.project-drawer[open] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

dialog.project-drawer::backdrop {
  background: rgba(9, 13, 22, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.drawer-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.drawer-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface-alt);
  color: var(--ink-secondary);
  font-size: 1.1rem;
  transition: background var(--duration-fast), color var(--duration-fast);
}

.drawer-close:hover {
  background: var(--surface);
  color: var(--ink-primary);
}

.drawer-section {
  margin-bottom: 1.5rem;
}

.drawer-section__label {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--spark-blue);
  margin-bottom: 0.4rem;
}

.drawer-text {
  font-size: 0.95rem;
  color: var(--ink-secondary);
  line-height: 1.6;
}

/* Footer */
.site-footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding: 2.5rem 0;
  font-size: 0.88rem;
  color: var(--ink-muted);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a:hover {
  color: var(--ink-primary);
}

/* Responsive Grid Breakpoints */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .tile--hero {
    grid-column: span 2;
  }
  .tile--visual {
    grid-column: span 2;
  }
  .tile--case-primary, .tile--case-secondary, .tile--case-tertiary, .tile--case-quaternary, .tile--case-quinary {
    grid-column: span 2;
  }
  .tile--skills {
    grid-column: span 2;
  }
  .tile--now {
    grid-column: span 2;
  }
  .tile--cta {
    grid-column: span 2;
  }
  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .tile--hero, .tile--visual, .tile--case-primary, .tile--case-secondary, .tile--case-tertiary, .tile--case-quaternary, .tile--case-quinary, .tile--skills, .tile--now, .tile--cta {
    grid-column: span 1;
  }
  .skills-domains {
    grid-template-columns: 1fr;
  }
  .footer-inner {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
"#
}
