import { ClientEvents } from 'discord.js';
import { Store } from '../store';

export abstract class BaseEvent {
  abstract execute(...args: any[]): Promise<any>;
}

export function Event(event: keyof ClientEvents) {
  return (target: { new (): BaseEvent }) => {
    if (Store.$client.$debug) console.log(`Loaded event: ${event}.`);
    Store.$client.on(event, new target().execute);
  };
}
