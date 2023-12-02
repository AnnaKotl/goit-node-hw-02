const express = require('express');
const queries = require('../../controllers/contacts');
const { createBodyValidator, authenticate } = require('../../middleware/middleware');
const { joiSchema, addToFavorites } = require('../../models/joi');

const router = express.Router();

const CONTACTS_PATH = '/';
const CONTACT_ID_PATH = '/:contactId';
const FAVORITE_PATH = '/:contactId/favorite';

router.get(CONTACTS_PATH, authenticate, queries.listContacts);
// GET http://localhost:3003/api/contacts/

router.get(CONTACT_ID_PATH, authenticate, queries.getContactById);
// GET http://localhost:3003/api/contacts/6552528713b7fc8a8de12bb0 "Wylie Pope"

router.post(
  CONTACTS_PATH,
  authenticate,
  createBodyValidator(joiSchema),
  queries.addContact
);
// POST http://localhost:3003/api/contacts/

router.delete(CONTACT_ID_PATH, authenticate, queries.removeContact);
// DELETE http://localhost:3003/api/contacts/id

router.put(
  CONTACT_ID_PATH,
  authenticate,
  createBodyValidator(joiSchema),
  queries.updateContact
);

router.patch(
  FAVORITE_PATH,
  authenticate,
  createBodyValidator(addToFavorites),
  queries.addToFavorites
);

module.exports = router;