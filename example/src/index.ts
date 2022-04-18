require('dotenv').config();
import { YorClient } from '@yor/core';
import { CommandExecutor } from '@yor/commands';

async function bootstrap() {
  const client = new YorClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    modules: [
      CommandExecutor.create({
        type: 'classic'
      })
    ],
    debug: true
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
