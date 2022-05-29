const mongoose = require("mongoose");
async function connectContacts() {
  const connect = await mongoose.connect(process.env.MONGO_URL, {
    dbName: "db-contacts",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connect;
}
module.exports = {
  connectContacts,
};
