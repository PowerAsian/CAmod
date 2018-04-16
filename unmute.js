const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
    if (message.member.hasPermission(['KICK_MEMBERS'])) {
        let unmutee = message.mentions.users.first()
        let mrole = message.guild.roles.find('name', 'muted')
    
        mrole
        
        if(!mrole) {
            message.author.send('Please make a `muted` with your permission you like')
            return;
        }
        if (message.mentions.users.size < 1) {
            message.author.send('Please provide a user')
            return;
        } else {
            message.guild.member(unmutee).removeRole(mrole)
            const unMuteEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(0x00ffee)
            .addField('Action', 'Unmute')
            .addField('Unmuted user', unmutee)
            .addField('Unmuted by', message.author);
            let mchannel = message.guild.channels.find('name', 'mod-log')
            mchannel.send(unMuteEmbed)
            unmutee.send(unMuteEmbed)
            message.channel.send(`I have successfully unmuted ${unmutee.tag}.`)
            return;
        }
    } else {
        message.author.send('You don\'t have the permission')
        message.guild.owner.send(`${message.author} tried to use moderation command!`)
        return;
    }
}