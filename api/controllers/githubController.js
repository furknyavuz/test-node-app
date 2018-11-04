'use strict';

const request = require('request');
const mongoose = require('mongoose');
let User = mongoose.model('User');

exports.inhale_user = function (req, res) {
    console.log(req.params.token);

    let options = {
        url: 'https://api.github.com/user',
        headers: {
            'Authorization': 'Bearer ' + req.params.token,
            'Content-Type': 'application/json',
            'User-Agent': 'Business Card App'
        }
    };

    request(options, (err, inhale_res, body) => {
        if (!err && inhale_res.statusCode === 200) {
            let new_user = new User();
            new_user.github = JSON.parse(body);
            new_user.markModified('github');
            new_user.save(function (err, user) {
                if (!err) {
                    res.json(user);
                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    });
};

exports.create_a_user = function (req, res) {
    let new_user = new User();
    new_user.github = req.body;
    new_user.markModified('github');
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.read_a_user = function (req, res) {
    User.findById(req.params.userId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_user = function (req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {github: req.body}, {new: true}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

