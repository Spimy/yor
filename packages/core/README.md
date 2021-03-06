# Yor Core

Yor Core is a [Discord.JS](https://discord.js.org/) wrapper made to simplify the setup needed to create a Discord Bot using [NodeJS](https://nodejs.org/)

Behind the scenes, this automatically handles commands and events. In other words, there is no need for you to write code in order to load commands and events. By default, the folder for commands and events are named `commands` and `events` respectively. If your commands and events code are stored in a different folder, you can specify them in the constructor of `YorClient`.

## Example Bot

Check the [Example Bot on GitHub](https://github.com/Spimy/yor/tree/main/example) to get a full look.

```ts
require('dotenv').config();
import { YorClient } from '@yor/core';

async function bootstrap() {
  const client = new YorClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'], // Discord.JS requires intents for certain endpoint access
    root: __dirname, // required: should always be __dirname
    commandsFolder: 'commands', // optional: path the commands folder or name of the folder if located in src root
    eventsFolder: 'events', // optional: path the events folder or name of the folder if located in src root
    debug: true, // optional: log commands and events that are loaded
    modules: [], // optional: load external modules that users have created and published
    slashCommand: {
      // optional: undefined by default
      enable: true, // required if the 'slashCommand' option is used
      guildId: '<guild_id>' // optional: if not specified, slash commands will be loaded for all guilds that authorized the 'application.commands' scope for the bot
    }
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
```

## Commands

The commands should return a `boolean` value. This can then be used to handle errors more easily.

If the command returns `true` then it should be considered successfully executed or `false` otherwise.

### Classic command

```ts
// src/commands/test.ts
import { Command, BaseCommand, Message } from '@yor/core';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      aliases: ['t', 'te'],
      description: 'A test command that simply sends test back to the user.'
    });
  }

  async execute(message: Message) {
    message.channel.send('test');
    return true;
  }
}
```

### Slash command

```ts
// src/commands/slash/test.ts
import { Command, BaseCommand, CommandInteraction } from '@yor/core';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      description: 'A test command that simply sends test back to the user.',
      isSlash: true // VERY IMPORTANT!!
    });
  }

  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();
    await interaction.followUp('test');
    return true;
  }
}
```

## Events

```ts
// src/events/ready.ts
import { Event, BaseEvent } from '@yor/core';

@Event('ready')
export default class extends BaseEvent {
  async execute() {
    console.log('I am ready.');
  }
}
```

## Creating a Custom External Module

This should be done as a separate project instead of together as in the same bot.

You should only create custom external modules if you plan on releasing it for public use on NPM.

Make sure the external module project has `@yor/core` as dependency.

### No addional arguments

```ts
// External command example
import { BaseModule, Command, BaseCommand, Message } from '@yor/core';

export class ModuleCommand extends BaseModule {
  constructor() {
    super();

    @Command()
    class ExternalCommand extends BaseCommand {
      constructor() {
        super({
          name: 'external'
        });
      }

      async execute(message: Message) {
        message.channel.send('This is an external command.');
      }
    }
  }
}
```

#### Load it into your client

```ts
require('dotenv').config();
import { YorClient } from '@yor/core';
import { ModuleCommand } from '<external_module_command>';

async function bootstrap() {
  const client = new YorClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    debug: true,
    modules: [ModuleCommand]
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
```

### With additional arguments

```ts
// External event example
import {
  BaseModule,
  Store,
  ModuleWithArgument,
  Event,
  BaseEvent
} from '@yor/core';

export interface ModuleEventOptions {
  listGuilds?: boolean;
}

export class ModuleEvent extends BaseModule {
  constructor({ listGuilds }: ModuleEventOptions) {
    super();

    @Event('ready')
    class ExternalEvent extends BaseCommand {
      async execute() {
        if (listGuilds) {
          console.log(
            Store.$client.guilds.cache
              .map((guild) => `${guild.name}: ${guild.id}`)
              .join('\n')
          );
        }
        console.log(`${Store.$client.user.tag} is ready.`);
      }
    }
  }

  static create(options: ModuleEventOptions): ModuleWithArgument {
    return {
      module: this,
      args: [options]
    };
  }
}
```

#### Load it into your client

```ts
require('dotenv').config();
import { YorClient } from '@yor/core';
import { ModuleEvent } from '<external_module_event>';

async function bootstrap() {
  const client = new YorClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    debug: true,
    modules: [ModuleEvent.create({ listGuilds: true })]
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
```
