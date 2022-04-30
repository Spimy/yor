import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { BaseHandler } from './base';
import { ComponentType, componentTypes, Operation, operations } from './cli';

export class PromptHandler extends BaseHandler {
  public async display() {
    clear();

    console.log(
      chalk.red(figlet.textSync('YorCLI', { horizontalLayout: 'full' }))
    );

    await this.promptOperations();
  }

  private async promptOperations() {
    const prompt = inquirer.createPromptModule();

    const { operation } = <{ operation: Operation }>await prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'What would you like to do?',
        choices: operations
      }
    ]);

    if (operation === 'Create new project') {
      const name = await this.promptProjectName();
      this.createProject(name);
    } else {
      const { name, type } = await this.promptGenerateOperations();
      this.generateComponent(name, type);
    }
  }

  private async promptGenerateOperations() {
    const prompt = inquirer.createPromptModule();

    interface Component {
      type: ComponentType;
      name: string;
    }

    return <Component>await prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to do?',
        choices: componentTypes
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name of component:'
      }
    ]);
  }

  private async promptProjectName() {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Name of project:'
    });

    return name as string;
  }
}
