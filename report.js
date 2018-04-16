const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
  message.delete()
  let msguser = message.mentions.users.first()
  let issue = args.slice(1).join(' ')
  let guild = message.guild
  if (message.mentions.users.size < 1) {
    message.channel.send('Please provide a user')
    return;
  }
  if (!issue) {
    message.channel.send('Please provide a reason')
    return;
  }
    const reportEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00FFEE)
    .addField('Action', 'Report')
    .addField('Report Against', msguser)
    .addField('Reason', issue)
    .addField('Reported user', message.author.tag)
    let rchannel = guild.channels.find('name', 'mod-log')
    rchannel.send(reportEmbed)
    message.author.send(`Your report has been posted and going to be study by our staff. Nobody will know about that. Thanks for Co-operating. :smile:`)
    return;
}
