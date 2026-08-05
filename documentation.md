# Digital Marketing Automation (DMA) — Technical Documentation

> **Version:** 1.0 | **Date:** Aug 2026 | **Status:** In Development

---

## 1. Overview

Digital Marketing Automation (DMA) is a full-stack platform that streamlines the creation, management, scheduling, and publishing of marketing content across multiple channels (LinkedIn, blogs, social posts). It pairs an AI-driven content-generation frontend with a Strapi-powered headless CMS backend, backed by a shared PostgreSQL datastore.

## 2. System Architecture & Process Flow

```
┌───────────────────┐        ┌──────────────────────┐        ┌─────────────────┐
│   End User (Web)  │◄──────►│  Frontend (Next.js)  │◄──────►│  Backend (Strapi)│
│  Browser / Mobile │        │     React 19 App     │        │  Headless CMS  │
└───────────────────┘        └──────────────────────┘        └─────────────────┘
                                     │   ▲                           │  ▲
                                     │   │  REST / Axios             │  │  Direct DB
                                     ▼   │                           ▼  │
                              ┌──────────────┐                  ┌──────────────┐
                              │  OpenRouter  │                  │ PostgreSQL   │
                              │  AI API      │                  │  DB (Docker) │
                              └──────────────┘                  └──────────────┘
```

**Process Flow:**

1. **Authentication** — User signs in via BetterAuth (email/password, 2FA via OTP). Session is stored in PostgreSQL.
2. **Content Creation** — User leverages AI (OpenRouter) via the Generate dashboard to create cover images, LinkedIn posts, and business content.
3. **Content Editing** — Rich Tiptap editor with AI autocomplete, text-transform actions (make longer/shorter, improve, simplify, formalize, casualize).
4. **Content Management** — Articles, LinkedIn posts, social posts, and media assets are managed through Strapi's REST API and displayed in TanStack data tables.
5. **Scheduling & Calendar** — FullCalendar-based UI for scheduling content events; events link back to Strapi entries.
6. **Content Publishing** — Content passes through an approval workflow (draft → generating → ready → review → approved/rejected → scheduled → publishing → published) before being published to integrated channels.
7. **Settings** — Brand styles, scheduling rules, channel connections, and pillar management are configured per project.

## 3. Tools & Technologies

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19, Radix UI, Base UI, Tailwind CSS v4 |
| **Rich Text Editor** | Tiptap (StarterKit, Typography, Highlight, etc.) |
| **State Management** | TanStack React Query, TanStack React Table, Zustand (via React Query), nuqs (URL state) |
| **AI Integration** | TanStack AI, OpenRouter API |
| **Forms** | react-hook-form, Zod (validation), @hookform/resolvers |
| **Authentication** | BetterAuth (email/password, 2FA, OTP, next-cookies) |
| **Database Client** | Prisma ORM (PostgreSQL adapter) |
| **Styling** | Tailwind CSS v4, Sass, class-variance-authority, clsx, tailwind-merge |
| **Icons** | Lucide React |
| **Notifications** | Sonner (toasts) |
| **Backend Framework** | Strapi 5.49.0 (Node.js) |
| **CMS** | Strapi (REST API, Content Types, Media Library) |
| **Database** | PostgreSQL 18 (Docker), SQLite (local Strapi dev) |
| **Containerization** | Docker Compose (Postgres + pgAdmin) |
| **DevTools** | TanStack DevTools, React Query Devtools |
| **Build/Dev** | TypeScript, ESLint, Prettier, PostCSS |

## 4. Key Modules & Features

### 4.1 Authentication Module
- **BetterAuth** server-side (Next.js API route at `/api/auth/[...all]`) backed by Prisma/PostgreSQL.
- Email & password authentication; optional two-factor authentication (2FA) via OTP.
- Client-side auth via `better-auth/react` + `nextCookies` plugin.
- Pages: `/sign-in`, `/sign-up`, `/verify-otp`.

### 4.2 Dashboard Module
- Central overview showing KPIs: Channels count, Drafts pending, Scheduled posts, Published count.
- Weekly schedule calendar preview and "Scheduled Today" widget.
- Protected by authenticated layout (`dashboard/layout.tsx`).

### 4.3 Calendar Module
- Built on **FullCalendar** (day-grid, time-grid, interaction plugins).
- Fetches events from backend API (`/api/v1/calendar` — currently commented out).
- Event creation, click-to-view details drawer, status badges for lifecycle states.

### 4.4 Content Generation Module (AI-Powered)
- Integrates **OpenRouter** via TanStack AI (`/api/openrouter/text-transform`).
- Tabs for Cover Image, Social Post, and Business content generation.
- Live preview of generated content (LinkedIn post card preview, image preview).
- Tiptap AI autocomplete extension with configurable prompts, hot-keys, and ghost overlay.

