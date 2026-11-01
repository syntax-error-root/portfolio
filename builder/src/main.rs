use maud::{html, Markup, PreEscaped, DOCTYPE};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
struct NowSection {
    focus: String,
    reading: String,
    location_note: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Profile {
    name: String,
    handle: String,
    role: String,
    headline: String,
    #[serde(default)]
    avatar: Option<String>,
    #[serde(default)]
    hero_lead: Option<String>,
    location: String,
    timezone: String,
    utc_offset: String,
    status: String,
    about: Vec<String>,
    now: NowSection,
}

#[derive(Debug, Serialize, Deserialize)]
struct SkillItem {
    name: String,
    note: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Domain {
    title: String,
    summary: String,
    skills: Vec<SkillItem>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Project {
    id: String,
    category: String,
    title: String,
    headline: String,
    problem: String,
    solution: String,
    stack: Vec<String>,
    link: String,
    #[serde(rename = "linkLabel")]
    link_label: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Contact {
    email: String,
    github: String,
    linkedin: String,
    twitter: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct PortfolioData {
    profile: Profile,
    domains: Vec<Domain>,
    projects: Vec<Project>,
    contact: Contact,
}

fn inline_css() -> &'static str {
    r#"
/* ==========================================================================
   HIGH-PERFORMANCE ARCHITECTURAL DESIGN SYSTEM
   Adaptive Minimalist Display + Card Showcase System
   ========================================================================== */

:root {
  --canvas-bg: #f8fafc;
  --surface: #ffffff;
  --surface-alt: #f1f5f9;
  --surface-subtle: #f8fafc;
  --border: #e2e8f0;
  --border-focus: #cbd5e1;
  --border-card: #e2e8f0;

  --ink-primary: #0f172a;
  --ink-secondary: #334155;
  --ink-muted: #64748b;
  --ink-subtle: #94a3b8;
  --ink-white: #ffffff;

  --spark-blue: #1787e8;
  --spark-pink: #fd4cac;
  --spark-orange: #ff8b59;
  --spark-green: #10b981;
  --spark-amber: #f59e0b;
  --spark-violet: #8b5cf6;

  --font-display: 'Sora', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;

  --shadow-sm: 0 2px 4px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 20px 40px -12px rgba(15, 23, 42, 0.12);
  --shadow-card: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background-color: var(--canvas-bg);
  color: var(--ink-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: var(--canvas-bg);
  color: var(--ink-secondary);
}

a {
  color: inherit;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2.25rem;
  }
}

/* --------------------------------------------------------------------------
   NAVBAR (Floating Translucent Style)
   -------------------------------------------------------------------------- */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.site-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.75rem;
  gap: 1.5rem;
}

.site-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ink-primary);
  letter-spacing: -0.02em;
}

.site-brand:hover {
  color: var(--spark-blue);
}

.spark-star {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--spark-blue);
  animation: sparkPulse 4s ease-in-out infinite;
}

@keyframes sparkPulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.15) rotate(180deg); color: var(--spark-pink); }
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink-secondary);
  position: relative;
  padding: 0.4rem 0;
}

.nav-link:hover {
  color: var(--spark-blue);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--spark-blue);
  transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.15rem;
  background: var(--ink-primary);
  color: var(--ink-white);
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid var(--ink-primary);
}

.nav-cta:hover {
  background: var(--spark-blue);
  border-color: var(--spark-blue);
  color: var(--ink-white);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(23, 135, 232, 0.3);
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 1.25rem;
  }
  .nav-link:not(:first-child) {
    display: none;
  }
}

/* --------------------------------------------------------------------------
   HERO SECTION (Large Display + Floating Photo Frame)
   -------------------------------------------------------------------------- */
.hero {
  padding: 4.5rem 0 3.5rem;
  position: relative;
  overflow: hidden;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 900px) {
  .hero__grid {
    grid-template-columns: 1.4fr 1fr;
    gap: 4rem;
  }
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink-muted);
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 7.5vw, 6.2rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--ink-primary);
  margin-bottom: 1.5rem;
}

