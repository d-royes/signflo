# ADR 004: Repository Export Mechanism

**Date:** 2026-04-23
**Status:** Accepted

## Context
Signflo promises that "every agreement is generated as code you own." Users need a way to export the generated form as a functional repository.

## Decision
We will use a **simple `.zip` download** for the MVP.

## Rationale
- **Scope Control:** Implementing a dynamic Git push via GitHub OAuth requires setting up a GitHub App, handling OAuth flows, and managing user tokens. This significantly expands the scope (Risk R2 in the Epic).
- **User Value:** A downloadable `.zip` file fulfills the core promise ("no SaaS lock-in, code you own") immediately and is universally accessible.

## Consequences
- The Next.js API will dynamically generate the Next.js scaffold code for the specific agreement, bundle it using a lightweight JS zip library (e.g., `jszip`), and return it as a blob.
- GitHub OAuth push is formally moved to a post-MVP stretch goal.
