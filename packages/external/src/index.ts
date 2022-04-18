import { BaseModule, Command, BaseCommand } from '@muse/core';
import { Message } from 'discord.js';

export class ModuleCommand extends BaseModule {
  constructor() {
    super();

    @Command()
    class ExternalCommand extends BaseCommand {
      constructor() {
        super({
          name: 'external'
        });
      }

      async execute(message: Message) {
        message.channel.send('This is an external command.');
      }
    }
  }
}
