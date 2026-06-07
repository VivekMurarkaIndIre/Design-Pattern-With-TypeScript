# IoC Container Pattern

## What this pattern is

An Inversion of Control (IoC) Container is a registry that owns object creation and wires dependencies automatically. Instead of classes calling `new` on their collaborators, they declare what they need (via a string token) and ask the container to supply it. The container holds factories and caches the resulting instances, so callers never know — or care — which concrete class they received.

## What this implementation does

A hand-rolled IoC container applied to an Express product CRUD API. Every concrete type is registered once in `registrations.ts` and resolved from the container in `App.ts`.

| File | Role |
|---|---|
| `Container.ts` | The container itself — `register`, `registerSingleton`, and `resolve` keyed by string tokens; instances are cached as singletons on first resolve |
| `Product.ts` | `Product` value type and `CreateProductDTO` — the data shapes used across all layers |
| `IProductRepository.ts` | Data-access interface — `getProducts`, `saveProduct`, `findProductById` |
| `IProductService.ts` | Service interface — mirrors the repository contract for this example |
| `ProductRepository.ts` | In-memory `Map`-backed implementation of `IProductRepository`; uses `crypto.randomUUID()` for IDs |
| `ProductService.ts` | Implements `IProductService`; receives an `IProductRepository` via **constructor injection** |
| `ProductController.ts` | Receives an `IProductService` via **constructor injection**; delegates all HTTP-level calls |
| `registrations.ts` | Wires the container — registers `IProductRepository`, `IProductService`, and `ProductController` with lazy factories that chain `container.resolve()` calls |
| `router.ts` | Express `Router` factory; receives `ProductController` as a parameter and mounts `GET /`, `POST /`, `GET /:id` |
| `App.ts` | Entry point — imports `./registrations` for its side effects, resolves `ProductController` from the container, and starts the server on port 3000 |

## Key concepts shown

- **Token-based registration** — string keys (`"IProductRepository"`, `"IProductService"`, `"ProductController"`) decouple the consumer from the concrete type
- **Lazy instantiation** — `register` stores a factory; the instance is created only on the first `resolve()` call, then cached in the singletons map
- **Eager singleton** — `registerSingleton` creates the instance immediately at registration time and stores it in both maps
- **Side-effect import as registration trigger** — `import "./registrations"` in `App.ts` executes all `container.register()` calls before any resolve happens
- **Constructor injection via the container** — factories pass `container.resolve(...)` calls as constructor arguments, so each layer depends only on the interface it declared
- **Separation of concerns** — `Container.ts` knows nothing about products; `registrations.ts` knows nothing about HTTP; `router.ts` knows nothing about the container

## How to run

```bash
npx ts-node "Web-Design Pattern/IoC Container/App.ts"
```

Then interact with the API:

```bash
# Create a product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 9.99, "stock": 100}'

# List all products
curl http://localhost:3000/products

# Find by ID
curl http://localhost:3000/products/<id>
```
