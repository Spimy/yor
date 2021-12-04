import { Store } from './store';
import { Message, PermissionResolvable } from 'discord.js';

export interface CommandInfo {
  name: string;
  aliases?: string[];
  description?: string;
  permissions?: PermissionResolvable[];
}

export interface CommandData extends CommandInfo {
  execute?: (message: Message) => Promise<void>;
}

export abstract class BaseCommand {
  constructor(private info: CommandInfo) {}

  abstract execute(message: Message): Promise<void>;

  get $info(): CommandInfo {
    return { ...this.info };
  }
}

export function Command() {
  return (target: { new (): BaseCommand }) => Store.addCommand(target);
}
