require('dotenv').config();
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const request = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const puppeteerStealth = require('puppeteer-extra-plugin-stealth')

// Bot Commands
var price;
const url = "https://opensea.io/collection/meebits";

async function GetPrice()
{
	puppeteer.launch({
		headless: false,
	}).then(async browser =>
	{
		console.log("Ready");
		const page = await browser.newPage();
		await page.goto(url);
		await page.waitForTimeout(5000);

		// Query by .class attribute
		let texts = await page.evaluate(() => { 
		    let data = [];
		    let elements = document.getElementsByClassName('Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX');
		    for (var element of elements)
		        data.push(element.textContent);
		    return data;
		});
		console.log(texts[2]);
		price = texts[2]
		client.user.setActivity({
		  name: "Meebits: " + price + "ETH",
		  type: "WATCHING"
		});
		browser.close();
		return texts[2]; // Obtain the price
	});
}


// Bot API
const welcomeChannelId = "953693722967683213";
const Discord = require('discord.js')
const client = new Discord.Client({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_MEMBERS"
	]
})

client.on('ready', async ()=>{
	console.log(`Logged in as ${client.user.tag}`);
	GetPrice();

	setInterval(() =>
	{
		GetPrice();
	}, 1000 * 30); // 10 second delay
});

client.on('messageCreate', (message) => {
	if (message.content == "hi"){
		message.reply("Hello!");
	}
	if (message.content == "!refresh")
	{
		GetPrice();
	}
});

client.on('guildMemberAdd', (member) => {
	member.guild.channels.cache.get(welcomeChannelId).send('<@${member.id}> Welcome to the Server!')
});

client.login(process.env.DISCORD_TOKEN)
