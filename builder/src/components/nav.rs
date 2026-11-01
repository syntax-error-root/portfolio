use maud::{html, Markup, PreEscaped};
use crate::schema::Profile;

pub fn render_nav(profile: &Profile) -> Markup {
    html! {
        a href="#bento-content" class="skip-link" { "Skip to main content" }

        header class="site-nav" {
            div class="container site-nav__inner" {
                a href="#" class="site-brand" {
                    span class="spark-star" {
                        (PreEscaped(r#"<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                    }
                    span { (profile.name) }
                }

                nav class="nav-menu" aria-label="Main Navigation" {
                    a href="#work" class="nav-link" { "Systems" }
                    a href="#capabilities" class="nav-link" { "Capabilities" }
                    a href="#now" class="nav-link" { "Now" }
                    a href="#contact" class="nav-link" { "Contact" }

                    button id="theme-toggle" class="theme-toggle-btn" type="button" aria-label="Toggle Color Theme" {
                        (PreEscaped(r#"<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>"#))
                    }
                }
            }
        }
    }
}
