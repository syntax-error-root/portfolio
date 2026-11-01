use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NowSection {
    pub focus: String,
    pub reading: String,
    pub location_note: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Profile {
    pub name: String,
    pub handle: String,
    pub role: String,
    pub headline: String,
    #[serde(default)]
    pub avatar: Option<String>,
    #[serde(default)]
    pub hero_lead: Option<String>,
    pub location: String,
    pub timezone: String,
    pub utc_offset: String,
    pub status: String,
    pub about: Vec<String>,
    pub now: NowSection,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillItem {
    pub name: String,
    pub note: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Domain {
    pub title: String,
    pub summary: String,
    pub skills: Vec<SkillItem>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: String,
    pub category: String,
    pub title: String,
    pub headline: String,
    pub problem: String,
    pub solution: String,
    #[serde(default)]
    pub architecture_summary: Option<String>,
    #[serde(default)]
    pub metrics: Vec<String>,
    #[serde(default)]
    pub trade_offs: Option<String>,
    pub stack: Vec<String>,
    pub link: String,
    #[serde(rename = "linkLabel")]
    pub link_label: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Contact {
    pub email: String,
    pub github: String,
    pub linkedin: String,
    pub twitter: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PortfolioData {
    pub profile: Profile,
    pub domains: Vec<Domain>,
    pub projects: Vec<Project>,
    pub contact: Contact,
}
