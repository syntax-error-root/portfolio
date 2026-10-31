use maud::{html, Markup, DOCTYPE};
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
:root {
  --bg: #080b11;
  --bg-surface: #0e131d;
  --bg-subtle: #141b29;
  --border: #1e2638;
  --border-focus: #384661;
  --border-avatar: rgba(56, 189, 248, 0.25);
  --text: #f1f5f9;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --accent: #10b981;
  --accent-soft: rgba(16, 185, 129, 0.12);
  --amber: #f59e0b;
  --amber-soft: rgba(245, 158, 11, 0.12);
  --cyan: #38bdf8;
  --cyan-soft: rgba(56, 189, 248, 0.12);
  --font-sans: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
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
  background-color: var(--bg);
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.container {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

/* HEADER */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(8, 11, 17, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.25rem;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand__tag {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-dim);
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 0.28rem 0.65rem;
  border-radius: 4px;
}

.live-badge__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.live-badge__clock {
  color: var(--text);
  font-weight: 600;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .nav-links {
    display: none;
  }
}

.nav-links a {
  color: var(--text-muted);
  font-weight: 500;
}

.nav-links a:hover {
  color: var(--text);
}

/* BUTTONS */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--font-mono);
  transition: all 0.15s ease;
  cursor: pointer;
  text-decoration: none;
  line-height: 1.4;
}

.btn--primary {
  background: var(--text);
  color: #04070a;
  border: 1px solid var(--text);
}

.btn--primary:hover {
  background: #ffffff;
  box-shadow: 0 2px 14px rgba(255, 255, 255, 0.15);
}

.btn--outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.btn--outline:hover {
  background: var(--bg-surface);
  border-color: var(--border-focus);
}

.btn--copy {
  background: var(--bg-surface);
  color: var(--text-muted);
  border: 1px solid var(--border);
  font-size: 0.8rem;
}

.btn--copy:hover {
  color: var(--text);
  border-color: var(--border-focus);
}

.btn--copied {
  border-color: var(--accent) !important;
  color: var(--accent) !important;
}

/* HERO */
.hero {
  padding: 3rem 0 2.5rem;
}

@media (min-width: 768px) {
  .hero {
    padding: 4.5rem 0 3.5rem;
  }
}

.hero__layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .hero__layout {
    display: grid;
    grid-template-columns: 140px 1fr;
    column-gap: 2.5rem;
    align-items: start;
  }
}

@media (min-width: 1024px) {
  .hero__layout {
    grid-template-columns: 152px 1fr;
    column-gap: 3rem;
  }
}

.hero__avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

@media (min-width: 768px) {
  .hero__avatar-col {
    align-items: flex-start;
  }
}

.avatar-frame {
  position: relative;
  width: 124px;
  height: 124px;
  border-radius: 20px;
  padding: 2.5px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(30, 38, 56, 0.85) 50%, rgba(16, 185, 129, 0.35) 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.12), 0 8px 24px -4px rgba(0, 0, 0, 0.65), 0 0 24px -4px rgba(56, 189, 248, 0.18);
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

@media (min-width: 768px) {
  .avatar-frame {
    width: 136px;
    height: 136px;
    border-radius: 22px;
  }
}

.avatar-frame:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.35), 0 12px 30px -4px rgba(0, 0, 0, 0.75), 0 0 30px -2px rgba(56, 189, 248, 0.28);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 17px;
  overflow: hidden;
  background: var(--bg-surface);
  position: relative;
}

@media (min-width: 768px) {
  .avatar-inner {
    border-radius: 19px;
  }
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--bg-surface);
  border: 1px solid rgba(16, 185, 129, 0.35);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}

.avatar-status__ping {
  position: relative;
  display: flex;
  width: 7px;
  height: 7px;
}

.avatar-status__ping-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--accent);
  opacity: 0.75;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.avatar-status__ping-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--accent);
}

@keyframes ping {
  75%, 100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

.hero__content {
  display: flex;
  flex-direction: column;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--amber);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
}

.hero__eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--amber);
  box-shadow: 0 0 6px var(--amber);
}

.hero__title {
  font-size: clamp(1.85rem, 4vw, 3.1rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;
  max-width: 860px;
}

.hero__lead {
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--text-muted);
  max-width: 780px;
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.875rem;
}

/* NOW SECTION */
.now-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 2.5rem 0 4rem;
}

@media (min-width: 768px) {
  .now-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.now-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.25rem;
}

.now-card__lbl {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
}

.now-card__text {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* SECTIONS */
.section {
  padding: 4.5rem 0;
  border-top: 1px solid var(--border);
}

.section__head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.75rem;
}

.section__tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.section__h2 {
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.section__desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 640px;
}

