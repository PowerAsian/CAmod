const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
  let msguser = message.mentions.users.first()
  let msg = message.author;
  /*let status = message.author.user.presence.status;
  let activity = message.user.presence.status;
  let activitytype = message.presence.type;
  if (message.mentions.users.size > 1) {
    const activityEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor(0x00FFEE)
    .addField('Status', status)
    .addField('Activity', activity)
    .addField('Activity Type', activitytype);
    message.channel.send(activityEmbed)
    return;
  }*/

    const embed = new Discord.RichEmbed()
    .setAuthor(bot.user.tag, bot.user.avatarURL)
    .setColor(0x00FFEE)
    .addField('Status', bot.user.presence.status)
    .addField('Activity game', bot.user.presence.game.name)
    .addField('Activity Type', bot.user.presence.game.type);
    message.channel.send({embed})
    return; 
  }