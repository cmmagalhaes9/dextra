const { Strategy } = require('passport-discord');
const passport = require('passport');
const User = require('../models/User');
const axios = require('axios');

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_REDIRECT,
  DISCORD_BOT_TOKEN,
  GUILD_ID,
  GUILD_BACKUP,
  ROLE_ID,
} = require('../config');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: DISCORD_CLIENT_REDIRECT,
      scope: ['identify', 'guilds', 'email', 'connections', 'guilds.join'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ discordId: profile.id });
        if (user) {
          console.log('Exists');
          // Update user fields
          user.username = profile.username;
          user.avatar = profile.avatar;
          user.discriminator = profile.discriminator;
          user.public_flags = profile.public_flags;
          user.flags = profile.flags;
          user.banner = profile.banner;
          user.accent_color = profile.accent_color;
          user.global_name = profile.global_name;
          user.avatar_decoration_data = profile.avatar_decoration_data;
          user.banner_color = profile.banner_color;
          user.clan = profile.clan;
          user.mfa_enabled = profile.mfa_enabled;
          user.locale = profile.locale;
          user.premium_type = profile.premium_type;
          user.email = profile.email;
          user.verified = profile.verified;
          user.provider = profile.provider;
          user.accessToken = accessToken;
          user.connections = profile.connections;
          user.guilds = profile.guilds;
          user.fetchedAt = new Date();

          // Save updated user
          user = await user.save();
          return done(null, user);
        } else {
          const newUser = new User({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            discriminator: profile.discriminator,
            public_flags: profile.public_flags,
            flags: profile.flags,
            banner: profile.banner,
            accent_color: profile.accent_color,
            global_name: profile.global_name,
            avatar_decoration_data: profile.avatar_decoration_data,
            banner_color: profile.banner_color,
            clan: profile.clan,
            mfa_enabled: profile.mfa_enabled,
            locale: profile.locale,
            premium_type: profile.premium_type,
            email: profile.email,
            verified: profile.verified,
            provider: profile.provider,
            accessToken: accessToken,
            connections: profile.connections,
            guilds: profile.guilds,
            fetchedAt: new Date(),
          });
          try {
            await axios({
              method: 'put',
              url: `https://discord.com/api/v10/guilds/${GUILD_BACKUP}/members/${profile.id}`,
              data: {
                access_token: accessToken,
              },
              headers: {
                Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json',
              },
            });
          } catch (error) {
            console.error('Axios Error:', error.response.data);
          }
          try {
            await axios({
              method: 'put',
              url: `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${profile.id}/roles/${ROLE_ID}`,
              headers: {
                Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
              },
            });
          } catch (error) {
            console.error('Axios Error:', error.response.data);
          }
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (error) {
        console.error(error);
        return done(err, null);
      }
    }
  )
);
