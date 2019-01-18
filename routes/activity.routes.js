/*
 *	Activity routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();

const activity_controller = require('../controllers/activity.controller');

// CRUD for ACTIVITY
router.post('/create', activity_controller.create);
//router.get('/:name', activity_controller.details);
router.get('/:groupName', activity_controller.listFromGroup);
router.put('/:name/update', activity_controller.update);
router.delete('/:name/delete', activity_controller.delete);

// Exports
module.exports = router;