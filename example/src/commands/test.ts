import { Command, BaseCommand } from '@yor/core';
import { Message } from 'discord.js';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      aliases: ['t', 'te'],
      description: 'A test command that simply sends test back to the user.'
    });
  }

  async execute(message: Message) {
    message.channel.send('test');
  }
}
