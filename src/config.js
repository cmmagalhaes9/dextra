require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || '12345678910',
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_REDIRECT: process.env.DISCORD_CLIENT_REDIRECT || '/redirect',
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  ROLE_ID: process.env.ROLE_ID,
  GUILD_ID: process.env.GUILD_ID,
  GUILD_BACKUP: process.env.GUILD_BACKUP,
  APP_URL: process.env.APP_URL,
};
