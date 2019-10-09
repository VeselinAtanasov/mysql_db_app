let jwt = require('jsonwebtoken');
const secret = require('../config/express/settings').secret;
const sendResponse = require('../utils/server-utils/serverResponse');
const encryption = require('../config/express/auth/encryption.js');
const MySqlService = require('../services/mysqlService');
const queryBuilder = require('../utils/query-builder/queryBuilder');

module.exports = {
  login: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let mysqlApi = new MySqlService();
    let query = queryBuilder.getUser(username);

    return mysqlApi
      .execute(query)
      .then(data => {
        if (data.length === 0) {
          return sendResponse(res, {
            success: true,
            message: 'User is not registered!'
          });
        }
        let dbUser = data[0].username;
        let dbPassword = data[0].password;
        let dbSalt = data[0].salt;
        let hashedPass = encryption.generateHashedPassword(dbSalt, password);

        if (username === dbUser && hashedPass === dbPassword) {
          let token = jwt.sign({ username: username, password: hashedPass }, secret, { expiresIn: '1h' });
          let storeTokenQuery = queryBuilder.updateToken(username, token);

          return mysqlApi
            .execute(storeTokenQuery)
            .then(() => {
              return sendResponse(res, {
                success: true,
                message: 'Authentication successful!',
                token: token
              });
            })
            .catch(e => sendResponse(res, e.message));
        }

        return sendResponse(res, {
          success: false,
          message: 'Incorrect username or password'
        });
      })
      .catch(e => sendResponse(res, e.message));
  }
};
