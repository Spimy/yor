import { BaseModule, MuseClient, Store } from '@muse/core';
import { Message } from 'discord.js';

export type CommandType = 'classic' | 'slash';

export interface CommandExecutorOptions {
  type: CommandType;
  prefix?: string;
}

export class CommandExecutor extends BaseModule {
  constructor(client: MuseClient, { type, prefix }: CommandExecutorOptions) {
    super(client);

    if (type === 'classic') {
      client.on('messageCreate', async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return;
        if (!message.content.startsWith(prefix || '!')) return;

        const cmd = message.content.slice(1);
        const command = Store.getCommand(cmd.toLowerCase());
        if (command) {
          command.execute(message);
        }
      });
    }
  }

  static create(options: CommandExecutorOptions) {
    return BaseModule.initialiseWithArguments([options]);
  }
}
