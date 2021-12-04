import Collection from '@discordjs/collection';
import { CommandData, BaseCommand } from './command';

class CommandStore {
  private commands: Collection<string, CommandData> = new Collection();
  private aliases: Collection<string, string> = new Collection();

  get $commands() {
    return this.commands;
  }

  get $aliases() {
    return this.aliases;
  }

  public addCommand(target: { new (): BaseCommand }) {
    const command = new target();
    const commandInfo = command.$info;

    this.commands.set(commandInfo.name, {
      ...commandInfo,
      execute: command.execute,
    });

    commandInfo.aliases?.forEach((alias) => {
      this.aliases.set(alias, commandInfo.name);
    });
  }

  public getCommand(name: string) {
    return this.commands.get(name) || this.commands.get(this.aliases.get(name));
  }
}

export const Store = new CommandStore();
