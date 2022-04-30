import yargs from 'yargs';
import { CLIArguments } from './cli';
import { BaseHandler } from './base';

export class YargsHandler extends BaseHandler {
  private args: CLIArguments;

  constructor() {
    super();
    this.args = <CLIArguments>yargs
      .option('new', {
        alias: 'n',
        description: 'Create a new yor project'
      })
      .option('generate', {
        alias: 'g',
        description: 'Generate a new yor component'
      }).argv;
  }

  hasArgs() {
    return this.args.new || this.args.generate;
  }

  getArg(arg: keyof CLIArguments) {
    return this.args[arg];
  }
}
