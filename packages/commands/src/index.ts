import { BaseModule, MuseClient, Store, ModuleWithArgument } from '@muse/core';
import { Message } from 'discord.js';

export type CommandType = 'classic' | 'slash';

export interface CommandExecutorOptions {
  type: CommandType;
  prefix?: string;
}

export class CommandExecutor extends BaseModule {
  constructor(client: MuseClient, { type, prefix }: CommandExecutorOptions) {
    super(client);
    Store.$prefix = prefix || Store.$prefix;

    if (type === 'classic') {
      client.on('messageCreate', async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return;
        if (!message.content.startsWith(Store.$prefix)) return;

        const cmd = message.content.slice(1);
        const args = message.content
          .slice(Store.$prefix.length + cmd.length)
          .split(' ');
        const command = Store.getCommand(cmd.toLowerCase());
        if (command) {
          command.execute(message, args);
        }
      });
    }
  }

  static create(options: CommandExecutorOptions): ModuleWithArgument {
    return {
      module: this,
      args: [options],
    };
  }
}
