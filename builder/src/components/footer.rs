use maud::{html, Markup};
use crate::schema::{Contact, Profile};

pub fn render_footer(profile: &Profile, contact: &Contact) -> Markup {
    html! {
        footer class="site-footer" {
            div class="container footer-inner" {
                div {
                    "© 2026 " (profile.name) " — " (profile.location) "."
                }

                div class="footer-links" {
                    a href="#" { "Top" }
                    a href="#work" { "Systems" }
                    a href="#capabilities" { "Capabilities" }
                    a href=(contact.github) target="_blank" rel="noopener noreferrer" { "GitHub" }
                    a href=(contact.linkedin) target="_blank" rel="noopener noreferrer" { "LinkedIn" }
                    a href={"mailto:" (contact.email)} { "Email" }
                }
            }
        }
    }
}
