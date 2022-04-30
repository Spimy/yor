import { Event, BaseEvent } from '@yor/core';

@Event('ready')
export default class extends BaseEvent {
  async execute() {
    console.log('I am ready.');
  }
}
