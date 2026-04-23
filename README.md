# Signflo — Agreement Engine 🚀

> **Built in Public (Week of 4/21–4/27)**
> A clean-room, OSS reimagining of the Tour Forms concept as an *Agreement Engine* rather than a form builder.

## The Pitch
Point your phone at any document, describe how it should work, get back a live signable agreement — plus the repo that powers it, yours forever. 

The form-builder market is crowded. The real pain isn't creation — it's the gap between "form submitted" and "authoritative, signed, routed, enforceable agreement." Signflo closes that gap with an agentic runtime. And because every agreement is generated *as code you own*, there's no SaaS lock-in.

## Architecture Stack
- **Frontend:** Next.js + Tailwind
- **Backend:** Cloudflare Workers + D1 + R2
- **Agent:** Gemini 3.1 Pro (acting autonomously via Antigravity)
- **PDF Generation:** react-pdf (Client-side)
- **Signature:** HTML canvas

## Development
```bash
npm install
npm run dev
```

## Licensing
MIT License
