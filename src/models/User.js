const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  discordId: String,
  username: String,
  avatar: String,
  discriminator: String,
  public_flags: Number,
  flags: Number,
  banner: String,
  accent_color: String,
  global_name: String,
  avatar_decoration_data: String,
  banner_color: String,
  clan: String,
  mfa_enabled: Boolean,
  locale: String,
  premium_type: Number,
  email: String,
  verified: Boolean,
  provider: String,
  accessToken: String,
  connections: [{}],
  guilds: [{}],
  fetchedAt: Date,
});

module.exports = model('User', userSchema);
