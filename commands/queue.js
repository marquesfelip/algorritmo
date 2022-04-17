const { GuildMember } = require('discord.js')

module.exports = {
    name: 'queue',
    description: 'Exibe a fila de músicas',

    async execute(interaction, player) {
        if (
            !(interaction.member instanceof GuildMember) ||
            !interaction.member.voice.channel
        ) {
            return void interaction.reply({
                content: 'Você não está em um canal de voz!',
                ephemeral: true,
            })
        }

        if (
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !==
                interaction.guild.me.voice.channelId
        ) {
            return void interaction.reply({
                content: 'Você não está em meu canal de voz!',
                ephemeral: true,
            })
        }

        var queue = player.getQueue(interaction.guildId)

        if (typeof queue != 'undefined') {
            let trimString = (str, max) =>
                str.length > max ? `${str.slice(0, max - 3)}...` : str
            return void interaction.reply({
                embeds: [
                    {
                        title: 'Tocando agora',
                        description: trimString(
                            `Tocando neste momento: 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `,
                            4095
                        ),
                    },
                ],
            })
        } else {
            return void interaction.reply({
                content: 'Não há músicas na fila!',
            })
        }
    },
}
