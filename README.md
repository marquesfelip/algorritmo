# Algorritmo
## _Bot de Música para Discord_

_Algorritmo é um bot de música do Discord criado para você se divertir ainda mais em suas chamadas com seus amigos ouvindo a mesma música juntos._

### Comandos
- __/play__: Toca uma música no canal de voz
- __/pause__: Pausa a música que estiver tocando
- __/skip__: Avança para a próxima música da fila
- __/queue__: Exibe a fila de músicas
- __/clean-chat__: Deleta uma quantidade de mensagens no chat

O comando __/play__ reproduz músicas encontradas no YouTube. Ao utilizar o comando, você pode passar uma URL do YouTube ou qualquer texto contendo o nome ou artista da música, a primeira encontrada será tocada.

## Como usar

### Pré-requisitos
- [Node.js](https://nodejs.org/) v20+
- [Bot API Token](https://discord.com/developers/applications) (criado no portal do desenvolvedor do Discord)
- User ID do discord (Clicar no perfil do usuário no Discord e selecionar "Copiar ID do usuário")

```sh
cd algorritmo
touch .env
```

O arquivo `.env` deve conter a seguintes variáveis:
```
BOT_TOKEN=""
OWNER_1=
OWNER_2=
```
`BOT_TOKEN` é a variável que irá conter o Token criado no portal do dev do Discord.
`OWNER_1` e `OWNER_2` é o ID do usuário dono do servidor que irá rodar o Bot. Ambas as variáveis podem ter um mesmo ID se desejar.

### Permissões do BOT
- Read Messages/View Channels
- Send Messages
- Manage Messages
- Use Slash Commands
- Speak

### Instalar dependências e executar o bot.

```sh
npm i
npm run start
```

# [MIT License](https://github.com/marquesfelip/algorritmo/tree/main?tab=MIT-1-ov-file)
