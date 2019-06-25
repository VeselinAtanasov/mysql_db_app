const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');

module.exports = function (req, res) {
  if (req.path.startsWith(urls.DELETE)) {
    const mysqlApi = new ApiService(connection);
    let userId = req.url.split('/').pop();
    let namesQuery = queryBuilder.deletePerson(userId);
    let jobsQuery = queryBuilder.deleteJob(userId);

    return mysqlApi
      .execute(namesQuery, jobsQuery)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => console.log(e));
  } else {
    return true;
  }
};
