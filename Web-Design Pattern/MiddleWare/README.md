# Middleware Pattern

## What is it?

The Middleware pattern (also called the Pipeline or Chain of Responsibility pattern in a web context) structures request processing as a sequence of independent handler functions. Each handler does one thing, then either calls `next()` to pass the request to the next handler or short-circuits by sending a response. The calling code simply stacks the handlers in order — no single handler needs to know about any other.

## What this implementation does

A minimal Express API for a `POST /posts` endpoint demonstrates four composable middleware functions chained together in `route.ts`:

| File | Middleware | Role |
|---|---|---|
| `Logger.ts` | `logger` | Logs `[ISO-timestamp] METHOD /url` to the console on every request |
| `Authenticate.ts` | `authenticate` | Reads the `x-api-key` header; rejects with `401` if missing or not equal to `"secret123"` |
| `Validate.ts` | `validateBody(fields)` | Factory that returns a middleware; rejects with `400` if any required body field is absent |
| `RateLimiter.ts` | `rateLimiter` | Tracks request counts per `authorId` in a `Map`; blocks with `429` if more than 3 requests arrive within 60 seconds |
| `route.ts` | `createRoute()` | Chains all four middleware onto `router.post("/", ...)` before the final handler |
| `App.ts` | Composition root | Mounts the route, adds a central 4-parameter error handler, and starts the server on port 3000 |

Each middleware is completely independent: `logger` does not import `authenticate`, and so on. The pipeline is assembled once in `route.ts`.

## Key concepts shown

- **Single-responsibility middleware** — each file handles exactly one cross-cutting concern
- **`next()` contract** — calling `next()` passes control forward; omitting it (while also not sending a response) silently stalls the request
- **Middleware factory** — `validateBody(requiredFields)` returns a configured middleware closure, demonstrating how to parameterise reusable middleware
- **Short-circuit response** — any middleware can terminate the chain early by sending a response without calling `next()`
- **Central error handler** — `App.ts` registers an Express error handler with exactly four parameters `(err, req, res, next)` as the last `app.use` call, centralising error responses
- **In-memory state in middleware** — `RateLimiter.ts` shows how module-level state (a `Map`) persists across requests to implement rate limiting

## How to run

```bash
npx ts-node "Web-Design Pattern/MiddleWare/App.ts"
```

The server listens on `http://localhost:3000`. Test it with:

```bash
# Should pass (correct key, all fields present)
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret123" \
  -d '{"title":"Hello","content":"World","authorId":"user1"}'

# Should fail with 401 (missing API key)
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"World","authorId":"user1"}'
```
