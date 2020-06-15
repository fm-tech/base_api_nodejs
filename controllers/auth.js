
const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  // console.log(req.headers)
  // Looks for authrotization token in request headers
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;