const mongoose = require('mongoose');

const connection = {};

const connectToDB = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
};

module.exports = connectToDB;
