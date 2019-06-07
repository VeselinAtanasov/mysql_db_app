const queryBuilder = require('../utils/query-builder/queryBuilder');

class MySqlApi {
  constructor (connection) {
    this.connection = connection;
  }

  execute (firstQuery, secondQuery, modifySecondQuery) {
    if (arguments.length === 1) {
      return this.executeSingleQuery(firstQuery);
    }
    return this.executeMultipleQueries(firstQuery, secondQuery, modifySecondQuery);
  }

  executeSingleQuery (query) {
    return new Promise((resolve, reject) => {
      return this.connection.query(
        query,
        function (err, results) {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        }
      );
    });
  }

  executeMultipleQueries (firstQuery, secondQuery, modifySecondQuery) {
    return new Promise((resolve, reject) => {
      return this.connection.query(
        firstQuery,
        function (err, results) {
          if (err) {
            reject(err);
          }
          if (modifySecondQuery) {
            secondQuery = queryBuilder.insertEmployeeId(secondQuery, results.insertId);
          }
          return this.connection.query(
            secondQuery,
            function (err, finalResult) {
              if (err) {
                return reject(err);
              }
              return resolve(finalResult);
            }
          );
        }.bind(this)
      );
    });
  }
}

module.exports = MySqlApi;