/* CASE STUDIES / PROJECTS */
.case-studies {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.case-study {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.case-study:hover {
  border-color: var(--border-focus);
  background: var(--bg-subtle);
}

.case-study__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.case-study__cat {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  background: var(--cyan-soft);
  color: var(--cyan);
  border: 1px solid rgba(56, 189, 248, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.case-study__title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
}

.case-study__lead {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.case-study__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .case-study__body {
    grid-template-columns: 1fr 1.3fr;
  }
}

.case-study__col-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.4rem;
}

.case-study__col-p {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.case-study__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.case-study__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent);
}

.case-study__link:hover {
  text-decoration: underline;
}

/* DOMAINS & SKILLS */
.domains-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .domains-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.domain-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.domain-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.domain-card__summary {
  font-size: 0.825rem;
  color: var(--text-dim);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border);
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.skill-item__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.skill-item__note {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.45;
  margin-top: 0.15rem;
}

/* ABOUT NARRATIVE */
.about-narrative {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.about-narrative strong {
  color: var(--text);
  font-weight: 600;
}

/* CONTACT */
.contact-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .contact-panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.contact-panel__info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.contact-panel__info p {
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 520px;
}

.contact-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* FOOTER */
.site-footer {
  padding: 2.5rem 0;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
}

.site-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

/* TOAST FEEDBACK */
#copy-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  transform: translateY(120%);
  opacity: 0;
  visibility: hidden;
  background: var(--bg-surface);
  color: var(--text);
  border: 1px solid var(--accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(16, 185, 129, 0.25);
  z-index: 100;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease, visibility 0.22s;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  pointer-events: none;
}

#copy-toast.show {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.copy-toast__icon {
  color: var(--accent);
  font-weight: 700;
}
"#
}

fn inline_js() -> &'static str {
    r#"
