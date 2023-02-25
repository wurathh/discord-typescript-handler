import { GatewayIntentBits } from 'discord.js';
import Client from './Client';

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
    ],
    allowedMentions: {
        parse: ["everyone", "roles", "users"]
    },
});

client.init()