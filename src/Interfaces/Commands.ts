import { CommandInteraction, LocalizationMap } from 'discord.js';
import Client from '../Client';

interface Options {
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    name: string;
    description: string;
    required?: boolean;
    name_localizations?: LocalizationMap | null;
    description_localizations?: LocalizationMap | null;    
    choices?: Choices[],
    channel_types?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
    options?: Options[];
    autocomplete?: boolean;
};

interface Choices {
    name: string;
    name_localizations?: LocalizationMap | null;
    value: string | number;
};

export interface Commands {
    name: string;
    description: string;
    name_localizations?: LocalizationMap | null;
    description_localizations?: LocalizationMap | null;
    dm_permission?: boolean | null;
    options?: Options[],
    execute: (client: Client, interaction: CommandInteraction) => Promise<any> | any;
};