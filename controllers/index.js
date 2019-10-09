const selectController = require('./select-all-controller');
const updateController = require('./update-controller');
const updateJobsDataController = require('./update-jobs-controller');
const updateNameDataController = require('./update-name-controller');
const deleteController = require('./delete-controller');
const insertController = require('./insert-controller');
const selectOneController = require('./select-one-controller');
const userController = require('./authentication-controller');

module.exports = {
  selectController,
  updateController,
  deleteController,
  insertController,
  selectOneController,
  updateJobsDataController,
  updateNameDataController,
  userController
};
