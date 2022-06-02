const { Router } = require('express');
const { ObjectId } = require('mongodb');
const Ajv = require('ajv').default;
const ajv = new Ajv();
const { postcodeValidator } = require('postcode-validator');
const zipcodes = require('zipcodes');
const authorize = require('../middleware/authorize.js');
const Listing = require('../models/Listing.js');

const searchListingsBodySchema = {
  type: 'object',
  properties: {
    zipcode: { type: 'integer', minimum: 1, maximum: 99999 },
    radius: { type: 'number', exclusiveMinimum: 0, maximum: 500 },
    allowsKids: { type: 'boolean' },
    allowsCats: { type: 'boolean' },
    allowsDogs: { type: 'boolean' },
    noStairs: { type: 'boolean' },
    count: { type: 'integer', minimum: 1, maximum: 50 },
    page: { type: 'integer', minimum: 1 }
  },
  required: ['zipcode', 'radius'],
  additionalProperties: false
};

const postListingsBodySchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    phone: { type: 'string' },
    zipcode: { type: 'integer', minimum: 1, maximum: 99999 },
    allowsKids: { type: 'boolean' },
    allowsCats: { type: 'boolean' },
    allowsDogs: { type: 'boolean' },
    noStairs: { type: 'boolean' },
    numberOfDaysAvailable: { type: 'integer', minimum: 1, maximum: 50 },
    currentlyAvailable: { type: 'boolean' }
  },
  required: [
    'firstName',
    'lastName',
    'phone',
    'zipcode',
    'allowsKids',
    'allowsCats',
    'allowsDogs',
    'noStairs',
    'numberOfDaysAvailable',
    'currentlyAvailable'
  ],
  additionalProperties: false
};


const validateSearchListingsBody = ajv.compile(searchListingsBodySchema);
const validatePostListingsBody = ajv.compile(postListingsBodySchema);

module.exports = Router()
  .post('/', async (req, res, next) => {
    console.log('post listings');
    try {
      if(validatePostListingsBody(req.body)) {
        if(!postcodeValidator(req.body.zipcode, 'US')) {
          return res.json({ errors: ['invalid postcode'] });
        }

        const listingInfo = { userId: ObjectId(req.user._id), ...req.body };
        const result = await Listing.upsertListing(listingInfo);
        console.log(result);

        res.json({ ok: 'ok' });
      } else {
        res.json({ errors: validatePostListingsBody.errors });
      }
    } catch(e) {
      console.log(e);
      next(e);
    }
  })
  .post('/search', authorize, async (req, res, next) => {
    console.log('search listings');
    try {
      if(validateSearchListingsBody(req.body)) {
        if(!postcodeValidator(req.body.zipcode, 'US')) {
          return res.json({ errors: ['invalid postcode'] });
        }

        const { zipcode, radius, ...query } = req.body;
        query.zipcodes = zipcodes.radius(zipcode, radius).map(zip => parseInt(zip));

        const listings = await Listing.searchListingsByZipcode(query);
        console.log(listings);
        res.json(listings);
      } else {
        res.json({ errors: validateSearchListingsBody.errors });
      }
    } catch (e) {
      next(e);
    }
  });
