const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
  if (message.member.hasPermission(['KICK_MEMBERS'])) {
    let reason = args.slice(1).join(' ')
    let msguser = message.mentions.users.first()
    let guild = message.guild;
    if (message.mentions.users.size < 1) {
      message.channel.send('Please mention a user')
      return;
    }
    if (!reason) {
      message.channel.send('Please provide a reason')
      return;
    }
      message.guild.member(msguser).kick()
      const kickEmbed = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setColor(0x00FFEE)
      .addField('Action', 'Kick')
      .addField('Kicked user', msguser)
      .addField('Reason', reason)
      .addField('Kicked by', message.author.tag);
      let kchannel = message.guild.channels.find('name', 'mod-log')
      kchannel.send(kickEmbed);
      msguser.send(kickEmbed);
      message.channel.send(`I have successfully kicked ${msguser.tag}.`)
      return;
    } else {
    message.channel.send(`You don't have the permission`)
    message.guild.owner.send(`${message.author} tried to use kick command`)
    return;
  }
}
