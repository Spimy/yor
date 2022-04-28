import { Client, ClientOptions } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Module, ModuleConstructor } from './lib/module';
import { Store } from './lib/store';

import path from 'path';
import glob from 'glob';

export type YorClientModules = 'commands' | 'events';

export interface SlashCommandConfig {
  enable: boolean;
  guildId?: string;
}

export interface YorClientOptions extends ClientOptions {
  root: string;
  slashCommand?: SlashCommandConfig;
  commandsFolder?: string;
  eventsFolder?: string;
  modules?: Module[];
  debug?: boolean;
}

export class YorClient extends Client {
  private root: string;
  private slashCommand: SlashCommandConfig;
  private commandsFolder: string;
  private eventsFolder: string;
  private modules: Module[];
  private debug: boolean;

  constructor(options: YorClientOptions) {
    super(options);

    this.root = options.root;
    this.slashCommand = options.slashCommand || { enable: false };
    this.commandsFolder = options.commandsFolder || 'commands';
    this.eventsFolder = options.eventsFolder || 'events';
    this.modules = options.modules || [];
    this.debug = options.debug || false;

    Store.$client = this;

    this.loadModule('commands');
    this.loadModule('events');

    this.installExternalModules();

    if (this.slashCommand.enable) {
      this.registerSlashCommands();
    }
  }

  private loadModule(module: YorClientModules) {
    const folder =
      module === 'commands' ? this.commandsFolder : this.eventsFolder;
    const folderPath = path.join(this.root, folder);

    glob(path.join(folderPath, '**', '*.{js,ts}'), (err, files) => {
      if (err) throw new Error('Path provided not found');
      files.forEach((file) => require(file));
    });
  }

  private installExternalModules() {
    const hasDupe = new Set(this.modules).size !== this.modules.length;
    if (hasDupe) throw new Error('Duplicate modules found.');

    this.modules.forEach((module) => {
      if ('module' in module) {
        new (module.module as ModuleConstructor)(...module.args);
      } else {
        new (module as ModuleConstructor)();
      }
    });
  }

  private registerSlashCommands() {
    this.on('ready', async () => {
      const slashCommands = Store.$commands.filter((cmd) => cmd.isSlash);
      const rest = new REST({ version: '9' }).setToken(this.token);

      if (!slashCommands.size) {
        console.warn(
          "You have not created any slash commands. Make sure 'isSlash' property is set to true for the slash command."
        );
      }

      try {
        if (typeof this.slashCommand.guildId !== 'undefined') {
          await rest.put(
            Routes.applicationGuildCommands(
              this.user.id,
              this.slashCommand.guildId
            ),
            {
              body: slashCommands
            }
          );
          console.log(
            `Successfully registered application commands for guild ${this.slashCommand.guildId}.`
          );
        } else {
          await rest.put(Routes.applicationCommands(this.user.id), {
            body: slashCommands
          });
          console.log(
            "Successfully registered application commands for all guilds that have 'application.commands' scope authorized for your bot."
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  get $debug() {
    return this.debug;
  }
}
