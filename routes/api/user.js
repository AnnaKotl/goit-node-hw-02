const express = require('express');
const router = express.Router();

const UsersController = require('../../controllers/user');
const { createBodyValidator, authenticate } = require('../../middleware/middleware');
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
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmI2YThjNDBjYTUxZGU2NDkzMTEyZSIsImlhdCI6MTcwMTUzODQ0NCwiZXhwIjoxNzAxNjEwNDQ0fQ.Ntkvt0x3AD77hZ653IqTelqxVMH8rDIOqIAzM-BfBqU

router.post(
  '/login',
  createBodyValidator(schemas.schema),
  UsersController.login
);

router.post('/logout', authenticate, UsersController.logout);
router.get('/current', authenticate, UsersController.current);

module.exports = router;