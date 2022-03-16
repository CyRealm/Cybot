require('dotenv').config();
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

// Bot Commands
const commands = [{
	name: 'ping',
	description: 'Replies with "Hello!"'
}];

const rest = new REST({ version: '9'}).setToken('token');


(async () => {
	try{
		console.log('Started Checking for (/) commands');

		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{body: commands},
		);

		console.log('Found (/) commands');
	}catch(error)
	{
		console.error(error);
	}
})();




// Bot API

const Discord = require('discord.js')
const client = new Discord.Client({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES"
	]
})

client.on('ready', ()=>{
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
	if (message.content == "hi"){
		message.reply("Hello!")
	}
});

client.login(process.env.DISCORD_TOKEN)