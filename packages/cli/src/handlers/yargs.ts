import yargs from 'yargs';
import { BaseHandler } from './base';

export interface CLIArguments {
  new?: string;
  command?: string;
  event?: string;
}

export class YargsHandler extends BaseHandler {
  private args: CLIArguments;

  constructor() {
    super();
    this.args = <CLIArguments>yargs
      .option('new', {
        alias: 'n',
        description: 'Create a new yor project'
      })
      .option('command', {
        alias: 'c',
        description: 'Generate a new command component'
      })
      .option('event', {
        alias: 'e',
        description: 'Generate a new event component'
      }).argv;
  }

  hasArgs() {
    return this.args.new || this.args.command || this.args.event;
  }

  getArg(arg: keyof CLIArguments) {
    return this.args[arg];
  }
}
