const NotFoundObjectError = require('../common/NotFoundObjectError');

class Repository {
  /**
   * @description Create a generic repository to access database
   * @param {*} connection
   * @param {*} ObjectID
   * @param {*} collectionName
   */
  constructor(connection, ObjectID, collectionName) {
    this.ObjectID = ObjectID;
    this.collectionName = collectionName;
    this.collection = connection.collection(collectionName);
  }

  /**
   *@description generate a new unique id
   * @returns new unique id on database
   */
  nextId() {
    return new this.ObjectID();
  }

  /**
   * @description save object on database
   * @param {*} model
   */
  async save(model) {
    const { _id } = model;

    return this.collection
      .findOneAndUpdate(
        { _id },
        { $set: model },
        { upsert: true, returnNewDocument: true }
      )
      .then(() => model);
  }

  /**
   * @description delete an object by id from database
   * @param {*} id
   * @returns
   */
  async deleteById(id) {
    if (!this.ObjectId.isValid(id)) return null;

    const modelDeleted = await this.connection().then((db) =>
      db.collection('recipes').deleteOne({
        _id: this.ObjectId(id)
      })
    );

    return modelDeleted;
  }

  /**
   * Find an object by id on database
   * @param {*} id
   * @returns
   */
  async findById(id) {
    const modelMongo = await this.collection.findOne({
      _id: this.ObjectID(id)
    });
    if (!modelMongo) {
      throw new NotFoundObjectError('Object not found');
    }

    return modelMongo;
  }

  /**
   * find an object by field name and value passed by params
   * @param {*} params object {fied:?, value:?} for querie
   * @returns a list of registers on repository
   */
  async findByField(field, value) {
    const object = await this.collection
      .findOne(JSON.parse(`{"${field}":"${value}"}`))

    if (!object) return null;
    return object;
  }

  /**
   * find an object by field name and value passed by params
   * @param {*} params object {fied:?, value:?} for querie
   * @returns
   */
  async findAll() {
    const list = await this.collection.find().toArray();
    if (!list) return;
    return list;
  }
}

module.exports = Repository;
