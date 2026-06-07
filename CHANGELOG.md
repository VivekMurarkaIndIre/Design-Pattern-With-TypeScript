# Changelog

All notable additions to this repo are recorded here.

---

## [Unreleased] — 2026-06-07

### Added — Layered Architecture (`Web-Design Pattern/Layered Architecture/`)

Implemented a three-layer Express product API that demonstrates the Layered Architecture pattern. The data access layer exposes an `IProductRepository` interface backed by an in-memory `Map`; the business logic layer (`ProductService`) depends on that interface via constructor injection; the presentation layer (`ProductController` + `createProductRoute`) translates HTTP requests into service calls. `App.ts` acts as the composition root, wiring all concrete instances together and starting the server on port 3000.

**Key concepts shown:** single responsibility per layer, interface-based abstraction, DTO pattern, dependency injection, composition root.

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
