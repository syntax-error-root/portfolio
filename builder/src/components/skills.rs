use maud::{html, Markup, PreEscaped};
use crate::schema::Domain;

pub fn render_skills_tile(domains: &[Domain]) -> Markup {
    html! {
        article class="bento-tile tile--skills" id="capabilities" {
            div class="card-header" {
                span class="category-tag" { "TECHNICAL COMPETENCIES" }
                span class="role-tag" { "VERIFIED IN PROD" }
            }

            h2 class="card-title" { "Capabilities Matrix" }
            p class="card-lead" {
                "Engineered without arbitrary skill percentage bars or vendor buzzwords. Tested operational tools, Linux kernel interfaces, and production automation frameworks."
            }

            div class="skills-domains" {
                @for domain in domains {
                    div class="skill-domain" {
                        h3 class="skill-domain__title" {
                            span class="spark-star" {
                                (PreEscaped(r#"<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"/></svg>"#))
                            }
                            span { (domain.title) }
                        }
                        div class="skill-items-list" {
                            @for skill in &domain.skills {
                                div class="skill-item" {
                                    div class="skill-item__name" { (skill.name) }
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
