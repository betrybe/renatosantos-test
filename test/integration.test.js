
const { MongoClient } = require('mongodb');
const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const Repository = require('../src/repository');
const RecipeDomain = require('../src/domain/recipe');

const url = 'http://localhost:3000';


describe('3.1 - Teste Unitário no Repository', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection.db('Cookmaster');
  });

  it('Será validado se uma nova receita é criada pelo Repository', async () => {
    const { ObjectId } = require('mongodb');
    const repo = new Repository(db, ObjectId, 'recipes');
    const obj = await repo.save({
      _id: 123,
      name: 'moqueca',
      ingredients: 'peixe e pimenta',
      preparation: 'cozinhe',
      userId: '123'
    });

    expect(obj).toBeDefined();
    expect(obj).toHaveProperty('name', 'moqueca');
  });
});

describe('3.2 - Testes de Integração: Repository + Model para Recipes', () => {
  let connection;
  let db;
  const { ObjectId } = require('mongodb');
  let repo = undefined;
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection.db('Cookmaster');
    repo = new Repository(db, ObjectId, 'recipes');
  });

  it('Será validado se uma nova receita é criada pelo Domain/Recipe', async () => {
    const obj = await RecipeDomain.create(repo, ObjectId, {
      name: 'Peroá frito',
      ingredients: 'Peixe Peroá, fubá, sal e óleo.',
      preparation: 'frite',
      userId: '123'
    });

    expect(obj).toBeDefined();
    expect(obj).toHaveProperty('name', 'Peroá frito');
  });
});
