# ADR 003: Runtime Model

**Date:** 2026-04-23
**Status:** Accepted

## Context
How the agreement engine processes user actions.

## Decision
We will use **Server-side Agent calls via Cloudflare Workers**.

## Rationale
- Security and API keys (like the Gemini API token) must be kept secure on the backend.
- Cloudflare Workers provide extremely low-latency API routes for Next.js when deployed together.

## Consequences
- The frontend will primarily be a dumb client that streams data back and forth to the Cloudflare Worker API.
