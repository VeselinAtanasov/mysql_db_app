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
    let userQuery = queryBuilder.getUser(username);

    return mysqlApi.execute(userQuery)
      .then(values => {
        if (!values[0]) {
          return sendResponse(res, {
            success: false,
            message: 'This username does not exist! Please register first!'
          });
        }
        let userData = values[0];

        let salt = userData.salt;
        let dbUser = userData.username;
        let dbPassword = userData.password;
        let hashedPass = encryption.generateHashedPassword(salt, password);

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
          message: 'Wrong Password'
        });
      })
      .catch(e => sendResponse(res, e.message));
  },

  register: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let validation = validator(req.body, schema);
    if (!validation.status) {
      return sendResponse(res, validation.errMessage);
    }

    let mysqlApi = new MySqlService();
    let userQuery = queryBuilder.getUser(username);

    return mysqlApi.execute(userQuery)
      .then(values => {
        if (values.length !== 0) {
          return sendResponse(res, {
            success: true,
            message: 'User with this username exists!'
          });
        }
        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, password);
        let token = jwt.sign({ username: username, password: hashedPass }, secret, { expiresIn: '1h' });
        let storeUserAndToken = queryBuilder.addUser(username, hashedPass, token, salt);

        return mysqlApi
          .execute(storeUserAndToken)
          .then(() => {
            return sendResponse(res, {
              success: true,
              message: 'Registration successfully!',
              token: token
            });
          })
          .catch(e => sendResponse(res, e.message));
      })
      .catch(e => sendResponse(res, e.message));
  }
};
