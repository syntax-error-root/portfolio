use maud::{html, Markup, PreEscaped, DOCTYPE};
use crate::components::{bento, drawer, footer, hero, nav, skills};
use crate::schema::PortfolioData;
use crate::{scripts, tokens};

pub fn render_page(data: &PortfolioData) -> Markup {
    let span_classes = [
        "tile--case-primary",
        "tile--case-secondary",
        "tile--case-tertiary",
        "tile--case-quaternary",
        "tile--case-quinary",
    ];

    html! {
        (DOCTYPE)
        html lang="en" {
            head {
                meta charset="UTF-8";
                meta name="viewport" content="width=device-width, initial-scale=1.0";
                meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';";
                title { (data.profile.name) " — " (data.profile.role) }
                meta name="description" content=(data.profile.headline);
                meta name="author" content=(data.profile.name);
                meta name="theme-color" content="#090d16";

                link rel="canonical" href="https://omik.pro.bd/";
                link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230284c7'><path d='M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z'/></svg>";

                // OpenGraph Social Metadata
                meta property="og:title" content=(format!("{} — {}", data.profile.name, data.profile.role));
                meta property="og:description" content=(data.profile.headline);
                meta property="og:type" content="website";
                meta property="og:url" content="https://omik.pro.bd/";
                meta property="og:image" content="https://omik.pro.bd/avatar.png";

                // Twitter Card Metadata
                meta name="twitter:card" content="summary_large_image";
                meta name="twitter:title" content=(format!("{} — {}", data.profile.name, data.profile.role));
                meta name="twitter:description" content=(data.profile.headline);
                meta name="twitter:image" content="https://omik.pro.bd/avatar.png";

                // Typography Preconnect
                link rel="preconnect" href="https://fonts.googleapis.com";
                link rel="preconnect" href="https://fonts.gstatic.com" crossorigin;
                link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap";

                // Inlined High-Performance Design Tokens & Styles
                style { (PreEscaped(tokens::css_bundle())) }
            }

            body {
                // Toast Notification
                div id="copy-toast" role="status" aria-live="polite" {
                    span class="spark-star" { "✓" }
                    span id="copy-toast-msg" { "Copied to clipboard" }
                }

                // Sticky Navigation
                (nav::render_nav(&data.profile))

                // Bento Grid Showcase Content
                main id="bento-content" class="bento-section" {
                    div class="container" {
                        div class="bento-grid" {
                            // Row 1: Hero Tile (2 col) + Avatar (1 col)
                            (hero::render_hero(&data.profile, &data.contact))

                            // Row 2: Featured Project 1 & 2
                            @if let Some(p0) = data.projects.get(0) {
                                (bento::render_project_card(p0, span_classes[0]))
                            }
                            @if let Some(p1) = data.projects.get(1) {
                                (bento::render_project_card(p1, span_classes[1]))
                            }

                            // Row 3: Capabilities (2 col) + Now Ledger (1 col)
                            (skills::render_skills_tile(&data.domains))
                            (bento::render_now_tile(&data.profile.now, &data.profile))

                            // Row 4+: Remaining Projects
                            @for (idx, project) in data.projects.iter().enumerate().skip(2) {
                                @let span = span_classes[idx % span_classes.len()];
                                (bento::render_project_card(project, span))
                            }

                            // Final Row: Interactive CTA Banner (full width 3 cols)
                            (bento::render_cta_tile(&data.contact))
                        }
                    }
                }

                // Native Modal Drawers
                @for project in &data.projects {
                    (drawer::render_drawer(project))
                }

                // Semantic Footer
                (footer::render_footer(&data.profile, &data.contact))

                // Inlined Minimal Client Script
                script { (PreEscaped(scripts::client_script(&data.contact.email))) }
            }
        }
    }
}
