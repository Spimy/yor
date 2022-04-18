import { Event, BaseEvent } from '@yor/core';

@Event('ready')
export default class extends BaseEvent {
  async execute(): Promise<void> {
    console.log('I am ready.');
    return;
  }
}
