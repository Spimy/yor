export function getEvent(name: string) {
  return `import { Event, BaseEvent } from '@yor/core';

@Event('${name}')
export default class extends BaseEvent {
  // Event parameters: https://discord.js.org/#/docs/discord.js/stable/class/Client
  async execute() {
    
  }
}
`;
}
