const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const sendResponse = require('../utils/serverResponse');
const mysqlApi = new ApiService(connection);
const queryBuilder = require('../utils/query-builder/queryBuilder');

module.exports = function (req, res) {
  if ((req.path === '/' || req.path === '/select') && req.method === 'GET') {
    let query = queryBuilder.selectAll();

    mysqlApi
      .execute(query)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => console.log(e));
  } else if (req.path.startsWith('/selectOne') && req.method === 'GET') {
    let userId = req.url.split('/').pop();
    let query = queryBuilder.getUserById(userId);

    mysqlApi
      .execute(query)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => console.log(e));
  } else {
    return true;
  }
};
