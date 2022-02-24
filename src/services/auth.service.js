import AuthorizationError from '../common/AuthorizationError';

const jwt = require('jsonwebtoken');

const TOKEN_AUTH_SECRET = process.env.TOKEN_AUTH_SECRET || 'abr@c@dabrw';

/**
 * @description Generate a new token based on e-mail and name
 * @param {*} param0
 * @returns
 */
const generateAuthToken = ({ email, name }) =>
  jwt.sign({ email, name }, TOKEN_AUTH_SECRET, { expiresIn: '30m' });

/**
 * @description Authenticate user based on e-mail and password
 * @param {*} email
 * @param {*} password
 * @returns
 */
const login = async (userDomain, email, password) => {
  const user = await userDomain.findByField('email', email);
  if (user.password === password) {
    return generateAuthToken({ email, name: user.name });
  }
  return false;
};

/**
 * @description Validate a token
 * @param {*} token
 * @returns
 */
const validateAuthToken = (token) => {
  if (!token) throw new AuthorizationError('missing auth token');

  return jwt.verify(token, this.SECRET, (err, decoded) => {
    if (err) throw new AuthorizationError('jwt malformed');
    return {
      id: decoded.id,
      email: decoded.email
    };
  });
};

module.exports = { login, validateAuthToken };
