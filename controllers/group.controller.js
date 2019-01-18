/*
 *  Group Controllers
 *
 */

// @TODO It'd be a good idea to store 2 passwords, a masterkey able to delete and modify. And a common key, able to see details and update groups.
// @TODO add the masterPassword function.

// Dependencies
const Group = require('../models/group.model');
const Helpers = require('../lib/helpers');


// Create container
var _group = {};

// Create a new group.
// Required data: name, password, description.
// Optional data: masterPassword.
_group.create = function (req, res) {

    var groupName = typeof(req.body.name) == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
    var groupPassword = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
    var groupDescription = typeof(req.body.description) == 'string' && req.body.description.trim().length > 0 ? req.body.description.trim() : false; 
    
    var hashedPassword = Helpers.hash(groupPassword);

    if(groupName && groupPassword && groupDescription) {
        if(groupPassword.length > 5) {
            if(hashedPassword){
            
                // Create new group as an model.
                let group = new Group({
                        name: groupName,
                        password: Helpers.hash(groupPassword),
                        description: groupDescription
                        });

                // Verify that the name does not exist in the database.
                Group.find({name: groupName},function(err, groupData){

                    if(!err) {

                        if(!(groupData && groupData.length)) {

                            group.save(function (err) {
                                if (!err) {
                                    res.status(201);
                                    res.send('Group Created successfully.');
                                } else {
                                    console.log(err);
                                    res.status(500);
                                    res.send('Could not create the group.');
                                }
                            });

                        } else {
                            res.status(409);
                            res.send('Name already in use.');
                        }
                            

                    } else {
                        console.log(err);
                        res.status(500);
                        res.send('Something failed in the search.');
                    }
                
                });

            } else {
                console.log(err);
                res.status(500);
                res.send('Problem hashing the password.');
            }

        } else {
            res.status(400);
            res.send('Password is too short.');
        }

    } else {
        res.status(400);
        res.send('Missing required field(s).');
    }
    
};

// READ
// Required data: name.
// Optional data: none. 
_group.details = function (req, res) {

    var groupName = typeof(req.params.name)=='string' && req.params.name.trim().length > 0 ? req.params.name.trim() : false;

    if(groupName) {

        Group.find({name: groupName}, function (err, groupData) {

            if (!err) { 

                if(groupData && groupData.length) {

                    // For some reason 'delete group.password' wasn't working, so I had to use this ugly fix.
                    var resultGroup = {}; 
                    resultGroup._id = groupData[0].id;
                    resultGroup.name = groupData[0].name;
                    resultGroup.description = groupData[0].description;
                    res.status(200);
                    res.send(resultGroup);

                } else {
                    res.status(404);
                    res.send('There\'s no group with that name.');
                }

            } else {
                console.log(err);
                res.status(500);
                res.send('Problem reading database.');
            }

        });

    } else {
        res.status(400);
        res.send('Missing required field(s).');
    }
    
};

// UPDATE
// Required data: name, oldPassword.
// Optional data: newPassword, description.
// @TODO required some kind of authentication.
// @TODO: This method should require the current password and a new one, because it causes the database to store an unencrypted password.
_group.update = function (req, res) {

    var groupName = typeof(req.params.name)=='string' && req.params.name.trim().length > 0 ? req.params.name.trim() : false;
    var groupOldPassword = typeof(req.body.oldPassword)=='string' && req.body.oldPassword.trim().length > 0 ? req.body.oldPassword.trim() : false;
    var groupNewPassword = typeof(req.body.newPassword)=='string' && req.body.newPassword.trim().length > 0 ? req.body.newPassword.trim() : false;
    var groupNewDescription = typeof(req.body.newDescription)=='string' && req.body.newDescription.trim().length > 0 ? req.body.newDescription.trim() : false;

    if(groupName && groupOldPassword) {

        Group.find({name:groupName}, function(err, groupData){

            if(!err) {

                if(groupData && groupData.length) {

                    groupData = groupData[0];

                    if((groupNewPassword && groupNewPassword.length > 5) || !groupNewPassword)  {

                        // Hashes newPassword.
                        var hasedNewPassword = Helpers.hash(groupNewPassword);

                        // Creates object with the new values.
                        var updatedGroup = {
                            password : groupNewPassword ? hasedNewPassword : group.password,
                            description : groupNewDescription ? groupNewDescription : group.description   
                        }

                        if(groupData.password == Helpers.hash(groupOldPassword)){

                            Group.findByIdAndUpdate(group._id, {$set: updatedGroup}, function (err, groupData) {
                                if (!err) {
                                    res.status(200);
                                    res.send('Group udpated successfully.');
                                } else {
                                    console.log(err);
                                    res.status(500);
                                    res.send('Could not update group info.');
                                }
                            });

                        } else {
                            res.status(400);
                            res.send('Wrong name/password.');
                        }

                    } else {
                        res.status(400);
                        res.send('New password is too short.');
                    }


                } else {
                    res.status(404);
                    res.send('There\'s no group with that name.')
                }

            } else {
                console.log(err);
                res.status(500);
                res.send('Problem reading database.');
            }

        });

    } else {
        res.status(400);
        res.send('Missing required field(s).');
    }
    
};

// DELETE
// Required data: Name, Password.
// Optional data: none.
_group.delete = function (req, res) {

    var groupName = typeof(req.params.name)=='string' && req.params.name.trim().length > 0 ? req.params.name.trim() : false;
    var groupPassword = typeof(req.body.password)=='string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;

    if(groupName && groupPassword) {

        Group.find({name:groupName}, function(err, groupData){

            if(!err) {

                if(groupData && groupData.length) {

                    groupData = groupData[0];

                    if(groupData.password == Helpers.hash(groupPassword)){

                        Group.findByIdAndRemove(req.params.id, function (err) {
                            if (!err) {
                                res.status(200);
                                res.send('Group deleted successfully.');
                            } else {
                                console.log(err);
                                res.status(500);
                                res.send('Could not delete the group.');
                            }
                        });

                    } else {
                        res.status(400);
                        res.send('Wrong name/password.');
                    }
                    
                } else {
                    res.status(404);
                    res.send('There\'s no group with that name.')
                }

            } else {
                console.log(err);
                res.status(500);
                res.send('Problem reading database.');
            }

        });

    } else {
        res.status(400);
        res.send('Missing required field(s).');
    }
    
};

// Authenticate.
// Required data: 

// Export the functions
module.exports = _group;
