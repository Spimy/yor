import { Command, BaseCommand, Message } from '@yor/core';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'foo'
    });
  }

  async execute(message: Message) {
    message.channel.send('foobar');
  }
}
