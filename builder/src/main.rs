use maud::{html, Markup, DOCTYPE};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
struct StatItem {
    label: String,
    value: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Profile {
    name: String,
    handle: String,
    role: String,
    tagline: String,
    location: String,
    availability: String,
    bio: String,
    stats: Vec<StatItem>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Project {
    title: String,
    badge: String,
    description: String,
    tags: Vec<String>,
    link: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SkillItem {
    name: String,
    level: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SkillCategory {
    name: String,
    skills: Vec<SkillItem>,
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
    projects: Vec<Project>,
    skill_categories: Vec<SkillCategory>,
    contact: Contact,
}

fn inline_css() -> &'static str {
    r#"
:root{--bg:#06090e;--bg-card:#0c121d;--bg-card-hover:#111927;--border:#1b2537;--border-bright:#2a3a55;--text:#f1f5f9;--text-muted:#8b9bb4;--accent:#22c55e;--accent-glow:rgba(34,197,94,0.15);--cyan:#38bdf8;--font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Inter",sans-serif;--font-mono:ui-monospace,"JetBrains Mono","SF Mono",Menlo,monospace}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;background:var(--bg);color:var(--text);font-family:var(--font-sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;display:flex;flex-direction:column;overflow-x:hidden}
a{color:inherit;text-decoration:none;transition:color .2s ease}
.container{width:100%;max-width:1120px;margin:0 auto;padding:0 1.5rem}
.header{position:sticky;top:0;z-index:50;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);background:rgba(6,9,14,0.85);border-bottom:1px solid var(--border)}
.header__inner{display:flex;align-items:center;justify-content:space-between;height:4.25rem}
.logo{font-family:var(--font-mono);font-size:1.15rem;font-weight:700;color:var(--text);letter-spacing:-.02em}
.logo span{color:var(--accent)}
.nav{display:flex;align-items:center;gap:2rem}
.nav a{font-size:.9rem;color:var(--text-muted);font-weight:500}
.nav a:hover{color:var(--text)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.55rem 1.25rem;border-radius:6px;font-size:.875rem;font-weight:600;transition:all .2s ease;cursor:pointer}
.btn--primary{background:var(--accent);color:#04070a;border:1px solid var(--accent)}
.btn--primary:hover{background:#16a34a;box-shadow:0 0 16px var(--accent-glow)}
.btn--outline{background:transparent;color:var(--text);border:1px solid var(--border-bright)}
.btn--outline:hover{background:var(--bg-card);border-color:var(--cyan);color:var(--cyan)}
.badge{display:inline-flex;align-items:center;gap:.5rem;padding:.25rem .75rem;border-radius:9999px;font-family:var(--font-mono);font-size:.75rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
.badge--pulse{background:rgba(34,197,94,0.1);color:var(--accent);border:1px solid rgba(34,197,94,0.3)}
.badge--pulse::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
.hero{padding:5rem 0 3.5rem}
.hero__grid{display:grid;grid-template-columns:1fr;gap:2.5rem}
@media(min-width:768px){.hero__grid{grid-template-columns:1.2fr .8fr;align-items:center}}
.hero__title{font-size:clamp(2.25rem,5vw,3.75rem);font-weight:800;line-height:1.15;letter-spacing:-.03em;margin:1rem 0}
.hero__role{font-family:var(--font-mono);color:var(--cyan);font-size:1.1rem;font-weight:600}
.hero__desc{font-size:1.1rem;color:var(--text-muted);max-width:580px;margin-bottom:2rem}
.hero__actions{display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem}
.telemetry-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:1.5rem}
.telemetry-card__header{display:flex;align-items:center;justify-content:space-between;padding-bottom:.75rem;border-bottom:1px solid var(--border);margin-bottom:1rem;font-family:var(--font-mono);font-size:.75rem;color:var(--text-muted)}
.telemetry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
.telemetry-item__val{font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--text)}
.telemetry-item__lbl{font-size:.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em}
.section{padding:4.5rem 0;border-top:1px solid var(--border)}
.section__header{margin-bottom:3rem}
.section__eyebrow{font-family:var(--font-mono);font-size:.8rem;color:var(--accent);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem}
.section__title{font-size:2rem;font-weight:700;letter-spacing:-.02em}
.projects-grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
@media(min-width:768px){.projects-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.projects-grid{grid-template-columns:repeat(3,1fr)}}
.project-card{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;transition:all .2s ease}
.project-card:hover{border-color:var(--border-bright);background:var(--bg-card-hover);transform:translateY(-2px)}
.project-card__top{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem}
.project-card__badge{font-family:var(--font-mono);font-size:.7rem;padding:.2rem .5rem;border-radius:4px;background:rgba(56,189,248,0.1);color:var(--cyan);border:1px solid rgba(56,189,248,0.2)}
.project-card__title{font-size:1.2rem;font-weight:700;margin-bottom:.75rem}
.project-card__desc{font-size:.9rem;color:var(--text-muted);margin-bottom:1.25rem;line-height:1.55;flex-grow:1}
.project-card__tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem}
.tag{font-family:var(--font-mono);font-size:.75rem;color:#94a3b8;background:#06090e;padding:.2rem .55rem;border-radius:4px;border:1px solid var(--border)}
.project-card__link{display:inline-flex;align-items:center;gap:.4rem;font-size:.85rem;font-weight:600;color:var(--accent)}
.project-card__link:hover{text-decoration:underline}
.skills-grid{display:grid;grid-template-columns:1fr;gap:1.75rem}
@media(min-width:768px){.skills-grid{grid-template-columns:repeat(3,1fr)}}
.skill-box{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:1.5rem}
.skill-box__title{font-size:1.05rem;font-weight:700;margin-bottom:1.25rem;color:var(--text);border-bottom:1px solid var(--border);padding-bottom:.5rem}
.skill-list{display:flex;flex-direction:column;gap:.9rem}
.skill-row{display:flex;justify-content:space-between;font-size:.875rem}
.skill-bar{height:4px;width:100%;background:#06090e;border-radius:2px;overflow:hidden;margin-top:.35rem}
.skill-bar__fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--accent))}
.contact-box{background:linear-gradient(180deg,var(--bg-card) 0%,rgba(12,18,29,0.5) 100%);border:1px solid var(--border);border-radius:12px;padding:3rem 2rem;text-align:center}
.contact-box h2{font-size:2.25rem;margin-bottom:1rem;font-weight:800}
.contact-box p{color:var(--text-muted);max-width:540px;margin:0 auto 2rem;font-size:1.05rem}
.contact-actions{display:flex;justify-content:center;flex-wrap:wrap;gap:1rem}
.footer{padding:2.5rem 0;border-top:1px solid var(--border);font-size:.85rem;color:var(--text-muted)}
.footer__inner{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.mobile-btn{display:none;background:none;border:none;color:var(--text);cursor:pointer;padding:.5rem}
@media(max-width:767px){.nav{display:none}.mobile-btn{display:block}}
"#
}

fn inline_js() -> &'static str {
    r#"
(function(){
  document.querySelectorAll('[data-b64-email]').forEach(function(el){
    var decoded = atob(el.getAttribute('data-b64-email'));
    el.setAttribute('href', 'mailto:' + decoded);
    el.removeAttribute('data-b64-email');
  });
})();
"#
}

fn render_page(data: &PortfolioData) -> Markup {
    let email_b64 = "ZGVmYXVsdDEzNzg5QGdtYWlsLmNvbQ=="; // default13789@gmail.com

    html! {
        (DOCTYPE)
        html lang="en" {
            head {
                meta charset="UTF-8";
                meta name="viewport" content="width=device-width, initial-scale=1.0";
                meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';";
                title { (data.profile.name) " — " (data.profile.role) }
                meta name="description" content=(data.profile.tagline);
                link rel="preconnect" href="https://fonts.googleapis.com";
                link rel="preconnect" href="https://fonts.gstatic.com" crossorigin;
                link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
                style { (inline_css()) }
            }
            body {
                // Header
                header class="header" {
                    div class="container header__inner" {
                        a href="#" class="logo" {
                            span { "<" }
                            (data.profile.name.to_lowercase())
                            span { "/>" }
                        }
                        nav class="nav" aria-label="Main Navigation" {
                            a href="#about" { "About" }
                            a href="#projects" { "Projects" }
                            a href="#skills" { "Skills" }
                            a href="#contact" { "Contact" }
                        }
                        div {
                            a href="#" class="btn btn--primary" data-b64-email=(email_b64) {
                                "Get in Touch"
                            }
                        }
                    }
                }

                main {
                    // Hero Section
                    section class="hero" id="hero" {
                        div class="container hero__grid" {
                            div {
                                div class="badge badge--pulse" {
                                    (data.profile.availability)
                                }
                                h1 class="hero__title" {
                                    (data.profile.name)
                                }
                                div class="hero__role" {
                                    (data.profile.role)
                                }
                                p class="hero__desc" {
                                    (data.profile.tagline)
                                }
                                div class="hero__actions" {
                                    a href="#projects" class="btn btn--primary" {
                                        "Explore Deployments"
                                    }
                                    a href=(data.contact.github) target="_blank" rel="noopener noreferrer" class="btn btn--outline" {
                                        "GitHub Source"
                                    }
                                }
                            }
                            // Telemetry Box
                            div class="telemetry-card" {
                                div class="telemetry-card__header" {
                                    span { "RUNTIME STATUS // TELEMETRY" }
                                    span style="color:var(--accent)" { "ONLINE" }
                                }
                                div class="telemetry-grid" {
                                    @for stat in &data.profile.stats {
                                        div class="telemetry-item" {
                                            div class="telemetry-item__val" { (stat.value) }
                                            div class="telemetry-item__lbl" { (stat.label) }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // About Section
                    section class="section" id="about" {
                        div class="container" {
                            div class="section__header" {
                                div class="section__eyebrow" { "ENGINEERING MINDSET" }
                                h2 class="section__title" { "Architectural Philosophy" }
                            }
                            p style="max-width:760px;color:var(--text-muted);font-size:1.1rem;line-height:1.7;" {
                                (data.profile.bio)
                            }
                        }
                    }

                    // Projects Section
                    section class="section" id="projects" {
                        div class="container" {
                            div class="section__header" {
                                div class="section__eyebrow" { "DEPLOYED WORK" }
                                h2 class="section__title" { "Featured Projects & Architecture" }
                            }
                            div class="projects-grid" {
                                @for project in &data.projects {
                                    article class="project-card" {
                                        div {
                                            div class="project-card__top" {
                                                span class="project-card__badge" { (project.badge) }
                                            }
                                            h3 class="project-card__title" { (project.title) }
                                            p class="project-card__desc" { (project.description) }
                                        }
                                        div {
                                            div class="project-card__tags" {
                                                @for tag in &project.tags {
                                                    span class="tag" { (tag) }
                                                }
                                            }
                                            a href=(project.link) target="_blank" rel="noopener noreferrer" class="project-card__link" {
                                                "Inspect Architecture →"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Skills Section
                    section class="section" id="skills" {
                        div class="container" {
                            div class="section__header" {
                                div class="section__eyebrow" { "COMPETENCY MATRIX" }
                                h2 class="section__title" { "Technical Stack & Infrastructure" }
                            }
                            div class="skills-grid" {
                                @for category in &data.skill_categories {
                                    div class="skill-box" {
                                        h4 class="skill-box__title" { (category.name) }
                                        div class="skill-list" {
                                            @for skill in &category.skills {
                                                div {
                                                    div class="skill-row" {
                                                        span { (skill.name) }
                                                        span style="font-family:var(--font-mono);color:var(--accent)" { (skill.level) }
                                                    }
                                                    div class="skill-bar" {
                                                        div class="skill-bar__fill" style={"width:" (skill.level)} {}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Contact CTA
                    section class="section" id="contact" {
                        div class="container" {
                            div class="contact-box" {
                                h2 { "Initiate Secure Communication" }
                                p {
                                    "Ready to engineer scalable platforms, optimize cold-start bottlenecks, or deploy automated infrastructure."
                                }
                                div class="contact-actions" {
                                    a href="#" class="btn btn--primary" data-b64-email=(email_b64) {
                                        "Dispatch Email"
                                    }
                                    a href=(data.contact.github) target="_blank" rel="noopener noreferrer" class="btn btn--outline" {
                                        "Review GitHub"
                                    }
                                    a href=(data.contact.linkedin) target="_blank" rel="noopener noreferrer" class="btn btn--outline" {
                                        "Connect on LinkedIn"
                                    }
                                }
                            }
                        }
                    }
                }

                // Footer
                footer class="footer" {
                    div class="container footer__inner" {
                        p { "© 2026 " (data.profile.name) " — Bogura, Bangladesh 🇧🇩" }
                        p style="font-family:var(--font-mono);font-size:.75rem;" {
                            "Built with Rust & Maud · Zero-JS Initial Render"
                        }
                    }
                }

                // Inlined lightweight enhancement JS
                script { (inline_js()) }
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

    // Also mirror to repo root index.html for instant static local preview
    let root_index = repo_root.join("index.html");
    fs::write(&root_index, &markup)?;
    println!("[RUST PRE-RENDERER] Mirrored target: {}", root_index.display());

    // Copy static root files if present
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
