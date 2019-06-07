const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const sendResponse = require('../utils/serverResponse');
const mysqlApi = new ApiService(connection);
const queryBuilder = require('../utils/query-builder/queryBuilder');

module.exports = function (req, res) {
  if (req.path.startsWith('/delete')) {
    let userId = req.url.split('/').pop();
    let namesQuery = queryBuilder.deletePerson(userId);
    let jobsQuery = queryBuilder.deleteJob(userId);

    mysqlApi
      .execute(namesQuery, jobsQuery)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => console.log(e));
  } else {
    return true;
  }
};
