const app = require('./app');
require('./db');
const {
  PORT,
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  GUILD_ID,
} = require('./config');
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
} = require('discord.js');
const { parties, roles } = require('./utils/parties');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

client.on('ready', () => console.log('Bot is logged in'));

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    switch (interaction.commandName) {
      case 'setup': {
        const channel = interaction.options.getChannel('channel');
        channel.send({
          embeds: [
            {
              description:
                'Welcome to the server please authorize yourself by clickin on ✅ button',
              color: '5763719',
              title: `Welcome to ${interaction.guild?.name}`,
            },
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  url: 'https://dextra.onrender.com',
                  style: 5,
                  emoji: {
                    name: '✅',
                  },
                },
              ],
            },
          ],
        });
        break;
      }
      case 'dropdown': {
        const channel = interaction.options.getChannel('channel');
        const menu = new StringSelectMenuBuilder()
          .setCustomId('select')
          .setMinValues(0)
          .setMaxValues(3)
          .setPlaceholder('Partidos')
          .addOptions(parties);

        channel.send({
          embeds: [
            {
              description:
                'Seleciona até 3 partidos com que mais te identificas',
              color: '15548997',
              title: `Escolha de Partidos`,
            },
          ],
          components: [
            {
              type: 1,
              components: [menu],
            },
          ],
        });

        break;
      }
    }
  } else if (interaction.isButton()) {
    switch (interaction.customId) {
      case 'verifyMember': {
        console.log('Verifying Member...');
        const role = interaction.guild?.roles.cache.get('1239637356584374274');
        if (!role) {
          console.log('Role does not exist');
          return;
        }
        const member = interaction.member;
        console.log(member.user);
        member.roles.add(role).then(() =>
          interaction
            .reply({
              content: `The ${role} was assigned to you`,
              ephemeral: true,
            })
            .catch(() =>
              interaction.reply({
                content: 'Something went wrong',
                ephemeral: true,
              })
            )
        );
        break;
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'select') {
      const member = interaction.member;

      const roleIds = Object.values(roles);

      await member.roles.remove(roleIds);

      const selectedRoles = interaction.values;
      const mentionedRoles = [];

      for (const role of selectedRoles) {
        await member.roles.add(roles[role]);
        mentionedRoles.push(`<@&${roles[role]}>`);
      }

      await interaction.reply({
        content: `Partidos atribuidos, tens agora acesso aos canais do(s) partido(s) ${mentionedRoles.join(
          ', '
        )}`,
        ephemeral: true,
      });
    }
  }
});

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, GUILD_ID),
      {
        body: [
          new SlashCommandBuilder()
            .setName('setup')
            .setDescription('Setup the welcome channel bot')
            .addChannelOption((option) => {
              return option
                .setName('channel')
                .setDescription('The channel to send the message to');
            }),

          new SlashCommandBuilder()
            .setName('dropdown')
            .setDescription('Setup the roles dropdown menu')
            .addChannelOption((option) => {
              return option
                .setName('channel')
                .setDescription('The channel to send the message to');
            }),
        ],
      }
    );
    await client.login(DISCORD_BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
})();

app.listen(PORT);
console.log('Server running on port', PORT);
