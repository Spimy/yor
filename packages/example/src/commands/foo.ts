import { Command, BaseCommand } from '@muse/core';
import { Message } from 'discord.js';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'foo',
    });
  }

  async execute(message: Message) {
    message.channel.send('foobar');
  }
}
