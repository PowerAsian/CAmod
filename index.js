const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('./config.json')
const fs = require('fs')
const prefix = config.prefix;

fs.readdir('./commands/', (err, files) => {
  console.log(' ');
  if (err) {
    return console.error(err);
  }

  files.forEach(file => {
    let eventFunction = require(`./commands/${file}`);
    let eventName = file.split('.')[0];
    console.log(`❇❇❇❇❇Loaded command '${eventName}'!`);

    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
  });

  console.log('All commands loaded!');
  console.log(' ');
});

bot.on('ready', () => {
  console.log(`Logged in as: ${bot.user.tag}`)
  bot.user.setActivity(`${prefix}help`, {"type":"LISTENING"});
});

bot.on('message', message => {
  if (message.author.bot) {
    return;
  }
  if (message.content.indexOf(config.prefix) !== 0) {
    return;
  }
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command.includes('/') || command.includes('\\')) {
    console.log(`Message by "${message.author.id}" flagged as hack!`);
    message.channel.send('COMMAND FLAGGED AS HACK');
    return;
  }

  if (fs.existsSync(`./commands/${command}.js`)) {
    try {
      const commandFile = require(`./commands/${command}.js`);
      commandFile.run(bot, message, args, config);
    } catch (err) {
      console.error(err);
    }
  } else {
    message.channel.send(`Command not found! Try \`${config.prefix}help\` for a list of commands!`);
  }
});

bot.login(config.token);
