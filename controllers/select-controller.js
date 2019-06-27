const ApiService = require('../services/apiService');
const connection = require('../config/db/dbConfig');
const sendResponse = require('../utils/serverResponse');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const urls = require('../utils/constants/urls');

module.exports = function (req, res) {
  const mysqlApi = new ApiService(connection);
  if ((req.path === urls.SELECT || req.path === urls.SELECT_ALL) && req.method === 'GET') {
    let query = queryBuilder.selectAll(); // 3) normal SQL query
    //  let query = queryBuilder.callProcedureWithINAndOUTParams('Sofia'); // 2) for storedProcedure with  IN and OUT params
    // let query = queryBuilder.callProcedureWithOnlyINParams();// 1) for storedProcedure with only IN params and placeholders

    return mysqlApi
    // .execute(query, ['Sofia']) // 1) for storedProcedure with only IN params and using placeholders, passed as array.
      .execute(query) // 3) and 1)
      .then(data => {
        sendResponse(res, data);
      })
      .catch(e => sendResponse(res, e.message));
  } else if (req.path.startsWith(urls.SELECT_ONE) && req.method === 'GET') {
    let userId = req.url.split('/').pop();
    let query = queryBuilder.getUserById(userId);

    return mysqlApi
      .execute(query)
      .then(data => {
        return sendResponse(res, data);
      })
      .catch(e => sendResponse(res, e.message));
  } else {
    return true;
  }
};
