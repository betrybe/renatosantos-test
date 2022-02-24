const controller = (userServices, userDomain) => {
  const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await userServices.createUser(userDomain, {
        name,
        email,
        password
      });
      const user = newUser.toJson();
      delete user.password;

      return res.status(201).json({ user });
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  return { createUser };
};

module.exports = controller;
