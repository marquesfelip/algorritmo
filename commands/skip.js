const { GuildMember } = require('discord.js')

module.exports = {
    name: 'skip',
    description: 'Avança para a próxima música da fila',
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

        if (!queue || !queue.playing) {
            return void interaction.followUp({
                content: '❌ | Nenhuma música está sendo tocada!',
            })
        }
        const currentTrack = queue.current
        const success = queue.skip()

        return void interaction.followUp({
            content: success
                ? `✅ | Pulada **${currentTrack}**!`
                : '❌ | Alguma coisa deu errado! :(',
        })
    },
}