### 4.5 Content Management Module
- **Blogs & Articles** — Tabbed view for LinkedIn Articles and Blog Posts. TanStack tables with row actions, delete confirmation, provider pattern for data fetching.
- **Content Library** — Tabbed interface for Social Posts, Thought Leadership, and Media Assets. Media upload via Strapi upload API with drag-and-drop, progress tracking, and preview.
- **Article Edit Form** — Full-featured editor with Tiptap, SEO fields, CTA configuration, media management, and approval workflow (approve/reject via backend API).

### 4.6 Settings Module
- **Account** — Password update, 2FA enable/disable toggle.
- **Notifications** — Notification preferences rendering list.
- **Brand Styles** — Brand reference images, brand color palette, font selection, style description.
- **Scheduling Rules** — Publishing window configuration.
- **Channel Connections** — Connect/manage social channels (LinkedIn, Instagram, Slack, WhatsApp, Zoom, Strapi, Gmail).
- **Pillar Management** — Content pillars per category (thought leadership, social, blog, LinkedIn article).

### 4.7 Scheduled Tasks Module
- Task list with filtering by status and priority, toolbar actions.
- Data-driven from `@/app/scheduled/_components`.

### 4.8 Tiptap Editor (Shared Component)
- Feature-rich rich-text editor used across content creation and editing.
- Extensions: AI autocompletion, text transform dialog, mark buttons, heading dropdowns, lists, color highlight, image upload, link popovers, undo/redo.
- Renders markdown support and custom node extensions.

## 5. Frontend Architecture

- **Location:** `frontend/` (Next.js 16 App Router, TypeScript, Tailwind CSS v4)
- **Routing:** File-system-based (`app/` directory). Dashboard uses nested layouts with `AppLayout` wrapper providing sidebar, header, notifications, and profile dropdown.
- **Data Fetching:** TanStack React Query + Axios (`strapiRequest` for Strapi, `api` for backend services). Server-side data fetching in Next.js pages via async server components.
- **UI Components:** Shadcn-style component library under `components/ui/`, Tiptap UI under `components/tiptap-ui/`, layout primitives under `components/layout/`.
- **Styling:** Tailwind CSS v4 with custom utility classes; SCSS modules for Tiptap components.
- **Type Safety:** Centralized TypeScript types in `types/types.ts` (CalendarEvent, SocialPost, BlogPost, LinkedInArticle, MediaFile, Notification, etc.).

### Frontend Directory Structure
```
frontend/
├── app/                     # App router pages
│   ├── api/                 # API routes (auth, openrouter)
│   ├── dashboard/           # Authenticated dashboard
│   │   ├── calendar/        # FullCalendar scheduling
│   │   ├── content/         # Content library (social, media, thought leadership)
│   │   ├── blogs/           # Blog & LinkedIn article management
│   │   ├── generate/        # AI content generation
│   │   ├── settings/        # User settings
│   │   └── page.tsx         # Dashboard overview
│   ├── editor/              # Standalone Tiptap editor demo
│   ├── sign-in/             # Auth pages
│   └── verify-otp/          # 2FA OTP verification
├── components/              # Shared UI components
│   ├── layout/              # Sidebar, header, navigation
│   ├── ui/                  # Shadcn UI primitives
│   ├── tiptap-ui/           # Tiptap editor UI
│   ├── tiptap-templates/    # Editor templates
│   └── *.tsx                # Forms, dialogs, cards
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities & API clients
│   ├── api.ts               # Axios instances (Strapi + backend)
│   ├── auth.ts              # BetterAuth server config
│   ├── auth-client.ts       # BetterAuth client
│   ├── prisma.ts            # Prisma client (PostgreSQL)
│   ├── utils.ts             # General utilities
│   ├── media.ts             # Strapi media URL helpers
│   ├── tiptap-utils.ts      # Tiptap-specific utilities
│   └── basic-prompts.ts     # AI prompt templates
├── prisma/                  # Prisma schema & client
├── store/                   # Context/state providers
├── types/                   # TypeScript type definitions
├── styles/                  # Global CSS
└── public/                  # Static assets (logo, icons)
```

## 6. Backend Architecture (Strapi CMS)

- **Location:** `strapi/` (Strapi 5.49.0, Node.js, TypeScript config)
- **API Style:** RESTful API (built-in CRUD for all content types).
- **Database:** PostgreSQL 18 (Docker) — configured via `config/database.ts` with support for MySQL/SQLite fallback.
- **CORS:** Configured to allow `http://localhost:3000` (frontend origin).
- **Plugins:** `@notum-cz/strapi-plugin-tiptap-editor` (RichText custom field), `strapi-plugin-preview-button`, Strapi Cloud, Users & Permissions plugin, documentation plugin.

