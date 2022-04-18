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
        type: 'classic' // 'classic' is the only available type right now and 'slash' will be implemented later
      })
    ]
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
```
