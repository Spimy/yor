import { Command, BaseCommand } from '@muse/core';
import { Message } from 'discord.js';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      aliases: ['t'],
      description: 'A test command that simply sends test back to the user.',
    });
  }

  async execute(message: Message) {
    message.channel.send('test');
  }
}