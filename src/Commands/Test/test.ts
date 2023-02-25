import { Commands } from '../../Interfaces';

export const Command: Commands = {
    name: 'ping',
    description: 'pong',
    async execute(client, interaction) {
        await interaction.reply({
            content: `${client.ws.ping}ms`
        });
    }
};