
type token = string;

type Factory<T> = () => T;

 class Container {
    private factories: Map<token, Factory<any>> = new Map();

    private singletons: Map<token, any> = new Map();

    resolve<T>(token: token): T {
        if (this.singletons.has(token)) {
            return this.singletons.get(token);
        }

        const factory = this.factories.get(token);
        if (!factory) {
            throw new Error(`No factory registered for token: ${token}`);
        }

        const instance = factory();
        this.singletons.set(token, instance);
        return instance;
    }

    register<T>(token: token, factory: Factory<T>): void {
        this.factories.set(token, factory);
    }

    registerSingleton<T>(token: token, factory: Factory<T>): void {
        this.factories.set(token, factory);
        this.singletons.set(token, factory());
    }
}   

export const container = new Container();