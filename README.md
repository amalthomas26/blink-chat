# BlinkChat

A production-grade real-time chat application with WebRTC audio/video calling, deployed at [blink-chat.app](https://blink-chat.app).

---

## What's Inside

| Directory | Description |
|---|---|
| `server/` | Node.js + Express + TypeScript backend |
| `client/` | React + Vite + TypeScript frontend |
| `nginx/` | Nginx reverse proxy configuration |
| `docker-compose.yml` | Orchestrates all three services |
| `.github/workflows/` | GitHub Actions CI/CD pipeline |

For deeper documentation, each package has its own README:
- [`server/README.md`](./server/README.md) — API reference, architecture, socket events
- [`client/README.md`](./client/README.md) — component structure, state management, hooks

---

## Tech Stack

**Backend**
- Node.js · Express · TypeScript
- Socket.IO (real-time messaging & presence)
- MongoDB + Mongoose
- JWT + Refresh Tokens · OTP via Resend · Google OAuth
- Cloudinary (file uploads)
- WebRTC signaling

**Frontend**
- React 19 · React Router v7 · Vite
- Zustand (state management)
- Tailwind CSS v4
- Socket.IO Client

**Infrastructure**
- Docker + Docker Compose
- Nginx (reverse proxy + static file serving)
- AWS EC2
- GitHub Actions (CI/CD)

---

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org) v20+
- [MongoDB](https://www.mongodb.com) (local or Atlas URI)
- [Docker](https://www.docker.com) (optional, for production-like setup)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/blinkChat.git
cd blinkChat
```

### 2. Set up environment variables

**Server**
```bash
cp server/.env.example server/.env
# Fill in the required values in server/.env
```

**Client**
```bash
cp client/.env.example client/.env
# Fill in the required values in client/.env
```

See [Required Environment Variables](#required-environment-variables) below for what each value does.

### 3. Start the backend

```bash
cd server
npm install
npm run dev
```

Server starts on `http://localhost:5000`.

### 4. Start the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Client starts on `http://localhost:5173`. The Vite dev proxy forwards `/api` and `/socket.io` requests to the backend automatically — no CORS configuration needed locally.

---

## Running with Docker (Production-like)

This mirrors exactly what runs in production.

```bash
# From the root of the repo
docker compose up -d --build
```

| Service | What it does |
|---|---|
| `frontend-build` | Builds the React app and copies static assets to a shared volume |
| `backend` | Runs the Express + Socket.IO server on port 5000 (internal only) |
| `nginx` | Serves static files, proxies `/api` and `/socket.io` to the backend |

The app is available at `http://localhost:8080`.

To stop everything:
```bash
docker compose down
```

---

## Required Environment Variables

### Server (`server/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port. Defaults to `5000` |
| `MONGO_URI` | ✅ | MongoDB connection string. Needs a replica set in production (transactions are used) |
| `JWT_SECRET` | ✅ | Secret for signing access tokens. Generate with `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | No | Access token TTL. Defaults to `15m` |
| `REFRESH_TOKEN_SECRET` | ✅ | Must be different from `JWT_SECRET` |
| `FRONTEND_ORIGINS` | ✅ | Comma-separated list of allowed CORS origins (e.g. `https://blink-chat.app`) |
| `GOOGLE_CLIENT_ID` | ✅ | From [Google Cloud Console](https://console.cloud.google.com) — must match the client |
| `RESEND_API_KEY` | ✅ | From [resend.com](https://resend.com) — used for OTP emails |
| `RESEND_FROM_EMAIL` | No | Sender address. Defaults to Resend sandbox (dev only) |
| `CLOUDINARY_CLOUD_NAME` | ✅ | All four Cloudinary vars required for file uploads |
| `CLOUDINARY_API_KEY` | ✅ | |
| `CLOUDINARY_API_SECRET` | ✅ | |
| `CLOUDINARY_BASE_URL` | ✅ | |
| `STUN_URL_1` | No | Defaults to `stun:stun.l.google.com:19302` |
| `TURN_URL` | No | TURN server for WebRTC calls behind strict firewalls |
| `TURN_SECRET` | No | Shared secret for TURN credential generation |

See [`server/.env.example`](./server/.env.example) for the full list with descriptions.

### Client (`client/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ | Use `/api` locally (proxied by Vite). Use full URL in production |
| `VITE_SOCKET_URL` | ✅ | Use `/` locally (proxied by Vite). Use backend root URL in production |
| `VITE_GOOGLE_CLIENT_ID` | ✅ | Must match `GOOGLE_CLIENT_ID` on the server |

See [`client/.env.example`](./client/.env.example) for details.

---

## Deployment

Deployments are automated via GitHub Actions. Every push to `main` triggers the pipeline:

1. SSH into the EC2 instance
2. Pull latest code
3. Write environment files from GitHub Secrets
4. Rebuild Docker images
5. Restart containers (`--force-recreate`)
6. Prune unused images
7. Health check against `/health`

To set this up for your own server, add these secrets to your GitHub repository:

| Secret | Description |
|---|---|
| `EC2_HOST` | Public IP or domain of your EC2 instance |
| `EC2_SSH_KEY` | Private SSH key for the `ubuntu` user |
| `BACKEND_ENV` | Full contents of your production `.env.production` file |
| `FRONTEND_ENV` | Full contents of your production `client/.env` file |

See [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) for the full pipeline.

---

## Project Structure

```
blinkChat/
├── server/
│   └── src/
│       ├── modules/         # Feature modules (auth, message, conversation, call, user, upload)
│       ├── socket/          # Socket.IO server, handlers, presence store, types
│       ├── middleware/       # Auth, error handling
│       ├── config/          # Environment config
│       └── utils/           # Shared utilities
│
├── client/
│   └── src/
│       ├── components/      # UI components
│       ├── pages/           # Route-level pages
│       ├── hooks/           # Custom React hooks
│       ├── store/           # Zustand state stores
│       ├── services/        # API + socket service layer
│       └── types/           # Shared TypeScript types
│
├── nginx/
│   ├── nginx.conf
│   └── conf.d/blinkchat.conf
│
├── docker-compose.yml
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## API Overview

All routes are prefixed with `/api`.

| Prefix | Description |
|---|---|
| `/api/auth` | Register, login, refresh token, Google OAuth, OTP |
| `/api/users` | User search, profile, privacy settings, blocking |
| `/api/conversations` | Create and fetch conversations |
| `/api/messages` | Send, fetch, and delete messages |
| `/api/upload` | File upload to Cloudinary |
| `/api/webrtc` | WebRTC TURN credential generation, call history |
| `/api/health` | Health check endpoint |

Full API documentation is in [`server/README.md`](./server/README.md).

---

## License

MIT
