import AuthorizationError from '../common/AuthorizationError';
import auth from '../services/auth.service';

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const token = auth.login(email, password);
    if (token) {
      return res.status(200).json({ token });
    }
    AuthorizationError('Authentication falure, e-mail or password is wrong!');
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = login;
