# Nexus AI Frontend

Professional React frontend for the GPT backend API.

## Prerequisites

- Node.js 18+
- Backend running on `http://localhost:5000`

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL. Leave **empty** in development to use the Vite proxy. Set to your backend URL in production. |

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The Vite dev server proxies `/user`, `/chat`, and `/msg` to the backend so cookie-based auth works without CORS changes.

## Production Build

```bash
npm run build
npm run preview
```

For production deployment, the backend must allow CORS with credentials, or serve the frontend from the same origin as the API.

## Authentication

The backend uses **HTTP-only cookies** (not Bearer tokens). The frontend sends requests with `withCredentials: true`. Auth state is verified via `GET /user/profile`.
