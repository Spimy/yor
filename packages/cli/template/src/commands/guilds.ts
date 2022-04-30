import { Command, BaseCommand, Store, Message } from '@yor/core';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'guilds',
      aliases: ['g'],
      description: 'View guilds that the bot is in'
    });
  }

  async execute(message: Message) {
    message.channel.send(
      Store.$client.guilds.cache
        .map((guild) => `**${guild.name}**: ${guild.id}`)
        .join('\n')
    );
    return true;
  }
}
