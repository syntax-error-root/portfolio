use maud::{html, Markup, PreEscaped};
use crate::schema::{Contact, NowSection, Profile, Project};

pub fn render_project_card(project: &Project, span_class: &str) -> Markup {
    let drawer_id = format!("drawer-{}", project.id);

    html! {
        article class=(format!("bento-tile {}", span_class)) id=(project.id) {
            div class="card-header" {
                span class="category-tag" { (project.category) }
                span class="role-tag" style="color: var(--spark-green);" { "DEPLOYED // PROD" }
            }

            h2 class="card-title" { (project.title) }
            p class="card-lead" { (project.headline) }

            @if !project.metrics.is_empty() {
                div class="metrics-row" {
                    @for metric in &project.metrics {
                        span class="metric-badge" { (metric) }
                    }
                }
            }

            div class="card-stack" {
                @for tag in &project.stack {
                    span class="tech-tag" { (tag) }
                }
            }

            div class="card-actions" {
                button class="btn-drawer-trigger js-open-drawer" type="button" data-drawer=(drawer_id) aria-label=(format!("Open architecture deep-dive for {}", project.title)) {
                    span { "Deep-Dive Architecture" }
                    (PreEscaped(r#"<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>"#))
                }

                a href=(project.link) target="_blank" rel="noopener noreferrer" class="btn-source-link" aria-label=(format!("Inspect source repository for {}", project.title)) {
                    span { "Source ↗" }
                }
            }
        }
    }
}

pub fn render_now_tile(now: &NowSection, profile: &Profile) -> Markup {
    html! {
        article class="bento-tile tile--now" id="now" {
            div class="card-header" {
                span class="category-tag" { "CURRENT TELEMETRY" }
                span class="role-tag" { "LIVE" }
            }

            h2 class="card-title" { "Now Ledger" }

            div class="now-list" {
                div class="now-entry" {
                    div class="now-entry__label" {
                        span class="now-dot" style="background: var(--spark-blue);" {}
                        span { "Engineering Focus" }
                    }
                    p class="now-entry__text" { (now.focus) }
                }

                div class="now-entry" {
                    div class="now-entry__label" {
                        span class="now-dot" style="background: var(--spark-violet);" {}
                        span { "Deep-Dive Topics" }
                    }
                    p class="now-entry__text" { (now.reading) }
                }

                div class="now-entry" {
                    div class="now-entry__label" {
                        span class="now-dot" style="background: var(--spark-green);" {}
                        span { "Status & Availability" }
                    }
                    p class="now-entry__text" { (profile.status) " — " (now.location_note) }
                }
            }
        }
    }
}

pub fn render_cta_tile(contact: &Contact) -> Markup {
    html! {
        article class="bento-tile tile--cta" id="contact" {
            div class="cta-inner" {
                div {
                    div class="hero__eyebrow" {
                        span class="spark-star" {
                            (PreEscaped(r#"<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                        }
                        span class="category-tag" { "CONNECT" }
                    }
                    h2 class="cta-title" { "Great infrastructure starts with automated precision." }
                    p class="cta-desc" {
                        "Available for Remote DevOps Roles, Terraform automation stacks, Prometheus monitoring pipelines, and production AI agent integrations."
                    }
                }

                div class="cta-actions" {
                    a href={"mailto:" (contact.email)} class="btn-pill btn-pill--dark" {
                        span { "Dispatch Email ↗" }
                    }
                    button class="btn-pill btn-pill--subtle js-copy-email" type="button" {
                        span { "Copy Email" }
                    }
                    a href=(contact.github) target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill--subtle" {
                        span { "GitHub ↗" }
                    }
                    a href=(contact.linkedin) target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill--subtle" {
                        span { "LinkedIn ↗" }
                    }
                }
            }
        }
    }
}
