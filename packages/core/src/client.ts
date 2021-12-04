import { Client, ClientOptions } from 'discord.js';
import { Module, ModuleConstructor } from './lib/module';
import path from 'path';
import glob from 'glob';

export type MuseClientModules = 'commands' | 'events';

export interface MuseClientOptions extends ClientOptions {
  root: string;
  commandsFolder?: string;
  eventsFolder?: string;
  modules?: Module[];
}

export class MuseClient extends Client {
  private root: string;
  private commandsFolder: string;
  private eventsFolder: string;
  private modules: Module[];

  constructor(options: MuseClientOptions) {
    super(options);

    this.root = options.root;
    this.commandsFolder = options.commandsFolder || 'commands';
    this.eventsFolder = options.eventsFolder || 'events';
    this.modules = options.modules || [];

    this.loadModule('commands');
    this.loadModule('events');

    this.installExternalModules();
  }

  private loadModule(module: MuseClientModules) {
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
        new (module.module as ModuleConstructor)(this, ...module.args);
      } else {
        new (module as ModuleConstructor)(this);
      }
    });
  }
}
