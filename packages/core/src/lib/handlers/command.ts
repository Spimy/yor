import { Store } from '../store';
import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  Message,
  PermissionResolvable
} from 'discord.js';

export interface CommandInfo {
  name: string;
  aliases?: string[];
  description: string;
  permissions?: PermissionResolvable[];
  isSlash?: boolean;
}

export type CommandArg = Message | CommandInteraction;

export interface CommandData extends CommandInfo {
  execute: (commandArg: CommandArg, args?: string[]) => Promise<boolean>;
}

export abstract class BaseCommand {
  constructor(private info: CommandInfo & ChatInputApplicationCommandData) {}

  abstract execute(message: CommandArg, args?: string[]): Promise<boolean>;

  get $info(): CommandInfo & ChatInputApplicationCommandData {
    return this.info;
  }
}

export function Command() {
  return (target: { new (): BaseCommand }) => {
    Store.addCommand(target);
  };
}
