# DMA Project — Technical Documentation

**Project:** Digital Marketing Automation (DMA)  
**Version:** 1.0  
**Date:** August 2026  
**Team:** Frontend & Backend Development Teams

---

## 1. Project Overview

## DMA is a centralized content management and automation platform that enables users to generate, edit, schedule, and publish content across digital channels from a single dashboard. The platform leverages AI for content and image generation, with LinkedIn as the primary distribution channel.

---

## 2. Sidebar Navigation Structure

### General

| Menu Item        | Status         | Description                       |
| ---------------- | -------------- | --------------------------------- |
| Dashboard (Home) | ⏳ In Progress | Main overview & quick actions     |
| Calendar         | ✅ Complete    | Upcoming events & scheduled posts |
| Generate         | 🔜 Not Defined | AI content & image generation hub |
| Comments         | 🔜 Not Defined | Comment management (scope TBD)    |
| Content          | 🚧 80%         | Media and social contents CRUD    |

### Content

| Menu Item          | Status | Description                     |
| ------------------ | ------ | ------------------------------- |
| Social Posts       | 🚧 70% | LinkedIn Articles + Blogs CRUD  |
| Thought Leadership | 🚧 80% | Thought leadership content CRUD |
| Media Assets       | 🚧 90% | Social media posts CRUD         |

### Other

| Menu Item | Status | Description |
| --------- | ------ | ----------- |
| Settings | 🚧 Layout Ready | Settings page UI complete, API pending |
| Help | 🔜 Not Defined | Help/support section (scope TBD) |

---

## 3. Technology Stack

| Layer                  | Technology                                   |
| ---------------------- | -------------------------------------------- |
| **Frontend Framework** | Next.js (React)                              |
| **UI Components**      | shadcn/ui                                    |
| **Authentication**     | Better Auth with 2FA                         |
| **Backend Framework**  | FastAPI (Python)                             |
| **API Type**           | REST                                         |
| **CMS**                | Strapi (Headless CMS)                        |
| **Database**           | PostgreSQL                                   |
| **ORM**                | Prisma                                       |
| **AI Engine**          | OpenAI API (GPT for text, DALL·E for images) |
| **External APIs**      | LinkedIn API                                 |
| **Containerization**   | Docker (planned)                             |
| **Deployment**         | Not yet planned                              |

---

## 4. Key Modules & Features

| Module                    | Status         | Description                        |
| ------------------------- | -------------- | ---------------------------------- |
| **Dashboard**             | ⏳ In progress | Central hub with quick actions     |
| **AI Content Generation** | ✅ Complete    | Articles, blogs, social posts      |
| **AI Image Generation**   | ✅ Complete    | DALL·E powered image creation      |
| **Content Editor**        | ✅ Complete    | Fetch from Strapi, edit, finalize  |
| **Calendar View**         | ✅ Complete    | Upcoming events & scheduled posts  |
| **Notifications**         | 🚧 In Progress | Frontend done, Backend API pending |
| **LinkedIn Integration**  | 🔜 Pending     | Auto-publishing to LinkedIn        |
| **Scheduler**             | 🔜 Pending     | Automated posting engine           |

---

## 5. Authentication System

### Better Auth Implementation

- **Provider:** Better Auth (database session-based)
- **2FA:** TOTP-based Two-Factor Authentication
- **Session Management:** Token-based with expiry
- **OAuth Support:** Account linking with multiple providers [Not Discussed about it]

### Auth Database Schema (Prisma)

| Model          | Description                                  |
| -------------- | -------------------------------------------- |
| `User`         | Core user profile with 2FA toggle            |
| `Session`      | Active session tracking with IP & user agent |
| `Account`      | OAuth provider accounts (LinkedIn etc.)      |
| `Verification` | Email verification tokens                    |
| `TwoFactor`    | TOTP secrets & backup codes                  |

### Key Auth Models:

**User**

- `id`, `name`, `email`, `emailVerified`
- `twoFactorEnabled` — Boolean toggle for 2FA
- Linked to `Session[]`, `Account[]`, `TwoFactor[]`

