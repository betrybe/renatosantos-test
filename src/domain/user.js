const Assertion = require('../common/Assertion');

const NOT_NULL_MESSAGE = 'Invalid entries for User. Try again.';

class User {
  constructor({ id, name, email, password, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    if (!role) this.role = 'user';
    else this.role = role;
  }

  set id(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aId = value;
  }

  get id() {
    return this.aId;
  }

  set name(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aName = value;
  }

  get name() {
    return this.aName;
  }

  set email(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    Assertion.assertIsEmail(value, NOT_NULL_MESSAGE);
    this.aEmail = value;
  }

  get email() {
    return this.aEmail;
  }

  set role(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aRole = value;
  }

  get role() {
    return this.aRole;
  }

  set password(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aPassword = value;
  }

  get password() {
    return this.aPassword;
  }

  /**
   *
   * @returns Convert this user to Json
   */
  toJson() {
    return {
      _id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password
    };
  }

  /**
   * @description Mount a object user
   * @param {*} parameters fields of user
   * @returns return a object user
   */
  static fromJson({ _id, name, email, password, role }) {
    const user = new User({
      id: _id,
      name,
      email,
      password,
      role
    });

    return user;
  }

  static async create(repository, generateId, { name, email, password, role }) {
    await this.validDuplicatedEmail(email);

    const user = new User({
      id: generateId(),
      name,
      email,
      password,
      role
    });

    await repository.save(user.toJson());

    return user;
  }

  static async validDuplicatedEmail(repository, email) {
    const user = await repository.findByEmail(email);
    Assertion.assertIsNullDuplicated(user, 'Email already registered');
  }
}

module.exports = User;
