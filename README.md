# deploy-monitor-dashboard

```
┌──────────────┐
│   Frontend   │  ← React Dashboard
└──────┬───────┘
       │ REST APIs (JWT)
┌──────▼───────┐
│   Backend    │  ← Node + Express
│  (Core API)  │
└──────┬───────┘
       │
┌──────▼───────┐
│ Background   │  ← Schedulers & Workers
│   Services   │
└──────┬───────┘
       │
┌──────▼───────┐
│   Database   │  ← MongoDB
└──────────────┘

```
