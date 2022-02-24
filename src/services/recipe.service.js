import ForbiddenError from '../common/ForbiddenError';

const path = require('path');
const fs = require('fs');

/**
 * @description Check if user is admin or owner´s recipe
 * @param {*} recipe
 * @param {*} userAuth
 */
const checkPermission = (recipe, userAuth) => {
  if (!(userAuth.role === 'admin' || recipe.userId === userAuth.id)) {
    ForbiddenError('Only admin or owner of recipe can update or delete it.');
  }
};

/**
 * @description Create a new recipe
 * @param {*} recipeDomain
 * @param {*} recipe
 */
const createRecipe = async (recipeDomain, recipe) => {
  recipeDomain.create(recipe);
};

/**
 * @description Delete a recipe by id
 * @param {*} recipeDomain
 * @param {*} id
 * @param {*} userAuth
 * @returns
 */
const deleteById = async (recipeDomain, recipeId, userAuth) => {
  const recipe = await recipeDomain.findById(recipeId);
  checkPermission(recipe, userAuth);

  return recipeDomain.delete(recipeId);
};

/**
 * @descriptionUpdate Update a exists recipe
 * @param {*} recipeDomain
 * @param {*} recipe
 * @param {*} userAuth check if admin or owner of recipe
 */
const save = async (recipeDomain, recipe, userAuth) => {
  checkPermission(recipe, userAuth);
  recipeDomain.save(recipe.recipeId);
};

/**
 * @descriptionFind a single recipe by id
 * @param {*} recipeDomain
 * @param {*} recipeId
 */
const findById = async (recipeDomain, recipeId) => {
  recipeDomain.findById(recipeId);
};

/**
 * @description Find a list of all recipes
 * @param {*} recipeDomain
 * @param {*} recipeId
 * @returns
 */
const listAll = async (recipeDomain, recipeId) =>
  recipeDomain.listAll(recipeId);

/**
 * @description Save or update a recipe image
 * @param {*} recipeId
 * @param {*} file
 * @param {*} userAuth
 * @returns
 */
const updateImage = async (recipeDomain, recipeId, file, userAuth) => {
  const location = process.env.PATH_IMAGE || '../uploads';
  const serverURL = process.env.URL || 'localhost:3000';
  const recipe = await recipeDomain.findById(recipeId);

  checkPermission(recipe, userAuth);

  if (!file) throw new Error('Please upload a file');

  const [, extension] = file.mimetype.split('/');

  const tempPath = file.path;
  const targetPath = path.join(
    __dirname,
    `${location}/${recipeId}.${extension}`
  );

  fs.rename(tempPath, targetPath, (err) => {
    if (err) console.log(err);
  });

  recipe.image = `${serverURL}/src/${location}/${recipeId}.${extension}`;
  const recipeJson = recipe.toJson();
  return save(recipeJson, recipe, userAuth);
};

/**
 * @description Get a image´s recipe if it exists
 * @param {*} fileName
 * @returns
 */
const getImage = (fileName) => {
  const location = process.env.PATH_IMAGE || '../uploads';
  const file = path.join(__dirname, `${location}/${fileName}`);
  return file;
};

module.exports = {
  createRecipe,
  save,
  deleteById,
  findById,
  listAll,
  updateImage,
  getImage
};
