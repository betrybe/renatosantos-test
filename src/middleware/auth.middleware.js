import AuthorizationError from '../common/AuthorizationError';
import auth from '../services/auth.service';

const authenticate = async (req, resp, next) => {
  try {
    const token = req.headers.authorization;
    const user = await auth.validateAuthToken(token);
    if (!user) {
      AuthorizationError('Invalid Login Credentials');
    }
    next(user);
  } catch (e) {
    const status = e.status || 401;
    const message = e.message || 'jwt malformed';
    resp.status(status).send({ message });
  }
};

module.exports = authenticate;
