type Callback = (...args: any[]) => void;

class EventBus {
  private listeners: Map<string, Set<Callback>> = new Map();

  on(event: string, cb: Callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    console.log(`Event listener added: ${event}`);
    this.listeners.get(event)!.add(cb);
  }

  off(event: string, cb: Callback) {
    this.listeners.get(event)?.delete(cb);
  }

  emit(event: string, ...args: any[]) {
    console.log(`Event emitted: ${event}`, ...args);
    this.listeners.get(event)?.forEach((cb) => cb(...args));
  }

  once(event: string, cb: Callback) {
    const wrapper = (...args: any[]) => {
      this.off(event, wrapper);
      cb(...args);
    };
    this.on(event, wrapper);
  }

  clear(event: string) {
    this.listeners.delete(event);
  }
}

const eventBus = new EventBus();
export default eventBus;
