import { Command, BaseCommand, Message } from '@yor/core';
import { CommandInteraction } from 'discord.js';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      aliases: ['t', 'te'],
      description: 'A test command that simply sends test back to the user.',
      options: [
        {
          name: 'test',
          description: 'test command',
          type: 1 // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
        }
      ],
      isSlash: true
    });
  }

  async execute(interaction: CommandInteraction) {
    const subcmd = interaction.options.getSubcommand(true);

    if (subcmd === 'test') {
      await interaction.followUp({ content: 'test' });
    }

    return true;
  }
}
