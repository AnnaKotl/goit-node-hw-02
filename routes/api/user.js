const express = require('express');
const router = express.Router();

const UsersController = require('../../controllers/user');
const { createBodyValidator, authenticate } = require('../../middleware/middleware');
const upload = require('../../middleware/upload');
const { schemas } = require('../../models/userSchema');

router.post(
  '/register',
  createBodyValidator(schemas.schema),
  UsersController.register
);
// POST http://localhost:3003/api/users/register
// rav:
//  {
//    "email": "user@example.com",
//    "password": "password123",
//     "subscription": "pro"
//  }
// token: ///

router.post(
  '/login',
  createBodyValidator(schemas.schema),
  UsersController.login
);

router.post('/logout', authenticate, UsersController.logout);

router.get('/current', authenticate, UsersController.current);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  UsersController.updateAvatar
);
// "Body" => "form-data"
// PATCH http://localhost:3003/api/users/avatars

module.exports = router;