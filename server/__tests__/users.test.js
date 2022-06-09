const { MongoClient } = require('mongodb');
const request = require('supertest');
const app = require('../lib/app');
const Listing = require('../lib/models/Listing.js');
const User = require('../lib/models/User');

const agent = request.agent(app);

const mockUser = {
  email: 'testemail@asdf.com',
  password: 'testpassword',
};

describe('Charody user routes', () => {
  /** @type {MongoClient} */
  let client;

  beforeAll(async () => {
    let db;
    try {
      client = await MongoClient.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true }
      ).catch(err => {
        console.error(err.stack);
        process.exit(1);
      });
      db = client.db(process.env.DB_NAMESPACE);
    } catch (err) {
      // do nothing
    }
    try {
      await User.injectDB(client);
      await Listing.injectDB(client);
      await db.dropCollection('users');
      await db.createCollection('users');
      await db.dropCollection('listings');
      await db.createCollection('listings');
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    await client.close();
  });

  it('creates a new user', async () => {
    const res = await agent.post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      _id: expect.any(String),
      email,
    });
  });

  it('logs a user in', async () => {
    const res = await agent.post('/api/v1/users/sessions').send(mockUser);

    expect(res.body).toEqual({ message: 'Signed in successfully!' });
  });

  it('displays user info', async () => {
    const res = await agent.get('/api/v1/users/me');
    const { email } = mockUser;

    expect(res.body).toEqual({
      exp: expect.any(Number),
      iat: expect.any(Number),
      _id: expect.any(String),
      email,
    });
  });

  it('clears a session', async () => {
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!',
    });
  });

  it('deletes a user', async () => {
    //get mock user id
    await agent.post('/api/v1/users/sessions').send(mockUser);
    const res = await agent.delete('/api/v1/users');
    expect(res.body).toEqual({
      success: true,
      message: `Deleted user with email of ${mockUser.email}`,
    });

    //look for user in database
    const deletedUser = await User.getUser(mockUser.email);
    expect(deletedUser).toBeNull;
  });
});
