const { Router } = require('express');
const { ObjectId } = require('mongodb');
const Ajv = require('ajv').default;
const ajv = new Ajv();
const { postcodeValidator } = require('postcode-validator');
const zipcodes = require('zipcodes');
const Listing = require('../models/Listing.js');

const getListingsBodySchema = {
  type: 'object',
  properties: {
    zipcode: { type: 'integer', minimum: 1, maximum: 99999 },
    radius: { type: 'number', exclusiveMinimum: 0, maximum: 500 },
    allowsCats: { type: 'boolean' },
    allowsDogs: { type: 'boolean' },
    stairClimbingRequired: { type: 'boolean' },
    count: { type: 'integer', minimum: 1, maximum: 50 },
    page: { type: 'integer', minimum: 1 }
  },
  required: ['zipcode', 'radius'],
  additionalProperties: false
};

const postListingsBodySchema = {
  type: 'object',
  properties: {
    zipcode: { type: 'integer', minimum: 1, maximum: 99999 },
    radius: { type: 'number', exclusiveMinimum: 0, maximum: 500 },
    allowsCats: { type: 'boolean' },
    allowsDogs: { type: 'boolean' },
    stairClimbingRequired: { type: 'boolean' },
    numberOfDaysAvailable: { type: 'integer', minimum: 1, maximum: 50 },
    currentlyAvailable: { type: 'boolean' }
  },
  required: [
    'zipcode',
    'radius',
    'allowsCats',
    'allowsDogs',
    'stairClimbingRequired',
    'numberOfDaysAvailable',
    'currentlyAvailable'
  ],
  additionalProperties: false
};


const validateGetListingsBody = ajv.compile(getListingsBodySchema);
const validatePostListingsBody = ajv.compile(postListingsBodySchema);

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      if(validateGetListingsBody(req.body)) {
        if(!postcodeValidator(req.body.zipcode, 'US')) {
          return res.json({ errors: ['invalid postcode'] });
        }

        const { zipcode, radius, ...query } = req.body;
        query.zipcodes = zipcodes.radius(zipcode, radius);
        console.log(query.zipcodes);

        const listings = await Listing.searchListingsByZipcode(query);
        res.json(listings);
      } else {
        res.json({ errors: validateGetListingsBody.errors });
      }
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
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
  });
