const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
    let amount = args.join(' ')
    if (amount.length < 1) {
        message.channel.send('Please provide a value larger than 1 and less than 99.')
        return;
    }
    if (isNaN(amount)) {
        message.channel.send('Please provide a number')
        return;
    }
    
    message.channel.bulkDelete(amount)

    await message.channel.send(`Deleting ${amount} messages in the channel`).then(msg => {
        msg.delete();
    })
    const prugeEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0xFFEE00)
    .addField('Action', 'Purge')
    .addField('Purged by', message.author)
    .addField('Purging amount', amount)
    .addField('Purged channel', "#" + message.channel.name)
    let pchannel = message.guild.channels.find('name', 'mod-log')
    pchannel.send(prugeEmbed);

    if (!pchannel) {
        message.channel.send('Please make a `mod-log` channel')
    }
}