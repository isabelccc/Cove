# 🎨 Cove — Private circles for photos & moments

> A full-stack app for invite-only **circles**: share posts and photos with people you trust. React + Express API, **PostgreSQL** via **Prisma**, JWT and Google sign-in.

[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Express-blue.svg)](https://reactjs.org/)
[![React](https://img.shields.io/badge/React-17.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791.svg)](https://www.prisma.io/)

---

## ✨ What makes this project unique

### Circles (invite-only groups)

- **Groups with invite tokens**: create a circle, share a join link, scoped **group walls** for posts
- **Landing + Circles UX**: marketing `Landing` section components; authenticated **Circles** list, **Group wall**, and **Join** flow

### Content moderation & safety

- **Dual profanity filtering**: `bad-words` and `mint-filter` on titles, messages, and comments
- **Rate limiting**: Express rate limit with optional **Redis** store for shared limits across instances
- **Large uploads**: JSON/body limit **30MB** for rich image payloads

### Authentication & security

- **JWT** sessions plus **Google OAuth** (ID token verification on the server)
- **bcryptjs** for password hashing
- **Helmet** and structured error handling on the API; **Sentry** and **Prometheus**-style **/metrics** in production-oriented setups

### Product features

- **Posts**: CRUD, likes, comments, tags, search, pagination, creator profiles
- **Gravatar** avatars from email
- **Redux + Redux Thunk** on the client; **Material-UI v4** and mixed **JS/TS** components

### Architecture

- **Prisma ORM** with **PostgreSQL** (schema + migrations in `server/prisma`)
- **TypeScript** server (`tsx` in dev, `tsc` build); REST JSON API
- **Modular React** UI (including `Landing/*`, `Circles/*`, `Form`, `Posts`, etc.)

---

## 🚀 Tech stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 17.0.x | UI |
| **Redux** / **Redux Thunk** | 4.x / 2.x | State & async actions |
| **Material-UI** | 4.12.x | Components |
| **React Router** | 5.3.x | Routing (`Switch` / `Route`) |
| **Axios** | 1.6.x | HTTP client |
| **TypeScript** | 5.x | Partial typing (`.tsx` / `.ts` components) |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** 18+ | Runtime |
| **Express** 4.x | HTTP API |
| **Prisma** | ORM & migrations (PostgreSQL) |
| **PostgreSQL** | Primary database |
| **JWT** / **google-auth-library** | Auth |
| **bcryptjs** | Password hashing |
| **express-rate-limit** + **rate-limit-redis** + **ioredis** | Rate limiting (Redis optional) |
| **bad-words** / **mint-filter** | Text filtering |
| **helmet** | Security headers |
| **@sentry/node** | Error reporting (when configured) |
| **prom-client** | **GET /metrics** |

### Development

- **concurrently** — client + server in `npm run dev`
- **tsx** — TypeScript server in development
- **Jest** — server tests
- **ESLint** — client lint (CRA)

---

## 📋 Features

### Authentication

- Email/password signup and sign-in (JWT)
- Google sign-in
- Protected API routes and client flows

### Circles

- Create groups, list **my circles**, fetch a group by id
- Join via **invite token** (`/join/:inviteToken`)
- Posts can be scoped to a **group** (`groupId`)

### Posts & social

- CRUD posts, image field (base64), tags
- Like / unlike
- Comments (add, edit, delete) with ownership checks
- Search, creator filter, pagination
- User profiles

### Marketing & navigation

- **Landing page** at `/` (composed from `client/src/components/Landing/*`)
- Main app routes under `/posts`, `/circles`, `/auth`, etc.

### Operations

- **GET /health** — health check
- **GET /metrics** — Prometheus metrics (when enabled)

---

## 🛠️ Installation & setup

### Prerequisites

- **Node.js** 18+ recommended
- **npm**
- **PostgreSQL** (local or hosted, e.g. Supabase, Railway, Neon)
- **Redis** (optional; recommended in production for shared rate limits)

### 1. Clone

```bash
git clone <repository-url>
cd mern-memories
```

### 2. Install dependencies

```bash
npm run install-all
```

This installs root, server, and client (client uses `--legacy-peer-deps` for peer compatibility).

Manual alternative:

```bash
npm install
cd server && npm install
cd ../client && npm install --legacy-peer-deps
```

### 3. Database & Prisma

1. Create a PostgreSQL database.
2. Copy `server/env.example` to `server/.env` and set **`DATABASE_URL`** (see `env.example` for formats).
3. From `server/`:

```bash
npx prisma migrate dev    # apply migrations
# optional:
npm run prisma:seed
```

### 4. Environment variables (`server/.env`)

Key variables (see **`server/env.example`** for full list):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Strong secret for signing JWTs |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (same idea as client if using Google login) |
| `PORT` | API port (server defaults to **5001** if unset) |
| `REDIS_URL` | Optional; enables Redis-backed rate limiting |

### 5. Client API URL

The CRA **proxy** in `client/package.json` points at **`http://localhost:5001`**. Change it if your API runs on another port.

### 6. Run in development

From the repo root:

```bash
npm run dev
```

- **API**: `http://localhost:5001` (or your `PORT`)
- **React**: `http://localhost:3000`

Separate terminals:

```bash
npm run server
npm run client
```

### Production build (client)

```bash
npm run build
```

Output: `client/build`. Serve statically and point the client at your deployed API base URL.

---

## 📜 Scripts

### Root

| Command | Description |
|---------|-------------|
| `npm run dev` | API + React dev servers |
| `npm run server` | API only |
| `npm run client` | React only |
| `npm run build` | Production build of the client |
| `npm run test` | Server Jest tests |
| `npm run install-all` | Install all workspaces |

### Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | `tsx watch index.ts` |
| `npm run build` | `tsc` → `dist/` |
| `npm start` | Run compiled `dist/index.js` |
| `npm run prisma:migrate` | Prisma migrate dev |
| `npm run prisma:studio` | Prisma Studio |
| `npm run prisma:seed` | Seed script |

### Client (`client/`)

| Command | Description |
|---------|-------------|
| `npm start` | CRA dev server |
| `npm run build` | Production bundle |
| `npm test` | CRA tests |

---

## 🌐 API overview

Unless noted, routes expect **`Authorization: Bearer <jwt>`** for protected handlers.

### User (`/user`)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/user/signup` | Register |
| `POST` | `/user/signin` | Login |
| `POST` | `/user/google` | Google token login |

### Groups (`/groups`)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/groups` | Create group |
| `GET` | `/groups/mine` | List my groups |
| `GET` | `/groups/:id` | Get group |
| `POST` | `/groups/join` | Join with invite token |

### Posts (`/posts`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/posts` | Paginated posts (auth) |
| `GET` | `/posts/search` | Search (auth) |
| `GET` | `/posts/creator` | By creator (auth) |
| `GET` | `/posts/:id` | Single post (auth) |
| `POST` | `/posts` | Create |
| `PATCH` | `/posts/:id` | Update |
| `DELETE` | `/posts/:id` | Delete |
| `PATCH` | `/posts/:id/likePost` | Like / unlike |
| `POST` | `/posts/:id/commentPost` | Add comment |
| `PATCH` | `/posts/:id/comment/:commentId` | Edit comment |
| `DELETE` | `/posts/:id/comment/:commentId` | Delete comment |

### Other

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/metrics` | Metrics |

---

## 📁 Project structure (high level)

```
mern-memories/
├── client/                 # React app (CRA)
│   └── src/
│       ├── actions/        # Redux actions
│       ├── api/            # Axios instance
│       ├── components/     # UI (Landing/, Circles/, Auth/, …)
│       ├── reducers/
│       └── App.js
├── server/                 # Express API (TypeScript)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/             # e.g. Redis
│   ├── utils/
│   ├── index.ts
│   └── env.example
├── package.json            # Root scripts
└── README.md
```

---

## 🚢 Deployment notes

- Run **`npm run build`** in `server/` and start with **`npm start`**, or run **`tsx`/node** with migrations applied (`prisma migrate deploy` in production).
- Set **`DATABASE_URL`**, **`JWT_SECRET`**, and **`REDIS_URL`** (production) on the host.
- Deploy the **`client/build`** folder to static hosting; configure the client to call your public API URL (proxy only applies in dev).

---

## 🧪 Testing

```bash
npm run test
```

Runs server Jest tests from `server/`.

---

## 🤝 Contributing

1. Fork the repository  
2. Create a branch: `git checkout -b feature/your-feature`  
3. Commit and push  
4. Open a pull request  

Please keep changes focused, match existing patterns, and run tests / client build where relevant.

---

## 📝 License

**ISC** — see repository metadata.

---

## 🙏 Acknowledgments

Material-UI, Prisma, PostgreSQL, React, and the open-source packages this project depends on.

---

**Built with the MERN spirit — today backed by PostgreSQL, Prisma, and TypeScript on the API.**
