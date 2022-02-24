import AuthorizationError from '../common/AuthorizationError';

const jwt = require('jsonwebtoken');

const TOKEN_AUTH_SECRET = process.env.TOKEN_AUTH_SECRET || 'abr@c@dabrw';

/**
 * @description Generate a new token
 * @param {*} param0
 * @returns
 */
const generateAuthToken = ({ email, role, name }) =>
  jwt.sign({ email, role, name }, TOKEN_AUTH_SECRET, { expiresIn: '30m' });

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

module.exports = { generateAuthToken, validateAuthToken };
