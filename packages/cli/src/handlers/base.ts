import { ComponentType } from './cli';
import { mkdir, copySync, accessSync, constants } from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export abstract class BaseHandler {
  createProject(name: string) {
    mkdir(`./${name}`, (err) => {
      if (err) {
        console.error(`${chalk.redBright('× Error:')} ${err.message}`);
        process.exit(1);
      }

      const src = path.join(path.resolve(__dirname), '..', '..', 'template');
      const dest = path.join(process.cwd(), name);

      copySync(src, dest, { overwrite: false });

      console.log(
        `${chalk.green('✔️ Success:')} Project '${name}' successfully created.`
      );
      console.log(
        `${chalk.blueBright('i Info:')} Run 'cd ${name} && npm install'.`
      );
      process.exit(0);
    });
  }

  generateComponent(name: string, component: ComponentType) {
    if (!this.isYorProject()) {
      console.error(
        `${chalk.redBright(
          '× Error:'
        )} Components can only be generated in a 'yor' project.`
      );
      process.exit(1);
    }

    const componentName = this.toKebabCase(name);
    if (!componentName) {
      console.error(
        `${chalk.redBright('× Error:')} Component name provided is not allowed.`
      );
      process.exit(1);
    }

    console.log(componentName);
  }

  private isYorProject() {
    try {
      accessSync(path.join(process.cwd(), 'yor.json'));
      return true;
    } catch {
      return false;
    }
  }

  private toKebabCase(str: string) {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.toLowerCase())
      .join('-');
  }
}
