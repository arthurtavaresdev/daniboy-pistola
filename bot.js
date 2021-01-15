const tmi = require('tmi.js');
require('dotenv').config();

const username = process.env.TWITCH_USERNAME;
const password = process.env.TWITCH_TOKEN;
const emojiERROR500 = 'danihe4rtError';
const emojiPistola = ':gun:';

const args = [{
    "channel": "danielhe4rt",
    "commands": [
        `Daniboy está pistola, ui! ${emojiERROR500}`,
        `Contagem regressiva para o Dani ficar pistola!`,
        `${emojiERROR500} ${emojiERROR500} ${emojiERROR500} ${emojiERROR500} ${emojiERROR500}`,
        `Corre que ele ta puto! ${emojiERROR500}`,
        `"Ta faltando Front-end! ${emojiERROR500} - Daniel Coração"`,
        `"EU NÃO SEI CODAR BOTÃO ${emojiERROR500}" - Daniboy`,
    ],
}];
// Define configuration options
const opts = {
  identity: {
    username,
    password,
  },
  channels: args.map((item) => item.channel)
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)

client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
    if(self) return;

	if(message.includes(emojiERROR500) || message.includes(emojiPistola)) {
        console.log(channel);
        let options = args.find((item) => '#'+item.channel == channel);
        if(!options) return;

		client.say(channel, options.commands[Math.floor(Math.random() * options.commands.length)]);
	}
});

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}