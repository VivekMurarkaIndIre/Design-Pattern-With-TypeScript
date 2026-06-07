# Changelog

All notable additions to this repo are recorded here.

---

## [Unreleased] — 2026-06-07

### Added — IoC Container (`Web-Design Pattern/IoC Container/`)

Implemented a hand-rolled IoC container applied to an Express product CRUD API. `Container.ts` provides `register`, `registerSingleton`, and `resolve` keyed by string tokens, caching instances as singletons on first use. `registrations.ts` wires `IProductRepository → ProductRepository`, `IProductService → ProductService`, and `ProductController` using lazy factories that chain `container.resolve()` calls. `App.ts` imports `registrations.ts` for its side effects, resolves `ProductController` from the container, and mounts the `router.ts`-generated Express `Router` on `/products`.

**Key concepts shown:** token-based registration, lazy vs. eager singleton instantiation, side-effect imports as registration triggers, constructor injection via container, separation of registration from usage.

---

### Added — Dependency Injection (`Web-Design Pattern/DependencyInjection/`)

Implemented a multi-layer Express notification API that demonstrates Dependency Injection applied at every layer. `ISender` and `INotificationService` define the contracts; `EmailSender` and `SmsSender` are concrete implementations selected by `SenderFactory`. `NotificationService` receives an `ISender` via constructor injection, `NotificationController` receives an `INotificationService` the same way, and `createRoute` in `router.ts` receives the controller as a function parameter. `App.ts` acts as the composition root — the only file that knows about concrete types — wiring all instances together before starting the server on port 3000.

**Key concepts shown:** constructor injection, interface-based dependencies, composition root, factory + DI, function parameter injection.

---

### Added — Layered Architecture (`Web-Design Pattern/Layered Architecture/`)

Implemented a three-layer Express product API that demonstrates the Layered Architecture pattern. The data access layer exposes an `IProductRepository` interface backed by an in-memory `Map`; the business logic layer (`ProductService`) depends on that interface via constructor injection; the presentation layer (`ProductController` + `createProductRoute`) translates HTTP requests into service calls. `App.ts` acts as the composition root, wiring all concrete instances together and starting the server on port 3000.

**Key concepts shown:** single responsibility per layer, interface-based abstraction, DTO pattern, dependency injection, composition root.

---

### Added — Middleware Pattern (`Web-Design Pattern/MiddleWare/`)

Implemented a composable Express middleware pipeline for a `POST /posts` endpoint. Four independent middleware functions — `logger`, `authenticate`, `validateBody`, and `rateLimiter` — are defined in separate files and chained together in `route.ts`. `App.ts` adds a central 4-parameter error handler and starts the server. The `validateBody` middleware is a factory function, demonstrating how to produce parameterized, reusable middleware closures.

**Key concepts shown:** single-responsibility middleware, `next()` contract, middleware factory, short-circuit response, central error handler, in-memory rate limiting with a `Map`.

---

### Changed — `/commit` slash command (`.claude/commands/commit.md`)

Extended the `/commit` skill with a new **Step 6 — Push to remote**: verifies the current branch is `main`, fetches `origin/main`, checks for incoming commits, rebases cleanly if needed, and pushes with `--force-with-lease`. Conflict detection stops the process and guides the user through manual resolution before re-running the command.

**Key concepts shown:** safe rebase-before-push workflow, `--force-with-lease` guard, conflict-resolution guidance.

---

## [Unreleased] — 2026-06-05

### Added — Observer Pattern (`ObserverPattern/`)

Implemented a generic `IObserver<T>` interface and a `StockTracker` subject that broadcasts `StockEvent` objects (symbol, current price, previous price) to all registered observers.

Three concrete observers demonstrate different reactions to the same event stream:
- `DashboardObserver` — renders a price diff with a ▲/▼ arrow in the console.
- `AlertObserver` — fires only when the price crosses a configurable threshold.
- `LoggerObserver` — timestamps every price change.

`subscribe()` and `unsubscribe()` let observers be added and removed at runtime without modifying the subject.

**Key concepts shown:** typed event objects, dynamic subscriber lists, `unsubscribe` by reference.

---

### Added — Decorator Pattern (`DecoratorPattern/`)

Implemented the Decorator pattern around a simple in-memory `StorageService` that satisfies an `IStorageService` interface (`read` / `write`).

An abstract `StorageDecorator` base delegates all calls to its wrapped storage. Two concrete decorators extend it:
- `EncryptionDecorator` — prefixes data with `encrypted::` on write, strips it on read.
- `CompressionDecorator` — prefixes data with `compressed::` on write, strips it on read.

The usage example stacks both decorators — `CompressionDecorator(EncryptionDecorator(StorageService()))` — showing how layers compose transparently: the caller just calls `write()` / `read()` and both layers run in order.

**Key concepts shown:** interface-preserving wrappers, stackable layers, transparent delegation via `super`.

---

### Added — Builder Pattern (`BuilderPattern/`)

Implemented `HTTPRequestBuilder`, a fluent builder for constructing `HTTPRequest` value objects.

Each setter (`url`, `method`, `header`, `body`, `timeout`) returns `this` so calls chain. Headers accumulate across multiple `.header()` calls rather than overwriting. The final `build()` method performs two validations before returning the finished object:
- Rejects requests missing a `url` or `method`.
- Rejects GET requests that include a body.

**Key concepts shown:** method chaining with `this` return type, `Partial<T>` accumulation, cross-field validation at `build()` time.

---

### Added — Factory Pattern (`FactoryPattern/`)

Implemented a payment processor factory. A shared `PaymentInterface` defines `makePayment(amount)` returning either a `PaymentDetail` on success or an `ErrorLog` on failure.

`PaymentFactory.create("Stripe" | "Paypal")` constructs the requested processor. `Caller.ts` consumes the factory without importing the concrete classes, so the calling code is fully decoupled from the implementation.

**Key concepts shown:** static factory method, union-type discriminated merchant key, caller decoupled from concrete classes.
