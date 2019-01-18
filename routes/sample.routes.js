/*
 *	TEST ROUTES
 *
 */

// DEPENDENCIES
const express = require('express');
const router = express.Router();

const sample_controller = require('../controllers/sample.controller');

// Sending some sample JSONs
router.get('/groupjson', sample_controller.send_group_json);
router.get('/activityjson', sample_controller.send_activity_json);

// Exports
module.exports = router;