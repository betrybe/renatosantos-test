const Assertion = require('../common/Assertion');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';
/**
 * @description Represent a Recipe in Domain
 */
class Recipe {
  constructor({ id, name, ingredients, preparation, userId }) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
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

  set ingredients(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aIngredients = value;
  }

  get ingredients() {
    return this.aIngredients;
  }

  set preparation(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aPreparation = value;
  }

  get preparation() {
    return this.aPreparation;
  }

  set userId(value) {
    Assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aUserId = value;
  }

  get userId() {
    return this.aUserId;
  }

  set image(value) {
    this.aImage = value;
  }

  get image() {
    return this.aImage;
  }

  /**
   *
   * @param {*} repository injection depedency for repository
   * @param {*} parameters values to object attributes
   * @returns
   */
  static async create(repository, { name, ingredients, preparation, userId }) {
    const recipe = new Recipe({
      id: repository.nextId(),
      name,
      ingredients,
      preparation,
      userId
    });

    return repository.save(recipe.toJson());
  }

  /**
   * 
   * @param {*} repository 
   * @returns return a list of recipes
   */
  static async listAll(repository) {
    return repository.listAll();
  }

  /**
   * 
   * @param {*} repository 
   * @param {*} id 
   * @returns a recipe if exists
   */
  static async findById(repository, id) {
    return repository.findById(id);
  }

  /**
   * @returns Convert this a recipe to Json
   */
  toJson() {
    return {
      _id: this.id,
      name: this.name,
      ingredients: this.ingredients,
      preparation: this.preparation,
      userId: this.userId,
      image: this.image
    };
  }

  /**
   *
   * @param {*} object type Recipe
   * @returns
   */
  static fromJson({ _id, name, ingredients, preparation, userId, image }) {
    const recipe = new Recipe({
      id: _id,
      name,
      ingredients,
      preparation,
      userId
    });
    recipe.image = image;

    return recipe;
  }
}

module.exports = Recipe;
