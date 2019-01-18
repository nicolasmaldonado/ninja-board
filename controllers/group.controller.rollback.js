//ROLLBACK TO THIS IN CASE SOMETHING BREAKS


const Group = require('../models/group.model');
const Helpers = require('../lib/helpers');


// Create container
var _group = {};

// Create a new group.
// Required data: name, password, description.
// Optional data: none.
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
                Group.find({name: groupName},function(err, g){

                    if(!err) { 
                        console.log(g);

                        if(!(g && g.length)) {

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
                        res.status(500);
                        res.send('Something failed in the search.');
                    }
                
                });

            } else {
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
// @TODO change required params in findById
_group.details = function (req, res) {

    var groupName = typeof(req.params.name)=='string' && req.params.name.trim().length > 0 ? req.params.name.trim() : false;

    if(groupName) {

        Group.find({name: groupName}, function (err, group) {

            if (!err) { 

                if(group && group.length) {

                    console.log(group[0]);
                    console.log(typeof(group));

                    delete group.password;
                    res.status(200);
                    res.send(group);

                } else {
                    res.status(404);
                    res.send('There\'s no group with that name.');
                }

            } else {
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
// Required data: Name.
// Optional data: none.
// @TODO change required params.
// @TODO required some kind of authentication.
_group.update = function (req, res) {
    Group.findByIdAndUpdate(req.params.name, {$set: req.body}, function (err, group) {
        if (err) return next(err);
        res.send('Group udpated.');
    });
};

// DELETE
// @TODO change required params
_group.delete = function (req, res) {
    Group.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

// Export the functions
module.exports = _group;
