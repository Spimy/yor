export function getCommand(name: string) {
  return `import { Command, BaseCommand, Message } from '@yor/core';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: '${name.replace(/\s/g, '')}',
      description: ''
    })
  }

  // Change to CommandInteraction if using slash commands
  async execute(message: Message) {
    return true;
  }
}
`;
}
