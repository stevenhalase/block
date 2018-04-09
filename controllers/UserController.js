var UserModel = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            return res.json(Users);
        });
    },

    /**
     * UserController.getUser()
     */
    getUser: function (req, res) {
        UserModel.findOne({_id: req.params.id})
            .populate('People.User')
            .populate('PersonRequests.From')
            .populate('PersonRequests.To')
            .populate('Notifications.RelatedUser')
            .exec(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting User.',
                        error: err
                    });
                }
                if (!User) {
                    return res.status(404).json({
                        message: 'No such User'
                    });
                } else {
                    res.json(User);
                }
            });
    },

    /**
     * UserController.login()
     */
    login: function (req, res) {
        console.log('HERE: ' + req.body.Password)
        UserModel.findOne({ EmailAddress: req.body.EmailAddress})
            .populate('People.User')
            .populate('PersonRequests.From')
            .populate('PersonRequests.To')
            .populate('Notifications.RelatedUser')
            .exec(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting User.',
                        error: err
                    });
                }
                console.log('USER: ' + User);
                if (!User) {
                    return res.status(404).json({
                        message: 'No such User'
                    });
                } else {
                    console.log('COMPARE: ' + bcrypt.compareSync(req.body.Password, User.Password))
                    if(bcrypt.compareSync(req.body.Password, User.Password)) {
                        if (req.body.Location) {
                            User.Locations.push(req.body.Location);
                            User.save(function(err, User) {
                                if (err) {
                                    return res.json({
                                        message: 'Login failed.',
                                        error: 'Login failed.'
                                    });
                                }
                                return res.json(User);
                            })
                        } else {
                            return res.json(User);
                        }
                    } else {
                        return res.json({
                            message: 'Login failed.',
                            error: 'Login failed.'
                        });
                    }
                }
            });
    },

    /**
     * UserController.register()
     */
    register: function (req, res) {
        UserModel.findOne({ EmailAddress: req.body.EmailAddress })
            .exec(function(err, User) {
                if (err) {
                    return res.json({
                        message: 'Error creating User.',
                        error: err
                    });
                }
    
                if (User) {
                    return res.json({
                        message: 'Error creating User.',
                        error: 'Error creating User.'
                    });
                } else {
                    var User = new UserModel({
                        FirstName : req.body.FirstName,
                        LastName : req.body.LastName,
                        EmailAddress : req.body.EmailAddress,
                        Password : req.body.Password,
                        Locations : req.body.Locations
                    });
            
                    User.Password = bcrypt.hashSync(User.Password, salt);
                    User.save(function (err, User) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when creating User',
                                error: err
                            });
                        }
                        return res.status(201).json(User);
                    });
                }
            });
    },

    /**
     * UserController.personRequest()
     */
    personRequest: function (req, res) {
        var request = req.body;
        var fromId = request.From._id;
        var toId = request.To._id;
        let ids = [fromId, toId];
        console.log('REQUEST: ' + request, 'FROM: ' + fromId, 'TO: ' + toId)
        UserModel.update({_id: toId}, {$push: {Notifications: {RelatedUser: fromId, Type: 'personrequest', Date: new Date()}}}, function(err, User) {
            if (err) { console.log(error) }
        });
        UserModel.update({_id: { $in: ids }}, {$push: {PersonRequests: request}}, {multi: true})
            .exec(function(err) {
                if (err) {
                    return res.json({
                        message: 'Error processing request.',
                        error: err
                    });
                }
                return res.json(true);
            });
    },

    /**
     * UserController.personRequestApprove()
     */
    personRequestApprove: function (req, res) {
        var request = req.body;
        var fromId = request.fromId;
        var toId = request.toId;
        console.log('REQUEST: ' + request, 'FROM: ' + fromId, 'TO: ' + toId)
        UserModel.update({_id: toId}, {$push: {People: {User: fromId, Date: request.date}}, $pull: {Notifications: {relatedId: fromId}}}, function(err, User) {
            if (err) { console.log(error) }
        });
        UserModel.update({_id: fromId}, {$push: {People: {User: toId, Date: request.date}}}, function(err, User) {
            if (err) { console.log(error) }
        });
        return res.json(true);
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.FirstName = req.body.FirstName ? req.body.FirstName : User.FirstName;
			User.LastName = req.body.LastName ? req.body.LastName : User.LastName;
			User.EmailAddress = req.body.EmailAddress ? req.body.EmailAddress : User.EmailAddress;
			User.Password = req.body.Password ? req.body.Password : User.Password;
			User.Locations = req.body.Locations ? req.body.Locations : User.Locations;
			
            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

function manualPopulateNotifications() {

}
