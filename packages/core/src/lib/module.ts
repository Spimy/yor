import { MuseClient } from '../client';

export interface ModuleWithArgument {
  module: typeof BaseModule;
  args: any[];
}

export type Module = ModuleWithArgument | typeof BaseModule;

export interface ModuleConstructor {
  new (client: MuseClient, args?: any[]): BaseModule;
}

export interface BaseModule {
  create?(args: any | any[]): ModuleWithArgument;
}

export abstract class BaseModule {
  constructor(protected client: MuseClient) {}

  static initialiseWithArguments(args: any[]): ModuleWithArgument {
    return {
      module: this,
      args,
    };
  }
}
