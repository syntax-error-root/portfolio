# ⚡ Omik — Platform Automation & AI Systems

[![Pages Deployment](https://github.com/syntax-error-root/portfolio/actions/workflows/static.yml/badge.svg)](https://github.com/syntax-error-root/portfolio/actions/workflows/static.yml)
[![Live Production](https://img.shields.io/badge/Production-omik.pro.bd-0284c7.svg)](https://omik.pro.bd)
[![Pre-Renderer](https://img.shields.io/badge/Renderer-Rust%20%2B%20Maud-orange.svg?logo=rust)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Personal engineering portfolio and platform showcase engineered with a compiled **Rust** static pre-renderer and deployed directly to **GitHub Pages** with custom domain routing.

---

## 🏛️ Architecture Overview

The site utilizes a zero-runtime-overhead compiled SSR pipeline:

```
portfolio.json (Data Schema) 
       │
       ▼
builder/src/main.rs (Rust Engine)
       │
       ├──► Maud Pre-Renderer (Compile-time HTML AST)
       ├──► Bento-Grid & Design Tokens (WCAG 2.1 AA Compliant)
       └──► Asset Mirroring (CNAME, robots.txt, RFC 9116 security.txt)
       │
       ▼
dist/ (Pre-rendered Static Site) ──► GitHub Pages CDN (omik.pro.bd)
```

### Core Invariants:
* **Sub-Millisecond Wire Payload:** Single pre-rendered HTML payload with inline critical design tokens, achieving 100/100 Lighthouse performance metrics.
* **Pure Static Resilience:** Operates with zero client-side JavaScript dependencies for core information delivery.
* **RFC 9116 Security Disclosure:** Fully standardized security reporting endpoint at `/.well-known/security.txt`.

---

## 🛠️ Local Development & Build

### Prerequisites
* **Rust Toolchain:** `stable` or `nightly` (`rustup update`)

### 1. Execute Pre-Renderer
```bash
cargo run --release --manifest-path builder/Cargo.toml
```
Compiled static assets will be output to `./dist/index.html` and mirrored to root `./index.html`.

### 2. Verify Output
```bash
python3 -m http.server 8080 --directory dist
```
Navigate to `http://localhost:8080`.

---

## 🚢 Continuous Deployment

Commits pushed to `main` trigger `.github/workflows/static.yml`, which:
1. Provisions Rust toolchain on `ubuntu-latest`.
2. Compiles `builder/` and executes the pre-renderer.
3. Packages `dist/` via `actions/upload-pages-artifact@v3`.
4. Deploys to GitHub Pages edge nodes via `actions/deploy-pages@v5`.

---

## 📄 License
MIT © 2026 Omik (syntax-error-root). All rights reserved.