**Session**

- `token` — Unique session identifier
- `expiresAt` — Session expiration
- `ipAddress`, `userAgent` — Security tracking
- Cascading delete with User

**Account**

- `providerId` — OAuth provider identifier
- `accessToken`, `refreshToken` — OAuth tokens
- Used for LinkedIn API integration

**TwoFactor**

- `secret` — TOTP secret key
- `backupCodes` — Recovery codes
- `verified` — 2FA setup status
- `failedVerificationCount`, `lockedUntil` — Brute force protection

---

## 6. Key Modules & Features

| Module                   | Status          | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| **Authentication**       | ✅ Complete     | Email + 2FA with Better Auth                 |
| **Dashboard**            | ✅ Complete     | Central hub with quick actions & overview    |
| **Calendar**             | ✅ Complete     | Upcoming events & scheduled posts view       |
| **Generate**             | ✅ Complete     | AI content (GPT) + image (DALL·E) generation |
| **Blogs & Articles**     | 🚧 70%          | LinkedIn Articles + Blogs CRUD               |
| **Thought Leadership**   | 🚧 70%          | Thought leadership content CRUD              |
| **Social Posts**         | 🚧 70%          | Social media posts CRUD                      |
| **Media Assets**         | 🚧 70%          | Media & AI-generated image management        |
| **Comments**             | 🔜 Not Defined  | Comment management (scope TBD)               |
| **Settings**             | 🚧 Layout Ready | Settings page UI complete, API pending       |
| **Help**                 | 🔜 Not Defined  | Help/support section (scope TBD)             |
| **Notifications**        | 🚧 In Progress  | Frontend complete, Backend API pending       |
| **LinkedIn Integration** | 🔜 Pending      | Auto-publishing via LinkedIn API             |
| **Scheduler**            | 🔜 Pending      | Automated posting engine                     |

---

## 7. Planned Content Models (To Be Added to Schema)

| Model            | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `Comment`        | Comment records (planned)                            |
| `Schedule`       | Post scheduling & recurrence rules                   |
| `Notification`   | User notification records (Backend planned)          |
| `LinkedInConfig` | LinkedIn OAuth tokens & page config                  |
| `Settings`       | User preferences & platform config (Backend planned) |

---

## 8. Roadmap & Planned Improvements

- [ ] Docker containerization for consistent environments
- [ ] Complete CRUD APIs for all content modules (currently 70%)
- [ ] Settings backend API
- [ ] Notification backend API
- [ ] LinkedIn API integration (OAuth + posting)
- [ ] Post scheduler engine
- [ ] Define Comments module scope & implementation
- [ ] Define Help module scope & implementation
- [ ] Multi-platform support (Twitter/X, Facebook, Instagram)
- [ ] Analytics dashboard for post performance
- [ ] Multi-user roles & permissions (RBAC)
- [ ] Content approval workflow
- [⏳] Drag-and-drop content calendar
- [ ] AI hashtag suggestions
- [ ] Cloud deployment strategy

---

## 9. Current Status Summary

| Area                               | Completion                |
| ---------------------------------- | ------------------------- |
| Authentication (Better Auth + 2FA) | ✅ 100%                   |
| Dashboard                          | ✅ 100%                   |
| Calendar                           | ✅ 100%                   |
| Generate (AI Content + Images)     | ✅ 100%                   |
| Strapi CMS Integration             | ✅ 100%                   |
| Blogs & Articles CRUD              | 🚧 80%                    |
| Thought Leadership CRUD            | 🚧 70%                    |
| Social Posts CRUD                  | 🚧 70%                    |
| Media Assets CRUD                  | 🚧 90%                    |
| Settings                           | Layout ready, API pending |
| Notifications                      | 50% (Frontend only)       |
| Comments                           | Not defined               |
| Help                               | Not defined               |
| LinkedIn Integration               | 🔜 0%                     |
| Scheduler                          | 🔜 0%                     |
| Deployment Setup                   | Not started               |

---

**Document prepared for internal team reference. Last updated: August 2026.**
