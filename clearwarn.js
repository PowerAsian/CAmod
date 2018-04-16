const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
  if (!message.guild.member(message.author).hasPermission(['KICK_MEMBERS'])) {
    message.channel.send('You can\'t do that. Ask anybody with higher role!')
    return;
  }

  if (message.guild.member(message.author).hasPermission(['KICK_MEMBERS'])) {
    let msguser = message.mentions.users.first()
    let guild = message.guild;
    let crole = message.guild.roles.find('name', 'CAwarned')

    if (!msguser) {
      message.channel.send('Please mention a user!')
      return;
    }
    if (!message.guild.member(msguser).roles.find('name', 'CAwarned')) {
      message.channel.send(`The user ${msguser.username} isn't warned by me or may be warned by any other bot.`)
      return;
    }
      message.guild.member(msguser).removeRole(crole)
      const clearWarnEmbed = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setColor(0x00FFEE)
      .addField('Action', 'Clear Warn')
      .addField('Clear Warned user', `${msguser.username}#${msguser.discriminator}`)
      .addField('Clear Warned by', message.author.tag)
      let cwchannel = guild.channels.find('name', 'mod-log')
      cwchannel.send(clearWarnEmbed)
      msguser.send(`You have been clear warned by ${message.author.tag} in ${guild.name}`)
      message.channel.send(`I have successfully cleared the warnings of ${msguser.tag}.`)
      return;
  } else {
    message.channel.send('You don\'t have the permission')
    message.guild.owner.send(`${message.author.tag} tried to use clearwarn command.`)
  }
}
