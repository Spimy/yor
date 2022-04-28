require('dotenv').config();
import { YorClient } from '@yor/core';
import { CommandExecutor } from '@yor/commands';

async function bootstrap() {
  const client = new YorClient({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
    root: __dirname,
    slashCommand: {
      enable: true
    },
    modules: [
      CommandExecutor.create({
        type: 'both',
        defer: true
      })
    ],
    debug: true
  });
  await client.login(process.env.TOKEN);
}
bootstrap();