### Content Types (Strapi API Models)

| Content Type | Kind | Fields |
|---|---|---|
| **Article** | Collection | title, description, slug (UID), cover (media), author (relation), category (relation), markdown (RichText via Tiptap) |
| **Category** | Collection | name, slug (UID), description, articles (relation) |
| **Author** | Collection | name, email, avatar (media), articles (relation), linkedin_posts (relation) |
| **Tag** | Collection | (empty — placeholder) |
| **LinkedIn Post** | Collection | title, content (richtext), linkedin_post_id, linkedin_post_url, post_status, media_files, thumbnail, media_type, visibility, post_type, event_id, image_alt_text, image_prompt, start_date, end_date |
| **Global** | Single | siteName, favicon, siteDescription, defaultSeo (component) |
| **About** | Single | title, blocks (dynamic zone: media, quote, rich-text, slider) |

### Shared Components (Strapi)

| Component | Fields |
|---|---|
| **SEO** | metaTitle, metaDescription, shareImage (media) |
| **Media** | file (media) |
| **Rich Text** | body (richtext) |
| **Slider** | files (media, multiple) |
| **Quote** | title, body (text) |

### Backend Directory Structure
```
strapi/
├── config/                   # Strapi configuration
│   ├── admin.ts              # Admin auth, API token, secrets
│   ├── api.ts                # REST API config (pagination limits)
│   ├── database.ts           # DB connection (Postgres/MySQL/SQLite)
│   ├── middlewares.ts        # Middleware stack (logger, cors, security)
│   ├── plugins.ts            # Tiptap editor plugin config
│   └── server.ts             # Server config (host, port, keys)
├── src/
│   ├── api/                  # Content Type API bundles
│   │   ├── article/          # Article: controller, service, routes, schema
│   │   ├── category/
│   │   ├── tag/
│   │   ├── author/
│   │   ├── linkedin-post/
│   │   ├── global/
│   │   └── about/
│   ├── components/           # Reusable Strapi components (shared/*)
│   ├── admin/               # Admin app config
│   └── index.ts             # Bootstrap entry point
├── data/                    # Static data & upload storage
├── scripts/                 # Seed scripts
└── public/                  # Admin & upload assets
```

## 7. Database & Infrastructure

### Docker Compose (`docker-compose.yml`)
- **PostgreSQL 18** — Primary database (port 5432), credentials: `admin`/`secret`, database: `mydb`.
- **pgAdmin 9.13** — Database management UI (port 5050).
- Shared network: `pgnetwork`.

### Database Schema
- **Frontend DB (BetterAuth):** Prisma-managed tables for `User`, `Session`, `Account`, `Verification`, and `TwoFactor` — all stored in PostgreSQL (`betterauth` database via `DATABASE_URL`).
- **Strapi DB:** All content types (articles, categories, authors, tags, LinkedIn posts, globals, abouts) stored in PostgreSQL with auto-generated tables from Strapi schemas.

### Environment Variables
- **Frontend** (`.env.local`): Strapi API key/URL, BetterAuth secret/URL, PostgreSQL connection string, OpenRouter API key, Canva configuration.
- **Backend** (`.env.example`): Host, port, app keys, JWT/admin secrets, encryption key.

## 8. Content Lifecycle & Workflow

Content follows a multi-stage lifecycle:

```
draft → generating → ready → review → approved/rejected → scheduled → publishing → published
                                   ↘ (rejected) → failed / returned to draft
```

- **Approval API:** Frontend posts to `/api/v1/approval/{event_id}/approve` or `/reject` during article editing.
- **Calendar Events:** Each event maps to a Strapi entry via `strapi_entry_id` and tracks lifecycle status with color-coded badges.

## 9. Development Workflow

| Task | Command |
|---|---|
| Frontend dev | `cd frontend && npm run dev` |
| Frontend build | `cd frontend && npm run build` |
| Frontend lint | `cd frontend && npm run lint` |
| Frontend typecheck | `cd frontend && npm run typecheck` |
| Backend (Strapi) dev | `cd strapi && npm run develop` |
| Start infra (DB) | `docker-compose up -d` |
| Seed Strapi | `cd strapi && npm run seed:example` |

## 10. Deployment Considerations

- Frontend deploys as a standard Next.js application (Vercel recommended).
- Strapi runs as a standalone Node.js service (Docker/Kubernetes).
- Both services communicate via HTTP REST API; Strapi uses API tokens for authentication.
- PostgreSQL runs in Docker for local dev; production should use a managed Postgres instance.
- AI content generation routes through Next.js API routes (serverless functions) to proxy OpenRouter calls and protect API keys.
- Environment variables must be configured per deployment target (see `.env.example` files).
