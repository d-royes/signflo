# ADR 002: Vision Pipeline Ingestion

**Date:** 2026-04-23
**Status:** Accepted

## Context
The core "hero feature" is taking a raw phone photo of a physical document and converting it into a structured JSON schema. Real-world photos have skew, poor contrast, and bad lighting.

## Decision
We will use **raw Gemini 3.1 Pro (Multimodal) vision ingestion without heavy preprocessing** for the initial MVP.

## Rationale
- **Model Capabilities:** Modern multimodal models handle skew, blur, and lighting variance exceptionally well natively. Adding a preprocessing step (like OpenCV deskewing) introduces unnecessary Node.js dependencies and slows down the pipeline.
- **Self-Verification:** Instead of preprocessing the image, the agent will implement a "self-verification loop" where it reviews its own JSON schema output against the image and flags low-confidence fields.

## Consequences
- The upload must go directly to R2, and we pass the R2 URL (or base64) to the model.
- If raw vision fails on specific test cases during Day 1, we will introduce a lightweight Edge-compatible sharpening step, but not before measuring the baseline.
