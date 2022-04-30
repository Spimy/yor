import { ComponentType } from './cli';
import { getCommand } from '../components/command';
import { mkdir, copySync, writeFileSync, existsSync } from 'fs-extra';

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
    if (!existsSync(path.join(process.cwd(), 'yor.json'))) {
      console.error(
        `${chalk.redBright(
          '× Error:'
        )} Components can only be generated in a 'yor' project.`
      );
      process.exit(1);
    }

    if (component === 'command') {
      this.generateCommand(name);
    }
  }

  private generateCommand(name: string) {
    const componentName = this.toKebabCase(name.split('/').pop());
    const subfolderCounter = name.split('/').length;
    let file: string;

    if (subfolderCounter >= 2) {
      const category = name.split('/').slice(0, name.split('/').length - 1);
      file = path.join(...category, `${componentName}.ts`);
    } else {
      file = `${componentName}.ts`;
    }

    const dest = path.join(process.cwd(), 'src', 'commands', file);
    if (existsSync(dest)) {
      console.error(`${chalk.redBright('× Error:')} Component already exist.`);
      process.exit(1);
    }

    const commandeCode = getCommand(componentName);
    this.writeFileSyncRecursive(dest, commandeCode);

    console.log(
      `${chalk.green('✔️ Success:')} Generated command '${file}' successfully.`
    );
  }

  private writeFileSyncRecursive(componentPath: string, content: string) {
    const folders = componentPath.split(path.sep).slice(0, -1);
    if (folders.length) {
      // Create folder path if it doesn't exist
      folders.reduce((last, folder) => {
        const folderPath = last ? last + path.sep + folder : folder;
        if (!existsSync(folderPath)) {
          mkdir(folderPath);
        }
        return folderPath;
      });
    }
    writeFileSync(componentPath, content, 'utf-8');
  }

  private toKebabCase(str: string) {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )!
      .map((x) => x.toLowerCase())
      .join('-');
  }
}
