const { connect } = require('mongoose');
const { MONGODB_URI } = require('./config');

client = connect(MONGODB_URI)
  .then(() => console.log('Mongo DB Connected'))
  .catch((err) => console.log(err));
