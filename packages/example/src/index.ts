require('dotenv').config();
import { MuseClient } from '@muse/core';
import { CommandExecutor } from '@muse/commands';
import { ModuleCommand } from '@muse/external';

async function bootstrap() {
  const client = new MuseClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    modules: [
      CommandExecutor.create({
        type: 'classic'
      }),
      ModuleCommand
    ],
    debug: true
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
