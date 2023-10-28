require('dotenv').config()
const fs = require('fs')
const { Collection } = require('discord.js')
const Client = require('./client/Client')
const { Player } = require('discord-player')

const client = new Client()
client.commands = new Collection()

const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

console.log(client.commands)

const player = new Player(client, {
    ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio',
    },
})

player.on('error', (queue, error) => {
    console.error(
        `[${
            queue.guild.name
        }] \n ${Date().toLocaleString()} \n [error] Erro: ${error}`
    )
})

player.on('connectionError', (queue, error) => {
    console.error(
        `[${
            queue.guild.name
        }] \n ${Date().toLocaleString()} \n [connectionError] Erro: ${
            error.message
        }`
    )
})

player.on('trackStart', (queue, track) => {
    queue.metadata.send(
        `🎶 | Tocando: **${track.title}** em **${queue.connection.channel.name}**!`
    )
})

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`🎶 | Música **${track.title}** adicionada a fila!`)
})

player.on('botDisconnect', (queue) => {
    queue.metadata.send(
        '❌ | Eu fui manualmente disconectado do canal de voz, limpando fila!'
    )
})

player.on('channelEmpty', (queue) => {
    queue.metadata.send(
        '❌ | Não há mais ninguém no canal de voz, estou saindo...'
    )
})

player.on('queueEnd', (queue) => {
    queue.metadata.send('✅ | Fim da fila!')
})

client.once('ready', async () => console.log('Preparado!'))

client.once('reconnecting', async () => console.log('Reconectando!'))

client.once('disconnect', async () => console.log('Desconectando!'))

client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot || !message.guild) return
        if (!client.application.owner) await client.application.fetch()

        if (
            message.content.toLowerCase() === '!deploy' &&
            (message.author.id === process.env.OWNER_1 ||
                message.author.id === process.env.OWNER_2)
        ) {
            await message.guild.commands
                .set(client.commands)
                .then(() => {
                    message.reply('Comandos atualizados!')
                })
                .catch((err) => {
                    message.reply(
                        'Não foi possível atualizar os comandos! Verifique se o bot está com a permissão "application.commands"!'
                    )
                    console.error(err)
                })
        }
    } catch (error) {
        console.error(error)
    }
})

client.on('interactionCreate', async (interaction) => {
    const command = client.commands.get(interaction.commandName.toLowerCase())

    try {
        command.execute(interaction, player)
    } catch (error) {
        console.error(error)
        interaction.followUp({
            content: 'Ocorreu um erro ao tentar executar este comando comando!',
        })
    }
})

client.login(process.env.BOT_TOKEN)
