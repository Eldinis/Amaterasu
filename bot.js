const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
	if( message.author.bot )
		return;
	if( input == "hi!" ){
		message.channel.send("<@" + message.author.id + "> hi!").catch(console.error);
		return;
	}
});

client.on('ready', () => {
	//client.user.setUsername("Amaterasu 天照").catch(console.error);
	console.log( client.user.username + ' [' + client.user.id + '] est en ligne!');
});

client.on('error', error => {
	console.log( error.message ); 
});

client.login(process.env.BOT_TOKEN).catch(console.error);