.hero__role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-primary);
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.hero__role-badge .beacon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--spark-green);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

.hero__lead {
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  line-height: 1.6;
  color: var(--ink-secondary);
  margin-bottom: 2rem;
  font-weight: 400;
  max-width: 62ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

/* PILL BUTTONS */
.btn-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-pill);
  font-size: 0.92rem;
  font-weight: 600;
  font-family: var(--font-body);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid transparent;
  line-height: 1.4;
}

.btn-pill--dark {
  background: var(--ink-primary);
  color: var(--ink-white);
  border-color: var(--ink-primary);
}

.btn-pill--dark:hover {
  background: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.25);
  color: var(--ink-white);
}

.btn-pill--dark .arrow-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-pill--dark:hover .arrow-circle {
  transform: translateX(3px);
  background: var(--spark-blue);
}

.btn-pill--subtle {
  background: var(--surface);
  color: var(--ink-primary);
  border-color: var(--border);
  box-shadow: var(--shadow-sm);
}

.btn-pill--subtle:hover {
  border-color: var(--spark-blue);
  color: var(--spark-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-pill--copy.btn--copied {
  background: #ecfdf5 !important;
  color: #065f46 !important;
  border-color: #10b981 !important;
}

/* HERO PHOTO / STICKER FRAME */
.hero__visual {
  display: flex;
  justify-content: center;
  position: relative;
}

.photo-sticker-frame {
  position: relative;
  border-radius: 32px;
  padding: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transform: rotate(-2deg);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  max-width: 340px;
  width: 100%;
}

.photo-sticker-frame:hover {
  transform: rotate(0deg) scale(1.02);
  box-shadow: 0 30px 60px -15px rgba(15, 23, 42, 0.2);
}

.photo-sticker-frame img {
  border-radius: 24px;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.spark-tag-badge {
  position: absolute;
  bottom: -15px;
  right: -10px;
  background: var(--ink-primary);
  color: var(--ink-white);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: var(--shadow-md);
  border: 2px solid var(--surface);
}

.spark-tag-badge svg {
  color: var(--spark-orange);
}

/* --------------------------------------------------------------------------
   NOW / LEDGER BANNER STRIP
   -------------------------------------------------------------------------- */
.now-strip {
  margin: 1.5rem 0 4rem;
}

.now-strip__container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.75rem 2rem;
  box-shadow: var(--shadow-card);
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
}

@media (min-width: 860px) {
  .now-strip__container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.now-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.now-item:not(:last-child) {
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.25rem;
}

@media (min-width: 860px) {
  .now-item:not(:last-child) {
    border-bottom: none;
    border-right: 1px solid var(--border);
    padding-bottom: 0;
    padding-right: 1.75rem;
  }
}

.now-item__label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.now-item__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.now-item__dot--blue { background: var(--spark-blue); }
.now-item__dot--violet { background: var(--spark-violet); }
.now-item__dot--green { background: var(--spark-green); }

.now-item__text {
  font-size: 0.9rem;
  color: var(--ink-secondary);
  line-height: 1.5;
}

/* --------------------------------------------------------------------------
   SECTION HEADERS (Display Header Style)
   -------------------------------------------------------------------------- */
.section {
  padding: 3.5rem 0;
}

.section-head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .section-head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.section-head__meta {
  max-width: 680px;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--spark-blue);
  margin-bottom: 0.4rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--ink-primary);
}

.section-desc {
  font-size: 1.05rem;
  color: var(--ink-muted);
  margin-top: 0.65rem;
  line-height: 1.55;
}

.section-head__action {
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .section-head__action {
    margin-top: 0;
  }
}

/* --------------------------------------------------------------------------
   WORK / CASE STUDY CARDS (Vibrant Project Showcase Cards)
   -------------------------------------------------------------------------- */
.case-studies-grid {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.work-card {
  border-radius: var(--radius-xl);
  padding: 2.25rem 1.75rem;
  color: var(--ink-white);
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 36px -10px rgba(15, 23, 42, 0.18);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
}

@media (min-width: 768px) {
  .work-card {
    padding: 3rem 2.75rem;
  }
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -12px rgba(15, 23, 42, 0.28);
}

/* Individual vibrant card palettes */
.work-card--azure {
  background: linear-gradient(135deg, #09172e 0%, #173873 55%, #1787e8 100%);
}

.work-card--violet {
  background: linear-gradient(135deg, #1b0c2e 0%, #3b1464 55%, #7e22ce 100%);
}

.work-card--emerald {
  background: linear-gradient(135deg, #041f17 0%, #064e3b 55%, #059669 100%);
}

.work-card--amber {
  background: linear-gradient(135deg, #221204 0%, #5e2808 55%, #b45309 100%);
}

.work-card--indigo {
  background: linear-gradient(135deg, #0a0e1c 0%, #1e1b4b 55%, #4338ca 100%);
}

.work-card__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.work-card__badge-cluster {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.card-cat-pill {
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: var(--ink-white);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.card-status-pill {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.04em;
}

.work-card__arrow-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--ink-white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.work-card:hover .work-card__arrow-btn {
  background: var(--ink-white);
  color: var(--ink-primary);
  transform: scale(1.08) rotate(45deg);
}

.work-card__title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.2vw, 2.35rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: var(--ink-white);
  margin-bottom: 0.85rem;
}

.work-card__lead {
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 2rem;
  max-width: 80ch;
}

.work-card__body-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .work-card__body-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }
}

.col-challenge, .col-solution {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.col-heading {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.65);
}

.col-text {
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
}

.work-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.work-card__stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}

.stack-badge {
  background: rgba(255, 255, 255, 0.14);
  color: var(--ink-white);
  padding: 0.32rem 0.75rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.card-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--ink-white);
  color: var(--ink-primary);
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-action-btn:hover {
  background: var(--surface);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
  color: var(--spark-blue);
}

/* --------------------------------------------------------------------------
   CAPABILITIES / DOMAINS SECTION
   -------------------------------------------------------------------------- */
.domains-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
}

@media (min-width: 860px) {
  .domains-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

.domain-card {
  background: var(--surface);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-xl);
  padding: 2.25rem;
  box-shadow: var(--shadow-card);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.domain-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-focus);
}

.domain-card__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
}

.domain-card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink-primary);
  letter-spacing: -0.015em;
}

