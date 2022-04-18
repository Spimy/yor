import { CommandData, BaseCommand } from './handlers/command';
import { YorClient } from '../client';
import { Collection } from '../index';

class GlobalStore {
  private client: YorClient;
  private prefix: string = '!';
  private commands: Collection<string, CommandData> = new Collection();
  private aliases: Collection<string, string> = new Collection();

  get $client() {
    return this.client;
  }

  set $client(client: YorClient) {
    this.client = client;
  }

  get $commands() {
    return this.commands;
  }

  get $aliases() {
    return this.aliases;
  }

  get $prefix() {
    return this.prefix;
  }

  set $prefix(prefix: string) {
    this.prefix = prefix;
  }

  public addCommand(target: { new (): BaseCommand }) {
    const command = new target();
    const commandInfo = command.$info;

    this.commands.set(commandInfo.name, {
      ...commandInfo,
      execute: command.execute
    });

    commandInfo.aliases?.forEach((alias) => {
      this.aliases.set(alias, commandInfo.name);
    });

    if (Store.$client.$debug)
      console.log(
        `Loaded command: ${commandInfo.name}.${
          commandInfo.aliases ? ` Aliases: [${commandInfo.aliases}]` : ''
        }`
      );
  }

  public getCommand(name: string): CommandData | undefined {
    return this.commands.get(name) || this.commands.get(this.aliases.get(name));
  }
}

export const Store = new GlobalStore();
