interface IObserver<T> {
  update(event: T): void;
}

type StockEvent = {
  symbol:        string;
  price:         number;
  previousPrice: number;
};

class StockTracker {
  private observers: IObserver<StockEvent>[] = [];
  private stocks = new Map<string, number>();         // symbol → last price only

  subscribe(observer: IObserver<StockEvent>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver<StockEvent>): void {
    this.observers = this.observers.filter(o => o !== observer); // ✅ reassign
  }

  updatePrice(symbol: string, price: number): void {
    const previousPrice = this.stocks.get(symbol) ?? 0;  // 0 if first time
    this.stocks.set(symbol, price);                       // store latest price

    const event: StockEvent = { symbol, price, previousPrice };
    this.observers.forEach(o => o.update(event));
  }
}

class DashboardObserver implements IObserver<StockEvent> {
  update(stock: StockEvent): void {
    const arrow = stock.price > stock.previousPrice ? "▲" : "▼";
    const diff  = (stock.price - stock.previousPrice).toFixed(2);
    console.log(`[Dashboard] ${stock.symbol} ${arrow} €${stock.price} (${diff > "0" ? "+" : ""}${diff})`);
  }
}

class AlertObserver implements IObserver<StockEvent> {
  constructor(private threshold: number) {}

  update(stock: StockEvent): void {
    if (stock.price > this.threshold) {                  // ✅ direct comparison
      console.log(`[Alert] ${stock.symbol} breached threshold! €${stock.price} > €${this.threshold}`);
    }
  }
}

class LoggerObserver implements IObserver<StockEvent> {
  update(stock: StockEvent): void {
    console.log(`[${new Date().toISOString()}] ${stock.symbol} changed to €${stock.price}`);
  }
}

// Wire up
const tracker = new StockTracker();

const dashboard = new DashboardObserver();
tracker.subscribe(dashboard);
tracker.subscribe(new AlertObserver(150));
tracker.subscribe(new LoggerObserver());

tracker.updatePrice("AAPL", 142.50);
// [Dashboard] AAPL ▲ €142.50 (+142.50)   ← first update, prev was 0
// [Logger]    2026-... AAPL changed to €142.50

tracker.updatePrice("AAPL", 156.00);
// [Dashboard] AAPL ▲ €156.00 (+13.50)
// [Alert]     AAPL breached threshold! €156 > €150   ✅
// [Logger]    2026-... AAPL changed to €156.00

tracker.updatePrice("AAPL", 148.00);
// [Dashboard] AAPL ▼ €148.00 (-8.00)
// [Logger]    2026-... AAPL changed to €148.00

// Unsubscribe works
tracker.unsubscribe(dashboard);
tracker.updatePrice("AAPL", 140.00);  // Dashboard silent ✅