.domain-card__summary {
  font-size: 0.92rem;
  color: var(--ink-muted);
  line-height: 1.55;
  margin-bottom: 1.5rem;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-row {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem 1.15rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.skill-row:hover {
  border-color: var(--spark-blue);
  background: var(--surface);
}

.skill-row__name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--ink-primary);
  margin-bottom: 0.25rem;
}

.skill-row__note {
  font-size: 0.82rem;
  color: var(--ink-secondary);
  line-height: 1.5;
}

/* --------------------------------------------------------------------------
   ABOUT / PHILOSOPHY SECTION
   -------------------------------------------------------------------------- */
.philosophy-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow-card);
}

@media (min-width: 768px) {
  .philosophy-card {
    padding: 3.5rem;
  }
}

.philosophy-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
}

.philosophy-p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--ink-secondary);
}

.philosophy-p:first-child {
  font-size: 1.15rem;
  color: var(--ink-primary);
  font-weight: 500;
}

/* --------------------------------------------------------------------------
   SPARK CTA BANNER (Interactive Spark Section)
   -------------------------------------------------------------------------- */
.spark-banner {
  margin: 4rem 0 2rem;
  background: #090d16;
  border-radius: 36px;
  padding: 4.5rem 2rem;
  color: var(--ink-white);
  position: relative;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 24px 60px -15px rgba(9, 13, 22, 0.4);
}

@media (min-width: 768px) {
  .spark-banner {
    padding: 5.5rem 4rem;
  }
}

