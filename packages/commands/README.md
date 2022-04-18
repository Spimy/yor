# Muse Commands

This is an external module for [Muse Core](https://github.com/Spimy/muse/tree/main/packages/core) that handles the event for executing a command.

If you need more control over how commands are executed in your `messageCreate` event, it is highly recommended that you handle your own event listener for this task.

## Import into bot

```ts
require('dotenv').config();
import { MuseClient } from '@muse/core';
import { CommandExecutor } from '@muse/commands';

async function bootstrap() {
  const client = new MuseClient({
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
