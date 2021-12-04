require('dotenv').config();
import { MuseClient } from '@muse/core';
import { CommandExecutor } from '@muse/commands';

async function bootstrap() {
  const client = new MuseClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    modules: [
      CommandExecutor.create({
        type: 'classic',
      }),
    ],
  });
  await client.login(process.env.TOKEN);

  client.on('ready', () => console.log('Ready'));
}
bootstrap();
