import { Config, Commands, Events } from '../Interfaces';
import { Client, Collection } from 'discord.js';
import configFile from '../Conf/config.json';
import { connect, set } from "mongoose";
import fs from "node:fs";
import path from "path";

export default class Bot extends Client {
    public commands: Collection<string, Commands> = new Collection();
    public events: Collection<string, Events> = new Collection();
    public config: Config = configFile;
    public async init() {
        
        // Discord client login.
        this.login(this.config.bot.token).then(() => {
            console.log(`Connected to Discord as ${this.user?.username}!`);
        }).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });
        
        // Database (MongoDB) connection.
        set("strictQuery", true)
        connect(this.config.database.url).then(async () => {
            console.log('Connected to database!');
        }).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });
        
        // Loading slash (/) commands.
        fs.readdir(path.join(__dirname, "../Commands"), (err, category: string[]) => {
            if(err) throw new Error(err.message);                  
            
            fs.readdir(path.join(__dirname, "../Commands/" + category), (err, commands: string[]) => {             
                if(err) throw new Error(err.message);  
                
                commands.forEach(async (command : string) => {                             
                    try {                                    
                        const { Command }: { Command: Commands } = await import(`../Commands/${category}/${command}`);                 
                        this.commands.set(Command.name, Command)                              
                        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);                               
                    } catch (err) {          
                        throw err;             
                    }          
                });              
            });             
        });
        
        fs.readdir(path.join(__dirname, "../Events"), (err, events: string[]) => {
            if(err) throw new Error(err.message);
            events.forEach(async (event : string) => {
                try {
                    const { Event }: { Event: Events } = await import(`../Events/${event}`);
                    if(Event.once) {
                        this.once(Event.name, (...args) => {
                            Event.execute(this, ...args)
                        });
                    } else {
                        this.on(Event.name, (...args) => {
                            Event.execute(this, ...args)
                        });
                    }
                } catch (err) {
                    throw err;
                }
            });
       });
    }
}