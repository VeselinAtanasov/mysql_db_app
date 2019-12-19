let jwt = require('jsonwebtoken');
const secret = require('../settings').secret;
const sendResponse = require('../../../utils/server-utils/serverResponse');
const MySqlService = require('../../../services/mysqlService');
const queryBuilder = require('../../../utils/query-builder/queryBuilder');
const messages = require('../../../utils/constants/messages');

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.split(' ')[1]; // token.slice(7, token.length);
    }

    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return sendResponse(res, {
          success: false,
          message: messages.INVALID_TOKEN
        });
      }
      let mysqlApi = new MySqlService();
      let username = decoded.username;
      let hashedPass = decoded.password;
      let query = queryBuilder.getUser(username);
      return mysqlApi
        .execute(query)
        .then(data => {
          if (data[0].username === username && data[0].password === hashedPass) {
            req.decoded = decoded;
            return next();
          }
          return sendResponse(res, {
            success: false,
            message: messages.INVALID_TOKEN
          });
        }).catch(e => sendResponse(res, {
          success: false,
          message: messages.INVALID_TOKEN
        }));
    });
  }

  return sendResponse(res, {
    success: false,
    message: messages.TOKEN_NOT_PROVIDED
  });
};
