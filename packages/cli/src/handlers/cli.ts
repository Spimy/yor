import { YargsHandler } from './yargs';
import { PromptHandler } from './prompt';

export interface CLIArguments {
  new?: string;
  generate?: string;
}

export const operations = [
  'Create new project',
  'Generate new component'
] as const;
export type Operation = typeof operations[number];

export const componentTypes = ['command', 'event'] as const;
export type ComponentType = typeof componentTypes[number];

export class CLIHandler {
  constructor() {
    const yargs = new YargsHandler();

    if (!yargs.hasArgs()) {
      const prompt = new PromptHandler();
      prompt.display();
      return;
    }

    const projectName = yargs.getArg('new');
    if (projectName) {
      yargs.createProject(projectName);
      return;
    }
  }
}
