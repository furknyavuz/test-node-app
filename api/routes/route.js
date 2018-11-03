'use strict';
module.exports = function(app) {
    var testController = require('../controllers/testController');

    // todoList Routes
    app.route('/tests')
        .get(testController.list_all)
        .post(testController.create_a_test);

    app.route('/tests/:testId')
        .get(testController.read_a_test)
        .put(testController.update_a_test);
};
