import { BaseEvent, Event, Interaction, Store } from '@yor/core';
import { CommandExecutorStore } from '../index';

@Event('interactionCreate')
export default class extends BaseEvent {
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    if (interaction.user.bot) return;

    if (CommandExecutorStore.defer) {
      await interaction.deferReply({ ephemeral: true });
    }

    const command = Store.$commands.get(interaction.commandName);
    await command?.execute(interaction);
  }
}
