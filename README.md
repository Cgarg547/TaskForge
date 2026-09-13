# TaskForge

> **Build better workflows together.**

A full-stack, multi-tenant B2B task management SaaS built with **React, FastAPI, Clerk, and SQLite**.

TaskForge gives teams a secure workspace for managing tasks while supporting organization-based authentication, role-based permissions, subscription-based membership limits, and a responsive Kanban workflow.

## Features

- 🔐 Clerk authentication
- 🏢 Multi-tenant organizations
- 👥 Organization membership management
- 🛡️ Role-based permissions
- ✅ Full task CRUD
- 📋 Kanban task board
- 🔄 Task status management
- 📝 Task descriptions
- 🕒 Created and updated timestamps
- ⚡ Optimistic UI updates
- 🔃 Automatic rollback on failed updates
- ⏳ Loading states for task actions
- 🚨 User-friendly error handling
- 💳 Organization billing with Clerk
- 📈 Free and Pro subscription tiers
- 🪝 Secure Clerk webhooks using Svix
- 🗄️ Alembic database migrations
- 📱 Responsive dashboard
- 🌙 Dark SaaS-style interface

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Clerk React SDK
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- Alembic

### Authentication & SaaS

- Clerk
- Clerk Organizations
- Clerk Billing
- Clerk Webhooks
- Svix

### Database

- SQLite
- SQLAlchemy ORM
- Alembic migrations

---

## Architecture

```text
TaskForge
│
├── frontend/
│   ├── React
│   ├── React Router
│   ├── Clerk authentication
│   └── TaskForge UI
│
└── backend/
    ├── FastAPI
    ├── Clerk authentication
    ├── Organization authorization
    ├── Task API
    ├── Webhook processing
    ├── SQLAlchemy
    └── Alembic