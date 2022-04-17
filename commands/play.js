const { GuildMember } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
    name: 'play',
    description: 'Toca uma música no seu canal',
    options: [
        {
            name: 'query',
            type: 3, // 'STRING' Type
            description: 'Link ou nome da música que deseja tocar',
            required: true,
        },
    ],
    async execute(interaction, player) {
        try {
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

            const query = interaction.options.get('query').value
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                })
                .catch(() => {})
            if (!searchResult || !searchResult.tracks.length)
                return void interaction.followUp({
                    content: 'Nada encontrado!',
                })

            const queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel,
            })

            try {
                if (!queue.connection)
                    await queue.connect(interaction.member.voice.channel)
            } catch {
                void player.deleteQueue(interaction.guildId)
                return void interaction.followUp({
                    content: 'Não foi possível se juntar ao canal de voz!',
                })
            }

            await interaction.followUp({
                content: `⏱ | Carregando sua ${
                    searchResult.playlist ? 'playlist' : 'música'
                }...`,
            })
            searchResult.playlist
                ? queue.addTracks(searchResult.tracks)
                : queue.addTrack(searchResult.tracks[0])
            if (!queue.playing) await queue.play()
        } catch (error) {
            console.log(error)
            interaction.followUp({
                content:
                    'Ocorreu um erro ao tentar executar o comando: ' +
                    error.message,
            })
        }
    },
}
