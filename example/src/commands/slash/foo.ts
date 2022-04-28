import { Command, BaseCommand, CommandInteraction } from '@yor/core';
import { SlashCommandBuilder } from '@discordjs/builders';

@Command()
export default class extends BaseCommand {
  constructor() {
    super({
      ...new SlashCommandBuilder()
        .setName('foo')
        .setDescription('Foobar')
        .addSubcommand((cmd) => {
          cmd.setName('foobar').setDescription('Send Foobar');
          return cmd;
        })
        .addSubcommand((cmd) => {
          cmd.setName('invalid').setDescription('For testing purposes');
          return cmd;
        }),
      isSlash: true
    });
  }

  async execute(interaction: CommandInteraction) {
    const subcmd = interaction.options.getSubcommand(true);

    if (subcmd === 'foobar') {
      interaction.followUp({ content: 'Foobar' });
    } else {
      interaction.followUp({ content: 'Use the sub command instead.' });
    }

    return true;
  }
}