.spark-banner__backdrop-star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 540px;
  height: 540px;
  color: rgba(23, 135, 232, 0.05);
  pointer-events: none;
  animation: slowOrbit 45s linear infinite;
}

@keyframes slowOrbit {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.spark-banner__content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 0 auto;
}

.spark-banner__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--spark-pink);
  margin-bottom: 1.5rem;
}

.spark-banner__title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--ink-white);
  margin-bottom: 1.25rem;
}

.spark-banner__desc {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
}

.spark-banner__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spark-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.6rem;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.spark-btn--primary {
  background: var(--ink-white);
  color: var(--ink-primary);
  border: 1px solid var(--ink-white);
}

.spark-btn--primary:hover {
  background: var(--spark-blue);
  border-color: var(--spark-blue);
  color: var(--ink-white);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(23, 135, 232, 0.4);
}

.spark-btn--ghost {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink-white);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.spark-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* --------------------------------------------------------------------------
   FOOTER (Clean Multi-Column Layout)
   -------------------------------------------------------------------------- */
.site-footer {
  background: var(--canvas-bg);
  border-top: 1px solid var(--border);
  padding: 3.5rem 0 2.5rem;
  margin-top: 2rem;
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .site-footer__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
}

.footer-nav a {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-secondary);
}

.footer-nav a:hover {
  color: var(--spark-blue);
}

.footer-socials {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.footer-socials a {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-muted);
}

.footer-socials a:hover {
  color: var(--ink-primary);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: var(--ink-subtle);
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* --------------------------------------------------------------------------
   COPY TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
#copy-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: var(--ink-primary);
  color: var(--ink-white);
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius-pill);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  font-size: 0.88rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(12px) scale(0.95);
  pointer-events: none;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

#copy-toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.copy-toast__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--spark-green);
  color: var(--ink-white);
  font-size: 0.75rem;
  font-weight: 800;
}
"#
}

fn inline_js() -> &'static str {
    r#"
(function() {
  var copyBtns = document.querySelectorAll('.js-copy-email');
  var toast = document.getElementById('copy-toast');
  var toastMsg = document.getElementById('copy-toast-msg');
  var toastTimer = null;
  var email = 'default13789@gmail.com';

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      triggerToast(btn);
    } catch(err) {}
    document.body.removeChild(ta);
  }

  function triggerToast(btn) {
    if (!toast) return;
    if (toastMsg) {
      toastMsg.textContent = 'Copied coordinates: ' + email;
    }
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, 2500);

    if (btn) {
      btn.classList.add('btn--copied');
      setTimeout(function() {
        btn.classList.remove('btn--copied');
      }, 2000);
    }
  }

  copyBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      btn.style.transform = 'scale(0.96)';
      setTimeout(function() {
        btn.style.transform = '';
      }, 150);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          triggerToast(btn);
        }).catch(function() {
          fallbackCopy(email, btn);
        });
      } else {
        fallbackCopy(email, btn);
      }
    });
  });
})();
"#
}

