# ADR 001: PDF Generation Architecture

**Date:** 2026-04-23
**Status:** Accepted

## Context
Signflo needs to generate authoritative, signable PDF agreements from web forms. We evaluated three primary options:
1. Client-side generation using `react-pdf`.
2. Server-side Edge generation using Cloudflare Browser Rendering API (Puppeteer).
3. Server-side HTML generation + Paged.js.

## Decision
We will use **client-side `react-pdf`**.

## Rationale
- **Simplicity:** Generating the PDF directly in the browser eliminates the need to run headless browsers (Puppeteer) on the Edge, which reduces Cloudflare configuration overhead and keeps the MVP lean.
- **Speed:** Client-side generation offloads rendering to the user's device, ensuring instant generation without waiting on network latency or heavy serverless cold starts.
- **Support:** `react-pdf` has robust support for embedding images (like HTML canvas signatures) natively.

## Consequences
- PDF rendering styles must be defined using `react-pdf` primitives (`<Document>`, `<Page>`, `<View>`, etc.) rather than standard HTML/CSS.
- This adds some bundle size to the frontend, but given the app's scope, it is an acceptable trade-off.
