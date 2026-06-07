# Layered Architecture Pattern

## What is it?

Layered Architecture (also called N-Tier Architecture) organises an application into horizontal layers where each layer has a distinct responsibility and communicates only with the layer directly below it. The classic web-server stack has three layers: **Presentation** (routes/controllers), **Business Logic** (services), and **Data Access** (repositories). Dependencies flow strictly downward — the presentation layer never touches the database, and the data layer never knows about HTTP.

## What this implementation does

An Express-based product API is built across six files that each live in exactly one layer:

| File | Layer | Role |
|---|---|---|
| `Product.ts` | Shared types | Defines the `Product` type and `CreateProductDTO` value object |
| `ProductRepository.ts` | Data Access | `IProductRespository` interface + `ProductRepository` class backed by an in-memory `Map` |
| `ProductService.ts` | Business Logic | `ProductService` class — receives a `CreateProductDTO`, delegates persistence to the repo |
| `ProductController.ts` | Presentation | `ProductController` class — translates raw `Product` objects into DTOs before calling the service |
| `ProductRouter.ts` | Presentation | `createProductRoute()` wires Express `Router` endpoints to controller methods |
| `App.ts` | Composition root | Instantiates every layer manually and starts the Express server on port 3000 |

The `App.ts` composition root is the only place that knows about all the concrete classes. Every other file depends on abstractions or the layer immediately below it.

## Key concepts shown

- **Single Responsibility per Layer** — routing, business rules, and persistence are never mixed in the same file
- **Interface-based abstraction** — `ProductService` depends on `IProductRespository`, not on `ProductRepository` directly, making the data layer swappable
- **DTO (Data Transfer Object)** — `CreateProductDTO` carries only the fields needed to create a product, keeping the internal `Product` type (which includes `id`) out of the caller's hands
- **Dependency Injection** — each class receives its collaborators via the constructor; `App.ts` is the single wiring point
- **Composition root** — `App.ts` assembles the object graph once so no layer has to import any other layer's concrete class

## How to run

```bash
npx ts-node "Web-Design Pattern/Layered Architecture/App.ts"
```

The server listens on `http://localhost:3000`. Requests to `/product` are handled by the router.