fn render_page(data: &PortfolioData) -> Markup {
    let card_themes = ["azure", "violet", "emerald", "amber", "indigo"];

    html! {
        (DOCTYPE)
        html lang="en" {
            head {
                meta charset="UTF-8";
                meta name="viewport" content="width=device-width, initial-scale=1.0";
                meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';";
                title { (data.profile.name) " — " (data.profile.role) }
                meta name="description" content=(data.profile.headline);
                link rel="preconnect" href="https://fonts.googleapis.com";
                link rel="preconnect" href="https://fonts.gstatic.com" crossorigin;
                link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap";
                style { (PreEscaped(inline_css())) }
            }
            body {
                // Toast Notification
                div id="copy-toast" role="status" aria-live="polite" {
                    span class="copy-toast__icon" { "✓" }
                    span id="copy-toast-msg" { "Copied coordinates to clipboard" }
                }

                // Sticky Translucent Navigation
                header class="site-nav" {
                    div class="container site-nav__inner" {
                        a href="#" class="site-brand" {
                            span class="spark-star" {
                                (PreEscaped(r#"<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                            }
                            span { (data.profile.name) }
                        }

                        nav class="nav-menu" aria-label="Main Navigation" {
                            a href="#work" class="nav-link" { "Work" }
                            a href="#skills" class="nav-link" { "Capabilities" }
                            a href="#philosophy" class="nav-link" { "Philosophy" }
                            a href="#contact" class="nav-link" { "Contact" }
                        }

                        div {
                            button class="nav-cta js-copy-email" type="button" aria-label="Copy Coordinates" {
                                span { "Copy Coordinates" }
                            }
                        }
                    }
                }

                main {
                    // Hero Section (Large Display + Photo Frame)
                    section class="hero" id="top" {
                        div class="container" {
                            div class="hero__grid" {
                                div class="hero__text" {
                                    div class="hero__eyebrow" {
                                        span { "Hi, i’m " (data.profile.name) "," }
                                    }

                                    h1 class="hero__title" {
                                        (data.profile.name)
                                    }

                                    div class="hero__role-badge" {
                                        span class="beacon" {}
                                        span { (data.profile.role) }
                                    }

                                    p class="hero__lead" {
                                        @if let Some(ref lead) = data.profile.hero_lead {
                                            (lead)
                                        } @else {
                                            (data.profile.headline)
                                        }
                                    }

                                    div class="hero__actions" {
                                        a href="#work" class="btn-pill btn-pill--dark" {
                                            span { "Explore My Work" }
                                            span class="arrow-circle" {
                                                (PreEscaped(r#"<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>"#))
                                            }
                                        }

                                        button class="btn-pill btn-pill--subtle btn-pill--copy js-copy-email" type="button" aria-label="Copy email address" {
                                            span { "Copy Coordinates: " (data.contact.email) }
                                        }

                                        a href=(data.contact.github) target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill--subtle" {
                                            span { "GitHub Source ↗" }
                                        }
                                    }
                                }

                                div class="hero__visual" {
                                    div class="photo-sticker-frame" {
                                        @let avatar_src = data.profile.avatar.as_deref().unwrap_or("avatar.png");
                                        img src=(avatar_src) alt=(format!("{} — DevOps & Platform Engineer", data.profile.name)) width="340" height="340" loading="eager";

                                        div class="spark-tag-badge" {
                                            (PreEscaped(r#"<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                                            span { (data.profile.location) }
                                        }
                                    }
                                }
                            }

                            // "Now" Ledger Banner Strip
                            div class="now-strip" {
                                div class="now-strip__container" {
                                    div class="now-item" {
                                        div class="now-item__label" {
                                            span class="now-item__dot now-item__dot--blue" {}
                                            span { "Current Engineering Focus" }
                                        }
                                        p class="now-item__text" { (data.profile.now.focus) }
                                    }

                                    div class="now-item" {
                                        div class="now-item__label" {
                                            span class="now-item__dot now-item__dot--violet" {}
                                            span { "Deep-Dive Topics" }
                                        }
                                        p class="now-item__text" { (data.profile.now.reading) }
                                    }

                                    div class="now-item" {
                                        div class="now-item__label" {
                                            span class="now-item__dot now-item__dot--green" {}
                                            span { "Availability & Location" }
                                        }
                                        p class="now-item__text" { (data.profile.status) " — " (data.profile.now.location_note) }
                                    }
                                }
                            }
                        }
                    }

                    // Work / Selected Case Studies
                    section class="section" id="work" {
                        div class="container" {
                            div class="section-head" {
                                div class="section-head__meta" {
                                    span class="section-eyebrow" { "Selected Work" }
                                    h2 class="section-title" { "Work I’ve Done" }
                                    p class="section-desc" {
                                        "Real production systems where I automated server infrastructure, tuned Prometheus monitoring, fine-tuned custom AI models, or integrated autonomous triage agents."
                                    }
                                }
                                div class="section-head__action" {
                                    a href="#skills" class="btn-pill btn-pill--subtle" {
                                        span { "Explore Capabilities ↓" }
                                    }
                                }
                            }

                            div class="case-studies-grid" {
                                @for (idx, project) in data.projects.iter().enumerate() {
                                    @let theme_class = card_themes[idx % card_themes.len()];
                                    article class=(format!("work-card work-card--{}", theme_class)) id=(project.id) {
                                        div class="work-card__header" {
                                            div class="work-card__badge-cluster" {
                                                span class="card-cat-pill" { (project.category) }
                                                span class="card-status-pill" { "PROD // DEPLOYED" }
                                            }
                                            a href=(project.link) target="_blank" rel="noopener noreferrer" class="work-card__arrow-btn" aria-label=(format!("Open {}", project.title)) {
                                                (PreEscaped(r#"<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>"#))
                                            }
                                        }

                                        h3 class="work-card__title" { (project.title) }
                                        p class="work-card__lead" { (project.headline) }

                                        div class="work-card__body-grid" {
                                            div class="col-challenge" {
                                                div class="col-heading" { "The Challenge" }
                                                p class="col-text" { (project.problem) }
                                            }
                                            div class="col-solution" {
                                                div class="col-heading" { "How I Solved It" }
                                                p class="col-text" { (project.solution) }
                                            }
                                        }

                                        div class="work-card__footer" {
                                            div class="work-card__stack" {
                                                @for tag in &project.stack {
                                                    span class="stack-badge" { (tag) }
                                                }
                                            }
                                            a href=(project.link) target="_blank" rel="noopener noreferrer" class="card-action-btn" {
                                                span { (project.link_label) }
                                                (PreEscaped(r#"<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>"#))
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Capabilities / Domains Section
                    section class="section" id="skills" {
                        div class="container" {
                            div class="section-head" {
                                div class="section-head__meta" {
                                    span class="section-eyebrow" { "What I Do" }
                                    h2 class="section-title" { "Core Technical Competencies" }
                                    p class="section-desc" {
                                        "No arbitrary percentage bars or buzzword bingo. Proven operational tools, stacks, and production concepts I work with every day."
                                    }
                                }
                            }

                            div class="domains-grid" {
                                @for domain in &data.domains {
                                    div class="domain-card" {
                                        div {
                                            div class="domain-card__head" {
                                                span class="spark-star" {
                                                    (PreEscaped(r#"<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                                                }
                                                h3 class="domain-card__title" { (domain.title) }
                                            }
                                            p class="domain-card__summary" { (domain.summary) }
                                            div class="skill-list" {
                                                @for skill in &domain.skills {
                                                    div class="skill-row" {
                                                        div class="skill-row__name" { (skill.name) }
                                                        p class="skill-row__note" { (skill.note) }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Philosophy / How I Work
                    section class="section" id="philosophy" {
                        div class="container" {
                            div class="section-head" {
                                div class="section-head__meta" {
                                    span class="section-eyebrow" { "How I Work" }
                                    h2 class="section-title" { "Engineering Principles & Philosophy" }
                                }
                            }

                            div class="philosophy-card" {
                                div class="philosophy-grid" {
                                    @for paragraph in &data.profile.about {
                                        p class="philosophy-p" { (paragraph) }
                                    }
                                }
                            }
                        }
                    }

                    // Interactive "Spark" CTA Section
                    div class="container" id="contact" {
                        div class="spark-banner" {
                            div class="spark-banner__backdrop-star" {
                                (PreEscaped(r#"<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                            }

                            div class="spark-banner__content" {
                                div class="spark-banner__tag" {
                                    (PreEscaped(r#"<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                                    span { "Let’s Build Something Solid" }
                                }

                                h2 class="spark-banner__title" {
                                    "Great infrastructure starts with a spark of automation."
                                }

                                p class="spark-banner__desc" {
                                    "Whether you need Terraform server automation, Prometheus monitoring setup, custom AI model training, or an autonomous agent integrated with your Linux servers — let’s connect."
                                }

                                div class="spark-banner__actions" {
                                    a href={"mailto:" (data.contact.email)} class="spark-btn spark-btn--primary" {
                                        span { "Dispatch Email ↗" }
                                    }
                                    button class="spark-btn spark-btn--ghost js-copy-email" type="button" {
                                        span { "Copy Coordinates" }
                                    }
                                    a href=(data.contact.github) target="_blank" rel="noopener noreferrer" class="spark-btn spark-btn--ghost" {
                                        span { "GitHub ↗" }
                                    }
                                    a href=(data.contact.linkedin) target="_blank" rel="noopener noreferrer" class="spark-btn spark-btn--ghost" {
                                        span { "LinkedIn ↗" }
                                    }
                                }
                            }
                        }
                    }
                }

                // Footer
                footer class="site-footer" {
                    div class="container" {
                        div class="site-footer__inner" {
                            div class="footer-nav" {
                                a href="#" { "Home" }
                                a href="#work" { "Work" }
                                a href="#skills" { "Capabilities" }
                                a href="#philosophy" { "Philosophy" }
                                a href="#contact" { "Contact" }
                            }

                            div class="footer-socials" {
                                a href=(data.contact.github) target="_blank" rel="noopener noreferrer" { "GitHub" }
                                a href=(data.contact.linkedin) target="_blank" rel="noopener noreferrer" { "LinkedIn" }
                                a href={"mailto:" (data.contact.email)} { "Email" }
                            }
                        }

                        div class="footer-bottom" {
                            div {
                                "© 2026 " (data.profile.name) " — Bogura, Bangladesh. Designed with high-performance native architecture."
                            }
                            div {
                                "Rust + Maud Native Compiler · Zero Client Hydration · Sub-30ms FCP"
                            }
                        }
                    }
                }

                // Inlined lightweight enhancement JS
                script { (PreEscaped(inline_js())) }
            }
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("[RUST PRE-RENDERER] Determining workspace root...");
    let repo_root = if Path::new("builder").is_dir() {
        Path::new(".")
    } else if Path::new("../.git").exists() || Path::new("../CNAME").exists() {
        Path::new("..")
    } else {
        Path::new(".")
    };

    let data_path = if repo_root.join("builder/data/portfolio.json").exists() {
        repo_root.join("builder/data/portfolio.json")
    } else {
        repo_root.join("data/portfolio.json")
    };

    println!("[RUST PRE-RENDERER] Loading portfolio schema from {}...", data_path.display());
    let data_str = fs::read_to_string(&data_path)?;
    let data: PortfolioData = serde_json::from_str(&data_str)?;

    println!("[RUST PRE-RENDERER] Compiling Maud HTML tree with high-performance design system...");
    let markup = render_page(&data).into_string();

    let dist_dir = repo_root.join("dist");
    fs::create_dir_all(&dist_dir)?;

    let dist_index = dist_dir.join("index.html");
    fs::write(&dist_index, &markup)?;
    println!("[RUST PRE-RENDERER] Generated target: {}", dist_index.display());

    let root_index = repo_root.join("index.html");
    fs::write(&root_index, &markup)?;
    println!("[RUST PRE-RENDERER] Mirrored target: {}", root_index.display());

    for static_file in &["CNAME", "robots.txt", "security.txt", "avatar.png"] {
        let src = repo_root.join(static_file);
        if src.exists() {
            let dest = dist_dir.join(static_file);
            fs::copy(&src, &dest)?;
            println!("[RUST PRE-RENDERER] Mirrored static asset: {}", static_file);
        }
    }

    let byte_size = markup.len();
    println!("[RUST PRE-RENDERER] Build completed successfully.");
    println!("[TELEMETRY] Total raw HTML+CSS wire payload: {} bytes ({:.2} KB)", byte_size, byte_size as f64 / 1024.0);

    Ok(())
}
