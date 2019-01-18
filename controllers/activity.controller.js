/*
 *  Activity Controllers
 *
 */


// Dependencies
const Activity = require('../models/activity.model');
const Group = require('../models/group.model');
const Helpers = require('../lib/helpers');


// Create container
var _activity = {};


// Create a new group.
// Required data: name, description, group, password.
// Optional data: priority.
_activity.create = function (req, res) {

    var activityName = typeof(req.body.activityName) == 'string' && req.body.activityName.trim().length > 0 ? req.body.activityName.trim() : false;
    var activityDescription = typeof(req.body.activityDescription) == 'string' && req.body.activityDescription.trim().length > 0 ? req.body.activityDescription.trim() : false;
    var groupName = typeof(req.body.groupName) == 'string' && req.body.groupName.trim().length > 0 ? req.body.groupName.trim() : false; 
    var groupPassword = typeof(req.body.groupPassword) == 'string' && req.body.groupPassword.trim().length > 0 ? req.body.groupPassword.trim() : false; 
    var _priority = parseInt(req.body.priority);
    var priority = _priority >= 0 && _priority < 4 ? _priority : 0;

    var hashedPassword = Helpers.hash(groupPassword);

    if(activityName && activityDescription && groupName && groupPassword) {
        
        Group.find({name: groupName}, function(err, groupData){

        	if(!err){

        		if(groupData && groupData.length) {

	        		if(groupData[0].password == hashedPassword){

	        			let newActivity = new Activity ({
	        				name : activityName,
	        				description : activityDescription,
	        				date : Date.now(),
	        				priority : priority,
	        				group : groupName
	        			});

	        			newActivity.save(function (err) {

	                        if (!err) {
	                            res.status(201);
	                            res.send('Activity created successfully.');
	                        } else {
	                            console.log(err);
	                            res.status(500);
	                            res.send('Could not create the activity.');
	                        }

	                    });

	        		} else {
	        			res.status(400);
	                    res.send('Wrong name/password.');
	        		}

	        	} else {
	        		res.status(404);
	                res.send('There\'s no group with that name.');
	        	}

    		} else {
    			console.log(err);
                res.status(500);
                res.send('Could not create the activity.');
    		}

        });

    } else {
        res.status(400);
        res.send('Missing required field(s).');
    }
    
};

// READ
// @TODO incomplete
_activity.details = function (req, res) {
	res.send('This function is not ready yet.');
};

// UPDATE
// @TODO incomplete
_activity.update = function (req, res) {
    res.send('This function is not ready yet.');
};

// DELETE
// @TODO incomplete
_activity.delete = function (req, res) {
    res.send('This function is not ready yet.');
};

// Returns list of activities from a group.
// Required data: groupName, groupPassword.
// Optional data: ???.
_activity.listFromGroup = function (req, res) {
	var groupName = typeof(req.params.groupName) == 'string' && req.params.groupName.trim().length > 0 ? req.params.groupName.trim() : false; 
    var groupPassword = typeof(req.body.groupPassword) == 'string' && req.body.groupPassword.trim().length > 0 ? req.body.groupPassword.trim() : false; 
    
    if(groupName) {

    	if(groupPassword) {

    		var hashedPassword = Helpers.hash(groupPassword);

    		Group.find({name: groupName}, function(err, groupData){

    			if(!err) {

    				if(groupData && groupData.length) {

    					if(groupData[0].password == hashedPassword) { 

    						Activity.find({group: groupName}, function(err, activities){
    							if(!err) {

    								res.send(activities);

    							} else {
    								res.status(500);
    								res.send('Couldn\'t retrieve the information requested.');
    							}

    						});

    					} else {
    						res.status(400);
    						res.send('The password is incorrect.');
    					}

    				} else {
    					res.status(404);
    					res.send('That group does not exist.');
    				}

    			} else {
    				res.status(500);
    				res.send('Couldn\'t retrieve the information requested.');
    			}

    		});

    	} else {
    		res.status(400);
    		res.send('Uh oh, I think you didn\'t provide a password');
    	}

    } else {
    	res.status(400);
    	res.send('You didn\'t provide a group name.');
    }
};


// Export the functions
module.exports = _activity;