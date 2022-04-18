import { ClientEvents } from '../../index';
import { Store } from '../store';

export abstract class BaseEvent {
  abstract execute(...args: any[]): Promise<void>;
}

export function Event(event: keyof ClientEvents) {
  return (target: { new (): BaseEvent }) => {
    if (Store.$client.$debug) console.log(`Loaded event: ${event}`);
    Store.$client.on(event, new target().execute);
  };
}
