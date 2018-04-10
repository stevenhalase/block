const PostModel = require('../models/PostModel.js');

/**
 * PostController.js
 *
 * @description :: Server-side logic for managing Posts.
 */
module.exports = {

    /**
     * PostController.list()
     */
    list: function (req, res) {
        PostModel.find()
            .populate('User')
            .exec(function (err, Posts) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Post.',
                        error: err
                    });
                }
                return res.json(Posts);
            });
    },

    /**
     * PostController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }
            return res.json(Post);
        });
    },

    /**
     * PostController.create()
     */
    create: function (req, res) {
        var Post = new PostModel({
			User : req.body.User,
			Date : req.body.Date,
			Content : req.body.Content,
			Attachments : req.body.Attachments

        });

        Post.save(function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Post',
                    error: err
                });
            }
            return res.status(201).json(Post);
        });
    },

    /**
     * PostController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }

            Post.User = req.body.User ? req.body.User : Post.User;
			Post.Date = req.body.Date ? req.body.Date : Post.Date;
			Post.Content = req.body.Content ? req.body.Content : Post.Content;
			Post.Attachments = req.body.Attachments ? req.body.Attachments : Post.Attachments;
			
            Post.save(function (err, Post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Post.',
                        error: err
                    });
                }

                return res.json(Post);
            });
        });
    },

    /**
     * PostController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PostModel.findByIdAndRemove(id, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Post.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
