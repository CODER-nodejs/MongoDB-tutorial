const Discord = require('discord.js');
const client = new Discord.Client();
 //You can change prefix here
const prefix = '-';
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require('fs');
 
client.commands = new Discord.Collection();

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
     console.log('Database connected :)');    
}).catch((err) =>{
     console.log(err);    
})
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 //This command prompts if bot is online
client.once('ready', () => {
    console.log('The bot is online :)');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(client, message, args);
    } 
});
//Bot token here
client.login('');
