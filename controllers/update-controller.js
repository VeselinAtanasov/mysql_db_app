const MySqlService = require('../services/mysqlService');
const sendResponse = require('../utils/server-utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const schema = require('../utils/validation-schemas/worker-validation-schema');
const validator = require('../utils/validator/validator');

module.exports = (req, res) => {
  const mysqlApi = new MySqlService();
  let userId = req.params.id;

  let validation = validator(req.body, schema);
  if (!validation.status) {
    return sendResponse(res, validation.errMessage);
  }

  /*  // Execute One single query:
      let multipleUpdate = queryBuilder.updateBothTables(userId, fields);

      return mysqlApi
        .execute(multipleUpdate)
        .then(data => {
          sendResponse(res, data);
        })
        .catch(e => sendResponse(res, e.message));
      */
  let userDataQuery = queryBuilder.updateUserData(userId, req.body);
  let jobsDataQuery = queryBuilder.updateJobsData(userId, req.body);

  return Promise.all([mysqlApi.execute(userDataQuery), mysqlApi.execute(jobsDataQuery)])
    .then(data => sendResponse(res, data))
    .catch(e => sendResponse(res, e.message));
};
