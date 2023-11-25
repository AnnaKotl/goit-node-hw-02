const express = require('express');
const queries = require('../../models/contacts');
const { createBodyValidator } = require('../../middleware/middleware');
const { joiSchema, addToFavorites } = require('../../models/joi');

const router = express.Router();

const CONTACTS_PATH = '/';
const CONTACT_ID_PATH = '/:contactId';
const FAVORITE_PATH = '/:contactId/favorite';

router.get(CONTACTS_PATH, queries.listContacts);
// GET http://localhost:3003/api/contacts/

router.get(CONTACT_ID_PATH, queries.getContactById);
// GET http://localhost:3003/api/contacts/6552528713b7fc8a8de12bb0 "Wylie Pope"

router.post(CONTACTS_PATH, createBodyValidator(joiSchema), queries.addContact);
// POST http://localhost:3003/api/contacts/

router.delete(CONTACT_ID_PATH, queries.removeContact);
// DELETE http://localhost:3003/api/contacts/id

router.put(
  CONTACT_ID_PATH,
  createBodyValidator(joiSchema),
  queries.updateContact
);

router.patch(
  FAVORITE_PATH,
  createBodyValidator(addToFavorites),
  queries.addToFavorites
);

module.exports = router;