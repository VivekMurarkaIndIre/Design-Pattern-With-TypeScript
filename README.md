# Design Patterns with TypeScript

A hands-on learning repo covering classic Gang-of-Four design patterns implemented in TypeScript, each with a realistic, runnable example.

---

## Patterns covered

### Factory Pattern

**Directory:** `FactoryPattern/`

The Factory pattern delegates object creation to a dedicated factory class instead of calling `new` directly in your business logic. When you need to swap implementations, you change one place — the factory — not every call site.

**This example** models a payment system. `PaymentFactory.create("Stripe" | "Paypal")` returns a concrete processor that satisfies the shared `PaymentInterface`. The caller (`Caller.ts`) never imports `Stripe` or `Paypal` directly, so adding a new processor (e.g. `"Braintree"`) only requires a new class and one `case` in the factory.

| File | Role |
|---|---|
| `PaymentInterface.ts` | Shared types (`PaymentCurrencyAmount`, `ErrorLog`, `PaymentDetail`) and the `PaymentInterface` contract |
| `PaymentFactory.ts` | Static `create()` that maps a merchant string to a concrete class |
| `Stripe.ts` | Stripe implementation |
| `Paypal.ts` | PayPal implementation |
| `Caller.ts` | Entry point — uses the factory without knowing the concrete type |

---

### Builder Pattern

**Directory:** `BuilderPattern/`

The Builder pattern constructs a complex object step-by-step through a fluent chainable API. Each setter returns `this`, so calls can be chained. The final `build()` validates the assembled object before returning it.

**This example** builds an `HTTPRequest` value object. The builder accumulates headers incrementally (multiple `.header()` calls), enforces required fields (`url`, `method`), and rejects impossible combinations (GET + body) — all inside `build()`, keeping invalid states unrepresentable.

| File | Role |
|---|---|
| `HTTPBuilder.ts` | `HTTPRequest` type, `HTTPRequestBuilder` class, and a usage example |

---

### Decorator Pattern

**Directory:** `DecoratorPattern/`

The Decorator pattern wraps an object with one or more layers that add behaviour before/after delegating to the inner object. Decorators implement the same interface as the thing they wrap, so they are interchangeable and stackable.

**This example** wraps a simple in-memory `StorageService` with encryption and compression. `EncryptionDecorator` prefixes data with `encrypted::` on write and strips it on read. `CompressionDecorator` does the same with `compressed::`. The two are stacked: `CompressionDecorator(EncryptionDecorator(StorageService()))` — reads and writes pass through both layers transparently.

| File | Role |
|---|---|
| `StorageDecorator.ts` | `IStorageService` interface, abstract `StorageDecorator` base, `EncryptionDecorator`, `CompressionDecorator`, `StorageService`, and a usage example |
| `StorageDecorator.js` | Compiled JS output |

---

### Observer Pattern

**Directory:** `ObserverPattern/`

The Observer pattern lets a subject broadcast events to any number of subscribers without knowing who they are. Observers register themselves and receive typed event objects whenever state changes.

**This example** tracks stock prices. `StockTracker` maintains a list of `IObserver<StockEvent>` subscribers and fires `update()` on each when a price changes. Three observers demonstrate different reactions: `DashboardObserver` renders a price diff with an arrow, `AlertObserver` fires only when a threshold is breached, and `LoggerObserver` timestamps every change. `unsubscribe()` removes an observer cleanly.

| File | Role |
|---|---|
| `StockObserver.ts` | `IObserver<T>` interface, `StockEvent` type, `StockTracker` subject, three concrete observers, and a wired-up usage example |
| `StockObserver.js` | Compiled JS output |

---

## Running the examples

Each pattern is a self-contained script. Run any file with `ts-node`:

```bash
npx ts-node BuilderPattern/HTTPBuilder.ts
npx ts-node DecoratorPattern/StorageDecorator.ts
npx ts-node FactoryPattern/Caller.ts
npx ts-node ObserverPattern/StockObserver.ts
```

Or compile first and run with Node:

```bash
tsc && node BuilderPattern/HTTPBuilder.js
```

---

## Pattern cheat-sheet

| Pattern | Category | Core idea |
|---|---|---|
| Factory | Creational | Centralise object creation behind a factory method |
| Builder | Creational | Assemble a complex object step-by-step with a fluent API |
| Decorator | Structural | Stack behaviour on top of an object without changing its class |
| Observer | Behavioural | Broadcast state changes to an open-ended set of subscribers |
