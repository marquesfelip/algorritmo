module.exports = {
    name: 'clean-chat',
    description: 'Deleta uma quantidade de mensagens do chat',
    options: [
        {
            name: 'num',
            type: 4, //'INTEGER' Type
            description:
                'Digite o número de mensagens que você deseja deletar (mínimo de 2 e máximo de 100).',
            required: true,
        },
    ],
    async execute(interaction) {
        const deleteCount = interaction.options.get('num').value

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return void interaction.reply({
                content: `Por favor, digite um número entre 2 e 100 para o número de mensagens a serem excluídas.`,
                ephemeral: true,
            })
        }

        const fetched = await interaction.channel.messages.fetch({
            limit: deleteCount,
        })

        interaction.channel
            .bulkDelete(fetched)
            .then(() => {
                interaction.reply({
                    content: `Mensagens deletadas com sucesso!`,
                    ephemeral: true,
                })
            })
            .catch((error) => {
                interaction.reply({
                    content: `Não foi possível deletar as mensagens. Erro: ${error}`,
                    ephemeral: true,
                })
            })
    },
}
