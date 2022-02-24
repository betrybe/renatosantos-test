import ForbiddenError from '../common/ForbiddenError';

const createUser = async (userDomain, { name, email, password }) => {
  const role = 'user';
  const user = userDomain.create({ name, email, password, role });
  return user;
};

const createAdmin = async (userDomain, { name, email, password }, userAuth) => {
  if (userAuth !== 'admin') {
    ForbiddenError('Only admins can register new admins');
  }
  const role = 'admin';
  const admin = userDomain.create({ name, email, password, role });
  return admin;
};

module.exports = { createUser, createAdmin };
