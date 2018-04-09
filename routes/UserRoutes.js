var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.get('/', UserController.list);

/*
 * GET
 */
router.get('/:id', UserController.getUser);

/*
 * POST
 */
router.post('/login', UserController.login);

/*
 * POST
 */
router.post('/register', UserController.register);

/*
 * POST
 */
router.post('/personrequest', UserController.personRequest);

/*
 * POST
 */
router.post('/personrequest/approve', UserController.personRequestApprove);

/*
 * PUT
 */
router.put('/:id', UserController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.remove);

module.exports = router;
