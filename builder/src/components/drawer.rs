use maud::{html, Markup, PreEscaped};
use crate::schema::Project;

pub fn render_drawer(project: &Project) -> Markup {
    let drawer_id = format!("drawer-{}", project.id);

    html! {
        dialog id=(drawer_id) class="project-drawer" aria-labelledby=(format!("title-{}", project.id)) {
            div class="drawer-header" {
                div {
                    div class="category-tag" { (project.category) }
                    h2 id=(format!("title-{}", project.id)) class="drawer-title" style="margin-top: 0.5rem;" {
                        (project.title)
                    }
                }
                button class="drawer-close" type="button" aria-label="Close dialog window" {
                    (PreEscaped(r#"<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>"#))
                }
            }

            @if !project.metrics.is_empty() {
                div class="drawer-section" {
                    div class="drawer-section__label" { "Operational Metrics & Benchmarks" }
                    div class="metrics-row" {
                        @for metric in &project.metrics {
                            span class="metric-badge" { (metric) }
                        }
                    }
                }
            }

            @if let Some(ref arch) = project.architecture_summary {
                div class="drawer-section" {
                    div class="drawer-section__label" { "Architecture Overview" }
                    p class="drawer-text" { (arch) }
                }
            }

            div class="drawer-section" {
                div class="drawer-section__label" { "The Challenge & Failure Domain" }
                p class="drawer-text" { (project.problem) }
            }

            div class="drawer-section" {
                div class="drawer-section__label" { "System Engineering Solution" }
                p class="drawer-text" { (project.solution) }
            }

            @if let Some(ref trade_off) = project.trade_offs {
                div class="drawer-section" {
                    div class="drawer-section__label" { "Engineering Trade-Offs & Rationale" }
                    p class="drawer-text" { (trade_off) }
                }
            }

            div class="drawer-section" {
                div class="drawer-section__label" { "Technology Stack" }
                div class="card-stack" {
                    @for tag in &project.stack {
                        span class="tech-tag" { (tag) }
                    }
                }
            }

            div class="card-actions" style="margin-top: 1.5rem;" {
                a href=(project.link) target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill--dark" {
                    span { (project.link_label) }
                    (PreEscaped(r#"<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>"#))
                }
            }
        }
    }
}
