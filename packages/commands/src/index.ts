import {
  BaseModule,
  Store,
  ModuleWithArgument,
  Event,
  BaseEvent
} from '@muse/core';
import { Message } from 'discord.js';

export type CommandType = 'classic';

export interface CommandExecutorOptions {
  type: CommandType;
  prefix?: string;
}

export class CommandExecutor extends BaseModule {
  constructor({ type, prefix }: CommandExecutorOptions) {
    super();
    Store.$prefix = prefix || Store.$prefix;

    if (type === 'classic') {
      @Event('messageCreate')
      class ReadyEvent extends BaseEvent {
        async execute(message: Message): Promise<void> {
          if (message.author.bot) return;
          if (message.channel.type === 'DM') return;
          if (!message.content.startsWith(Store.$prefix)) return;

          const cmd = message.content.slice(1);
          const args = message.content
            .slice(Store.$prefix.length + cmd.length)
            .split(' ');
          const command = Store.getCommand(cmd.toLowerCase());
          await command?.execute(message, args);
          return;
        }
      }
      return;
    }
  }

  static create(options: CommandExecutorOptions): ModuleWithArgument {
    return {
      module: this,
      args: [options]
    };
  }
}
