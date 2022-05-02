import { YargsHandler } from './yargs';
import { PromptHandler } from './prompt';

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

    const commandName = yargs.getArg('command');
    if (commandName) {
      yargs.generateComponent(commandName, 'command');
      return;
    }

    const eventName = yargs.getArg('event');
    if (commandName) {
      yargs.generateComponent(eventName, 'event');
      return;
    }
  }
}
