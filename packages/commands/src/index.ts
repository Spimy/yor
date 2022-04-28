import { BaseModule, Store, ModuleWithArgument } from '@yor/core';

export type CommandType = 'classic' | 'slash' | 'both';

export interface CommandExecutorOptions {
  type: CommandType;
  prefix?: string;
  defer?: boolean;
}

export interface CommandExecutorStoreOptions {
  defer?: boolean;
}

export const CommandExecutorStore: CommandExecutorStoreOptions = {
  defer: false
};

export class CommandExecutor extends BaseModule {
  constructor({ type, prefix, defer }: CommandExecutorOptions) {
    super();
    Store.$prefix = prefix || Store.$prefix;
    CommandExecutorStore.defer = defer || false;

    switch (type) {
      case 'classic': {
        require('./events/message-create');
        break;
      }
      case 'slash': {
        require('./events/interaction-create');
        break;
      }
      case 'both': {
        require('./events');
        break;
      }
    }
  }

  static create(options: CommandExecutorOptions): ModuleWithArgument {
    return {
      module: this,
      args: [options]
    };
  }
}
