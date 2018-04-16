const Discord = require('discord.js')

module.exports.run = async (bot, message, args, config) => {
    if (message.member.hasPermission(['KICK_MEMBERS'])) {
        let reason = args.slice(1).join(' ')
        let mutee = message.mentions.users.first()
        let mrole = message.guild.roles.find('name', 'muted')
    
        if(!mrole) {
            message.channel.send('Please make a role name `muted` and permission that you like to have.')
            return;
        }
        if (message.mentions.users.size < 1) {
            message.channel.send('Please mention a user to mute')
            return;
        }
        if (!reason) {
            message.channel.send('Please provide a reason')
            return;
        }
            message.guild.member(mutee).addRole(mrole)
            const muteEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(0x00FFEE)
            .addField('Action', 'Mute')
            .addField('Mutee', mutee)
            .addField('Reason', reason)
            .addField('Muted by', message.author)
            let mchannel = message.guild.channels.find('name', 'mod-log')
            mchannel.send(muteEmbed)
            mutee.send(muteEmbed)
            message.channel.send(`I have successfully muted ${mutee.tag}.`)
            return;
    } else {
        message.channel.send('You don\'t have the permission')
        message.guild.owner.send(`${message.author} tried to use mute command.`)
        return;
    }
}