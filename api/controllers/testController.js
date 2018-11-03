'use strict';

var mongoose = require('mongoose'),
    Test = mongoose.model('Tests');

exports.list_all = function(req, res) {
    Test.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.read_a_test = function(req, res) {
    Test.findById(req.params.testId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_a_test = function(req, res) {
    var new_task = new Test(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_test = function(req, res) {
    Test.findOneAndUpdate({_id: req.params.testId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

