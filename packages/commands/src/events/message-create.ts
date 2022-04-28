import { BaseEvent, Event, Message, Store } from '@yor/core';

@Event('messageCreate')
export default class extends BaseEvent {
  async execute(message: Message) {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') return;
    if (!message.content.startsWith(Store.$prefix)) return;

    const cmd = message.content.slice(1);
    const args = message.content
      .slice(Store.$prefix.length + cmd.length)
      .split(' ');
    const command = Store.getCommand(cmd.toLowerCase());
    await command?.execute(message, args);
  }
}
