use std::fs;
use std::path::Path;

mod components;
mod schema;
mod scripts;
mod tokens;
mod views;

use schema::PortfolioData;

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

    println!("[RUST PRE-RENDERER] Compiling Bento-Grid Maud tree with dual-mode design system...");
    let markup = views::render_page(&data).into_string();

    let dist_dir = repo_root.join("dist");
    fs::create_dir_all(&dist_dir)?;

    let dist_index = dist_dir.join("index.html");
    fs::write(&dist_index, &markup)?;
    println!("[RUST PRE-RENDERER] Generated target: {}", dist_index.display());

    let root_index = repo_root.join("index.html");
    fs::write(&root_index, &markup)?;
    println!("[RUST PRE-RENDERER] Mirrored target: {}", root_index.display());

    // Mirror root static assets
    for static_file in &["CNAME", "robots.txt", "security.txt", "avatar.png"] {
        let src = repo_root.join(static_file);
        if src.exists() {
            let dest = dist_dir.join(static_file);
            fs::copy(&src, &dest)?;
            println!("[RUST PRE-RENDERER] Mirrored static asset: {}", static_file);
        }
    }

    // Mirror RFC 9116 .well-known directory
    let well_known_src = repo_root.join(".well-known");
    if well_known_src.is_dir() {
        let well_known_dest = dist_dir.join(".well-known");
        fs::create_dir_all(&well_known_dest)?;
        let sec_src = well_known_src.join("security.txt");
        if sec_src.exists() {
            fs::copy(&sec_src, well_known_dest.join("security.txt"))?;
            println!("[RUST PRE-RENDERER] Mirrored RFC 9116 .well-known/security.txt");
        }
    }

    let byte_size = markup.len();
    println!("[RUST PRE-RENDERER] Build completed successfully.");
    println!(
        "[TELEMETRY] Total raw HTML+CSS wire payload: {} bytes ({:.2} KB)",
        byte_size,
        byte_size as f64 / 1024.0
    );

    Ok(())
}
