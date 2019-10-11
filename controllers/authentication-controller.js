let jwt = require('jsonwebtoken');
const secret = require('../config/express/settings').secret;
const sendResponse = require('../utils/server-utils/serverResponse');
const encryption = require('../config/express/auth/encryption.js');
const MySqlService = require('../services/mysqlService');
const queryBuilder = require('../utils/query-builder/queryBuilder');
const schema = require('../utils/validation-schemas/user-validation-schema');
const validator = require('../utils/validator/validator');

module.exports = {
  login: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let validation = validator(req.body, schema);
    if (!validation.status) {
      return sendResponse(res, validation.errMessage);
    }

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
