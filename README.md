# dr-demo-loyalty-service

Points accrual and redemption for the loyalty programme.

## Overview

`dr-demo-loyalty-service` is a Node.js service in the commerce domain. It serves both a small
JSON API and a server-rendered admin surface.

## Scripts

```bash
npm install
npm start          # run the service on :3000
npm test           # run the jest suite
```

## Layout

- `src/server.js` — Express app and routes
- `src/store.js` — data access
- `src/render.js` — server-side HTML rendering for the admin surface
- `src/tokens.js` — session and invite token helpers
- `test/` — jest suite

## Deployment

Runs behind the shared ingress. See `deploy/ingress.yaml`.
