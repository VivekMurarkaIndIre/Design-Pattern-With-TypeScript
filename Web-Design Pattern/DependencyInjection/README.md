# Dependency Injection Pattern

## What this pattern is

Dependency Injection (DI) is a technique where an object receives the dependencies it needs from the outside rather than creating them itself. This decouples components from their concrete collaborators, making code easier to test, extend, and swap. The class declares what it needs (via an interface), and a separate composition root decides which concrete implementation to supply.

## What this implementation does

An Express notification API that shows DI applied at every layer:

| File | Role |
|---|---|
| `ISender.ts` | Low-level interface — `send(to, message)` |
| `INotificationService.ts` | Mid-level interface — `notify(to, message)` |
| `EmailSender.ts` | Concrete `ISender` — logs an email send |
| `SmsSender.ts` | Concrete `ISender` — logs an SMS send |
| `SenderFactory.ts` | Static factory — returns the right `ISender` given `"email"` or `"sms"` |
| `NotificationService.ts` | Implements `INotificationService`; receives an `ISender` via **constructor injection** |
| `NotificationController.ts` | Receives an `INotificationService` via **constructor injection**; exposes `sendNotification` |
| `router.ts` | Express route factory; receives `NotificationController` via **function parameter injection** |
| `App.ts` | **Composition root** — wires everything together and starts the server on port 3000 |

`App.ts` is the only place that knows about concrete types. Every other file depends only on interfaces.

## Key concepts shown

- **Constructor injection** — `NotificationService` and `NotificationController` declare their dependency in the constructor signature
- **Interface-based dependencies** — callers depend on `ISender` / `INotificationService`, not the concrete class
- **Composition root** — `App.ts` is the single place where all concrete objects are instantiated and wired
- **Factory + DI** — `SenderFactory` isolates the `new` keyword; the result is injected downstream
- **Function parameter injection** — `createRoute` receives the controller as a parameter, keeping routing logic framework-agnostic

## How to run

```bash
npx ts-node "Web-Design Pattern/DependencyInjection/App.ts"
```

Then POST to the running server:

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"to": "user@example.com", "message": "Hello"}'
```
