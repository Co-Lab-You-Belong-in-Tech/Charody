const app  = require('./lib/app');
const { MongoClient } = require('mongodb');
const UserDAO = require('./lib/DAOs/UserDAO');
const ListingDAO = require('./lib/DAOs/ListingDAO');

const PORT = process.env.PORT || 7890;

process.on('exit', () => {
  console.log('👋  Goodbye!');
});

MongoClient.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await UserDAO.injectDB(client);
    await ListingDAO.injectDB(client);
    app.listen(PORT, () => {
      console.log(`🚀  Server started on port: ${PORT}`);
    });
  });
