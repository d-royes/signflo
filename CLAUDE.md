# Signflo Development Guidelines

## Stack
- Next.js 15 (App Router, React 19)
- Tailwind CSS
- TypeScript
- Cloudflare Workers + D1 + R2

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Local DB Init:** `npx wrangler d1 execute DB --local --file=schema.sql`
- **Deploy:** `npx wrangler deploy`

## Architectural Principles
- **Aesthetics First:** We are building a premium product. DO NOT use generic "AI-generated" forms. Use modern typography (Google Fonts), clean spacing, and rich design elements.
- **Edge Native:** Avoid heavyweight Node.js dependencies in the backend. Favor lightweight, Edge-compatible libraries.
- **No Boilerplate Auth (Yet):** Focus on the core MVP. The hero path is document ingestion to signed PDF.
