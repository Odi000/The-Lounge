const { Router } = require('express');
const memberRouter = Router();
const memberController = require('../controllers/memberController');

memberRouter.post('/', memberController.post);

module.exports = memberRouter;