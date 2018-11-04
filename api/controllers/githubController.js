'use strict';

const request = require('request');
const mongoose = require('mongoose');

const GITHUB_API_USER = 'https://api.github.com/user';

let User = mongoose.model('User');

function findOneAndUpdateByDbId(db_id, github, token, client_res) {
    User.findOneAndUpdate({_id: db_id}, {
        github: github,
        github_token: token
    }, {new: true}, function (db_err, updated_user) {
        if (!db_err) {
            client_res.json(updated_user);
        } else {
            console.log(db_err);
            client_res.send(500, db_err);
        }
    });
}

function findOneAndUpdateByGithubId(github, token, client_res) {
    User.findOneAndUpdate({github_id: github.id}, {github: github, github_token: token}, {
        new: true,
        upsert: true
    }, function (db_err, updated_user) {
        if (!db_err) {
            client_res.json(updated_user);
        } else {
            console.log(db_err);
            client_res.send(500, db_err);
        }
    });
}

exports.inhale_user = function (client_req, client_res) {
    if (!client_req.params.token) {
        client_res.send(403, 'Token required');
    }

    let db_id = client_req.query.id;
    let token = client_req.params.token;
    let bearer = `Bearer ${token}`;

    let options = {
        url: GITHUB_API_USER,
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json',
            'User-Agent': 'Business Card App'
        }
    };

    request(options, (inhale_err, inhale_res, inhale_body) => {
        if (!inhale_err && inhale_res.statusCode === 200) {

            let github = JSON.parse(inhale_body);

            if (db_id) {
                findOneAndUpdateByDbId(db_id, github, token, client_res);
            } else {
                findOneAndUpdateByGithubId(github, token, client_res);
            }
        } else {
            console.log(inhale_err);
            client_res.send(inhale_res.statusCode, inhale_err);
        }
    });
};
