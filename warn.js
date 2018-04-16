const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
  if (message.member.hasPermission(['KICK_MEMBERS'])) {
    let reason = args.slice(1).join(' ')
    let msguser = message.mentions.users.first()
    let guild = message.guild;
    let wrole = guild.roles.find('name', 'CAwarned')

    wrole

    if (!wrole) {
      message.channel.send('Please create a role name `CAwarned`')
      return;
    }
    if (guild.member(msguser).hasPermission(['KICK_MEMBERS'])) {
      message.channel.send(`Can't warn that user!`)
      return;
    }
    if (!reason) {
      message.channel.send('Please provide a reason')
      return;
    }
    if (message.mentions.users.size < 1) {
      message.channel.send('Please mention a user')
      return;
    } else {
      guild.member(msguser).addRole(wrole)
      const warnEmbed = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setColor(0x00FFEE)
      .addField('Action', 'Warning')
      .addField('Warned user', `${msguser.username}#${msguser.discriminator}`)
      .addField('Reason', reason)
      .addField('Warned by', message.author.tag)
      let wchannel = guild.channels.find('name', 'mod-log')
      wchannel.send(warnEmbed)
      msguser.send(`You have been warned in ${guild.name} by ${message.author.tag} for ${reason}`)
      message.channel.send(`I have successfully warned ${msguser.tag}.`)
      return;
    }
  } else {
    message.channel.send(`You don't have the permission`)
    message.guild.owner.send(`${message.author.tag} tried to use warn command`)
    return;
  }
}
