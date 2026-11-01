# Architectural & Schema Drift Report (2026-11-01)

## builder/data/portfolio.json (Schema vs. Rust Maud Compiler)

* **Unused Profile Schema Fields**: `profile.handle` ("syntax-error-root"), `profile.timezone` ("Asia/Dhaka"), and `profile.utc_offset` ("UTC+6") are declared and parsed into Rust structs (`Profile`), but are completely unrendered in `builder/src/main.rs`.
* **Unused Social Contact Fields**: `contact.twitter` ("https://x.com") is defined in schema and parsed into `Contact`, but is omitted from rendering in both navigation, hero actions, and footer.
* **Hardcoded Script Email Discrepancy**: `inline_js()` in `builder/src/main.rs` hardcodes `var email = 'default13789@gmail.com';` rather than binding to `data.contact.email`. Any schema update to `contact.email` fails to update the clipboard payload.
* **Hardcoded Geolocation In Footer**: `builder/src/main.rs` line 1578 hardcodes `"Bogura, Bangladesh."` in the footer markup rather than binding dynamically to `(data.profile.location)`.
* **Copy Button Semantic Drift**: Button text `"Copy Coordinates: " (data.contact.email)` and toast label `"Copied coordinates to clipboard"` conflate email contact information with geographic coordinates.
* **Plaintext Email Exposure Drift**: Commit `b1a472dbe7a7dc5043f71e0d4ba9126213de5a14` implemented bot protection / obfuscation for email; the current Maud implementation outputs raw plaintext `mailto:` and button values.

## docs/ (Legacy Deployment Artifacts)

* **DNS Domain Divergence**: `docs/CNAME` contains `rootcanvas.pro.bd`, whereas repository root `CNAME` and `dist/CNAME` contain `omik.pro.bd`.
* **Orphaned Directory**: `.github/workflows/static.yml` deploys strictly from `dist/`. The entire `docs/` directory is legacy dead state.

## Root Static Assets vs. Active Build Pipeline

* **Dead CSS Asset**: Root `styles.css` is an unreferenced legacy dark-mode matrix-theme stylesheet (1,268 lines) completely decoupled from the Maud inline CSS pipeline.
* **Dead JS Asset**: Root `script.js` is an unreferenced legacy script file implementing matrix rain canvas and obsolete DOM handlers.
* **RFC 9116 Non-Compliance**: `security.txt` resides at `/security.txt` and `/dist/security.txt` instead of standard `/.well-known/security.txt`. Additionally, `security.txt` contains HTML entity encoding (`&#100;&#101;...`) instead of standard plaintext URI.
* **Missing Favicon**: Neither root nor `dist/` contains `favicon.ico` or SVG vector icon, generating HTTP 404 on browser navigation.

## Content-Security-Policy vs. Script Execution

* **CSP Script Blocking Drift**: Header CSP specifies `default-src 'self'`. It fails to declare `script-src 'unsafe-inline'` or a script hash for the inlined `inline_js()` script. In standards-compliant browsers, inline script execution is blocked, breaking clipboard copy functionality.
