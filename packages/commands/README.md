# Yor Commands

This is an external module for [Yor Core](https://github.com/Spimy/yor/tree/main/packages/core) that handles the event for executing a command.

If you need more control over how commands are executed in your `messageCreate` event, it is highly recommended that you handle your own event listener for this task.

## Import into bot

```ts
require('dotenv').config();
import { YorClient } from '@yor/core';
import { CommandExecutor } from '@yor/commands';

async function bootstrap() {
  const client = new YorClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    modules: [
      CommandExecutor.create({
        type: 'classic' // 'classic', 'slash', 'both'
      })
    ]
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
```

## Available Options

Aside from being able to specify the `type` of command the module should handle, there are other options.

One of them is the ability to set the prefix that is used for `classic` type of command. It is by default set to `!` by [@yor/core](https://github.com/Spimy/yor/tree/main/packages/core/).

The last one is whether or not the slash command executor should defer the interaction or not. This is set to `false` by default.

Here's an example of how it'll look like with all options being used:

```ts
CommandExecutor.create({
  type: 'classic', // 'classic', 'slash', 'both'
  prefix: '>',
  defer: true
});
```
