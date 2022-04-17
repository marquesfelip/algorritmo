const { GuildMember } = require('discord.js')

module.exports = {
    name: 'pause',
    description: 'Pausa a música que estiver tocando',
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

        await interaction.deferReply()
        const queue = player.getQueue(interaction.guildId)
        if (!queue || !queue.playing)
            return void interaction.followUp({
                content: '❌ | Nenhuma música está sendo tocada!',
            })
        const success = queue.setPaused(true)
        return void interaction.followUp({
            content: success
                ? '⏸ | Pausada!'
                : '❌ | Alguma coisa deu errado! :(',
        })
    },
}
