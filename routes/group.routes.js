/*
 *	Group routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();

const group_controller = require('../controllers/group.controller');

// CRUD for GROUP
router.post('/create', group_controller.create);
router.get('/:name', group_controller.details);
router.put('/:name/update', group_controller.update);
router.delete('/:name/delete', group_controller.delete);

// Exports
module.exports = router;