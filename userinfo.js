const Discord = require('discord.js')

module.exports.run =  async (bot, message, args, config) => {
  //  if (message.mentions.users.size < 1) return message.channel.send("You must mention a user or bot.")
   // let person = message.mentions.users.first();
    let msg = message.author;
       // let status = msg.presence.status.names;
     //   let activity = msg.presence.activity;
        const userInfoEmbed = new Discord.RichEmbed()
        .setAuthor(msg.username, msg.avatarURL)
        .setColor('RANDOM')
        .setDescription('Get Information about yourself')
        .setThumbnail(msg.avatarURL)
        .addField('Username', msg.username)
        .addField('Discriminator', msg.discriminator)
        .addField('Avatar Link', msg.avatarURL)
        .addField('User ID', msg.id)
       // .addField('Status', status);
       message.channel.send({embed: userInfoEmbed});
}
