const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');
const mysqlApi = new ApiService(connection);

module.exports = function (req, res) {
  if ((req.path === urls.SELECT || req.path === urls.SELECT_ALL) && req.method === 'GET') {
    let query = queryBuilder.selectAll();

    return mysqlApi
      .execute(query)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => console.log(e));
  } else if (req.path.startsWith(urls.SELECT_ONE) && req.method === 'GET') {
    let userId = req.url.split('/').pop();
    let query = queryBuilder.getUserById(userId);

    return mysqlApi
      .execute(query)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => console.log(e));
  } else {
    return true;
  }
};
