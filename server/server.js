const app  = require('./lib/app');
const { MongoClient } = require('mongodb');
const User = require('./lib/models/User');
const Listing = require('./lib/models/Listing');

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
    await User.injectDB(client);
    await Listing.injectDB(client);
    app.listen(PORT, () => {
      console.log(`🚀  Server started on port: ${PORT}`);
    });
  });