(function() {
  // Copy Email interaction with tactile toast
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
      toastMsg.textContent = 'Copied ' + email;
    }
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, 2400);

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
      btn.style.transform = 'scale(0.97)';
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
    html! {
        (DOCTYPE)
        html lang="en" {
            head {
                meta charset="UTF-8";
                meta name="viewport" content="width=device-width, initial-scale=1.0";
                meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';";
                title { (data.profile.name) " — " (data.profile.role) }
                meta name="description" content=(data.profile.headline);
                link rel="preconnect" href="https://fonts.googleapis.com";
                link rel="preconnect" href="https://fonts.gstatic.com" crossorigin;
                link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
                style { (maud::PreEscaped(inline_css())) }
            }
            body {
                div id="copy-toast" role="status" aria-live="polite" {
                    span class="copy-toast__icon" { "✓" }
                    span id="copy-toast-msg" { "Copied email address to clipboard" }
                }

                // Header
                header class="site-header" {
                    div class="container site-header__inner" {
                        div class="brand" {
                            a href="#" { (data.profile.name) }
                        }

                        nav class="nav-links" aria-label="Main Navigation" {
                            a href="#projects" { "Work" }
                            a href="#skills" { "Capabilities" }
                            a href="#about" { "Philosophy" }
                            a href="#contact" { "Contact" }
                        }
                    }
                }

                main {
                    // Hero Section
                    section class="hero" id="top" {
                        div class="container" {
                            div class="hero__layout" {
                                div class="hero__avatar-col" {
                                    div class="avatar-frame" {
                                        div class="avatar-inner" {
                                            @let avatar_src = data.profile.avatar.as_deref().unwrap_or("avatar.png");
                                            img src=(avatar_src) alt="Omik — DevOps Engineer" width="136" height="136" loading="eager" class="avatar-img";
                                        }
                                    }
                                    div class="avatar-status" title="Active Platform Engineer" {
                                        span class="avatar-status__ping" {
                                            span class="avatar-status__ping-ring" {}
                                            span class="avatar-status__ping-dot" {}
                                        }
                                        span { "ONLINE / ACTIVE" }
                                    }
                                }

                                div class="hero__content" {
                                    div class="hero__eyebrow" {
                                        span class="hero__eyebrow-dot" {}
                                        "SYS::ACTIVE // " (data.profile.role)
                                    }
                                    h1 class="hero__title" {
                                        (data.profile.headline)
                                    }
                                    p class="hero__lead" {
                                        (data.profile.about[0]) " " (data.profile.about[1])
                                    }
                                    div class="hero__actions" {
                                        a href="#projects" class="btn btn--primary" {
                                            "Inspect Work & Architecture ↓"
                                        }
                                        button class="btn btn--copy js-copy-email" type="button" aria-label="Copy email address" {
                                            "Copy Coordinates: " (data.contact.email)
                                        }
                                        a href=(data.contact.github) target="_blank" rel="noopener noreferrer" class="btn btn--outline" {
                                            "GitHub Source ↗"
                                        }
                                    }
                                }
                            }

                            // Human "Now" Ledger (Current Focus, Reading, Coordinates)
                            div class="now-grid" {
                                div class="now-card" {
                                    div class="now-card__lbl" { "Current Engineering Focus" }
                                    p class="now-card__text" { (data.profile.now.focus) }
                                }
                                div class="now-card" {
                                    div class="now-card__lbl" { "Deep-Dive Topics" }
                                    p class="now-card__text" { (data.profile.now.reading) }
                                }
                                div class="now-card" {
                                    div class="now-card__lbl" { "Availability & Location" }
                                    p class="now-card__text" { (data.profile.status) " — " (data.profile.now.location_note) }
                                }
                            }
                        }
                    }

                    // Projects / Engineering Case Studies
                    section class="section" id="projects" {
                        div class="container" {
                            div class="section__head" {
                                span class="section__tag" { "Selected Work" }
                                h2 class="section__h2" { "Production Systems & Field Notes" }
                                p class="section__desc" {
                                    "Real projects where I automated server infrastructure, tuned Prometheus monitoring, fine-tuned custom AI models, or integrated autonomous agents."
                                }
                            }

                            div class="case-studies" {
                                @for project in &data.projects {
                                    article class="case-study" id=(project.id) {
                                        div class="case-study__meta" {
                                            span class="case-study__cat" { (project.category) }
                                            span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-dim);" {
                                                "PROD // DEPLOYED"
                                            }
                                        }
                                        h3 class="case-study__title" { (project.title) }
                                        p class="case-study__lead" { (project.headline) }

                                        div class="case-study__body" {
                                            div {
                                                div class="case-study__col-title" { "The Challenge" }
                                                p class="case-study__col-p" { (project.problem) }
                                            }
                                            div {
                                                div class="case-study__col-title" { "How I Solved It" }
                                                p class="case-study__col-p" { (project.solution) }
                                            }
                                        }

                                        div class="case-study__footer" {
                                            div class="pills" {
                                                @for tag in &project.stack {
                                                    span class="pill" { (tag) }
                                                }
                                            }
                                            a href=(project.link) target="_blank" rel="noopener noreferrer" class="case-study__link" {
                                                (project.link_label) " ↗"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Skills / Domains Matrix (No fake 85% bars!)
                    section class="section" id="skills" {
                        div class="container" {
                            div class="section__head" {
                                span class="section__tag" { "What I Do" }
                                h2 class="section__h2" { "Core Technical Competencies" }
                                p class="section__desc" {
                                    "No arbitrary percentage bars or buzzword bingo. Just the tools, stacks, and production concepts I work with every day."
                                }
                            }

                            div class="domains-grid" {
                                @for domain in &data.domains {
                                    div class="domain-card" {
                                        div {
                                            h3 class="domain-card__title" { (domain.title) }
                                            p class="domain-card__summary" { (domain.summary) }
                                            div class="skill-items" {
                                                @for skill in &domain.skills {
                                                    div class="skill-item" {
                                                        div class="skill-item__head" {
                                                            span { (skill.name) }
                                                        }
                                                        p class="skill-item__note" { (skill.note) }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Architecture & Philosophy Note
                    section class="section" id="about" {
                        div class="container" {
                            div class="section__head" {
                                span class="section__tag" { "How I Work" }
                                h2 class="section__h2" { "Engineering Principles & Philosophy" }
                            }
                            div class="about-narrative" {
                                @for paragraph in &data.profile.about {
                                    p { (paragraph) }
                                }
                            }
                        }
                    }

                    // Contact Panel
                    section class="section" id="contact" {
                        div class="container" {
                            div class="contact-panel" {
                                div class="contact-panel__info" {
                                    h3 { "Let's build something solid together." }
                                    p {
                                        "Whether you need Terraform server automation, Prometheus monitoring setup, custom AI model training, or an autonomous agent integrated with your Linux servers — feel free to drop me a line."
                                    }
                                }
                                div class="contact-panel__actions" {
                                    a href={"mailto:" (data.contact.email)} class="btn btn--primary" {
                                        "Dispatch Email ↗"
                                    }
                                    button class="btn btn--copy js-copy-email" type="button" {
                                        "Copy Address"
                                    }
                                    a href=(data.contact.github) target="_blank" rel="noopener noreferrer" class="btn btn--outline" {
                                        "GitHub ↗"
                                    }
                                    a href=(data.contact.linkedin) target="_blank" rel="noopener noreferrer" class="btn btn--outline" {
                                        "LinkedIn ↗"
                                    }
                                }
                            }
                        }
                    }
                }

                // Footer
                footer class="site-footer" {
                    div class="container site-footer__inner" {
                        div {
                            "© 2026 " (data.profile.name) " — Bogura, Bangladesh"
                        }
                        div {
                            "Rust + Maud Native Compiler · Zero Client Hydration · Sub-30ms FCP"
                        }
                    }
                }

                // Inlined lightweight enhancement JS
                script { (maud::PreEscaped(inline_js())) }
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

    println!("[RUST PRE-RENDERER] Compiling Maud HTML tree...");
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
