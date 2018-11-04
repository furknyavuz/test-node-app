'use strict';
module.exports = function (app) {
    let githubController = require('../controllers/githubController');

    app.route('/user/github/:token')
        .get(githubController.inhale_user);
};
