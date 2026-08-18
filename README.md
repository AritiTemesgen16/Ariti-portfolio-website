# Ariti Temesgen Wayu | Full-Stack Software Developer Portfolio

Welcome to the official portfolio codebase for **Ariti Temesgen Wayu**, a Full-Stack Software Developer with specialized expertise in React, TypeScript, Node.js/Express, Tailwind CSS, and Cloud Architecture.

---

## 🌟 Portfolio Overview

This production-ready portfolio application highlights Ariti's engineering expertise, featured project case studies, core technical services, interactive client contact workflows, and interactive curriculum vitae.

---

## 🚀 Key Features

- **Full-Stack Project Case Studies**: Interactive deep dives into production systems (SmartSpend AI, AgriConnect Ethiopia, PharmaCore Ethiopia) complete with architecture diagrams, value metrics, and stack breakdowns.
- **Production Contact Lead Inquiries**: Secure, server-side contact API featuring rate-limiting, anti-bot honeypot validation, sanitization, and transactional email integration powered by Resend.
- **Client-Side Custom Profile Photo**: Personal photo customization supporting local image uploads with 2MB validation, safe FileReader parsing, and localStorage persistence.
- **Dynamic SEO & Structured Data**: Built-in JSON-LD Person schema markup, custom OpenGraph tags, canonical tags, automated XML sitemap (`/sitemap.xml`), and robots directive (`/robots.txt`).
- **Interactive Technical Resume**: Dynamic skill matrix, filterable experiences, downloadable text CV generation, and direct contact options.
- **Dark / Light Theme Engine**: System-aware theme toggle with smooth transitions.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, Motion (Framer Motion API).
- **Backend**: Node.js, Express, Vite Server Integration (Development), Esbuild Bundler (Production).
- **Email Delivery**: Resend SDK (`resend`).
- **Build & Execution**: Vite, TSX, TypeScript (`tsc`).

---

## 📁 Project Architecture & Structure

```
├── server.ts                    # Production Express server (API endpoints + Vite dev middleware)
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Main application container & view router
│   ├── index.css                # Global styles & Tailwind v4 directive
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── pages/               # Project Detail Case Study page
│   │   ├── sections/            # Hero, About, Projects, Services, Resume, Contact
│   │   └── ui/                  # SEOHead, ProfilePhotoCard, Buttons, Modals, Inputs
│   ├── data/
│   │   └── portfolioData.ts     # Centralized portfolio data (profile, projects, skills)
│   └── types/
│       └── index.ts             # Global TypeScript interfaces & types
├── public/                      # Static assets, favicon, robots.txt, sitemap.xml
├── .env.example                 # Environment variables template (NO real secrets)
├── package.json                 # Dependencies & build scripts
└── tsconfig.json                # TypeScript configuration
```

---

## ⚙️ Environment Variables

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

### Required / Supported Variables:

| Variable Name | Description | Example / Usage |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Server-side Resend API key for contact form emails | `re_123456789...` |
| `CONTACT_EMAIL` | Destination email address for client inquiries | `arititemesgen16@gmail.com` |
| `APP_URL` | Application base URL for canonical tags & sitemap | `https://arititemesgen.dev` |

> **Security Note:** Never commit your `.env` file or actual secrets to version control.

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arititemesgen16/ariti-portfolio.kind.git
   cd ariti-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

---

## 📦 Production Build & Execution

1. **Compile & bundle the application:**
   ```bash
   npm run build
   ```
   *This compiles static assets into `dist/` and bundles `server.ts` into `dist/server.cjs` via `esbuild`.*

2. **Run in production mode:**
   ```bash
   npm run start
   ```

3. **Run TypeScript check / linting:**
   ```bash
   npm run lint
   ```

---

## 🔐 Security Practices

- **Zero Hardcoded Secrets**: All private keys and email destination credentials are maintained strictly in server-side environment variables.
- **Honeypot Anti-Spam**: Invisible form fields trap automated bots silently without revealing detection logic.
- **IP Rate Limiting**: In-memory rate limiting prevents contact form submission flooding (5 requests / 15 minutes per IP).
- **Input Validation & Sanitization**: Strict length limits and type checks enforce safe input processing before logging or sending emails.
- **Security Headers**: Standard HTTP headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`) enforced on all responses.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
