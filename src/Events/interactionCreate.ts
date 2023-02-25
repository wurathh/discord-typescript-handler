import { Events } from "../Interfaces";

export const Event : Events = {
    name: "interactionCreate",
    once: false,
    execute(client, interaction) {
        try {           
            if (!interaction.isChatInputCommand()) return;
                const command = client.commands.get(interaction.commandName);
                if (!command) return;
                command.execute(client, interaction);
            } catch(err) {
                console.error(err);
            };
    }
}