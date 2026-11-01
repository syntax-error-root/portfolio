use maud::{html, Markup, PreEscaped};
use crate::schema::{Contact, Profile};

pub fn render_hero(profile: &Profile, contact: &Contact) -> Markup {
    let avatar_src = profile.avatar.as_deref().unwrap_or("avatar.png");
    let lead_text = profile.hero_lead.as_deref().unwrap_or(&profile.headline);

    html! {
        // Hero Information Tile
        article class="bento-tile tile--hero" id="overview" {
            div {
                h1 class="hero__name" {
                    (profile.name)
                }

                p class="hero__lead" {
                    (lead_text)
                }
            }

            div class="hero__actions" {
                a href="#work" class="btn-pill btn-pill--dark" {
                    span { "Explore Systems" }
                    (PreEscaped(r#"<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>"#))
                }

                button class="btn-pill btn-pill--subtle js-copy-email" type="button" aria-label="Copy direct contact email" {
                    (PreEscaped(r#"<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>"#))
                    span { "Copy Email" }
                }

                a href=(contact.github) target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill--subtle" {
                    span { "GitHub Source ↗" }
                }
            }
        }

        // Visual Identity Tile
        article class="bento-tile tile--visual" {
            div {
                div class="photo-avatar" {
                    img src=(avatar_src) alt=(format!("{} — {}", profile.name, profile.role)) width="220" height="220" loading="eager";
                }

                div class="location-badge" {
                    (PreEscaped(r#"<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>"#))
                    span { (profile.location) " (" (profile.utc_offset) ")" }
                }
            }
        }
    }
}
