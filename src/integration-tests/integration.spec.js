const { expect } = require('chai');

const { MongoClient } = require('mongodb');
const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const Repository = require('../repository');
const RecipeDomain = require('../domain/recipe');
const UserDomain = require('../domain/user');

describe('3.1 - Teste Unitário no Repository', () => {
  let connection;
  let db;

  beforeEach(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection.db('Cookmaster');
  });

  it('Será validado se uma nova receita é criada pelo Repository para Recipe', async () => {
    const { ObjectId } = require('mongodb');
    const repo = new Repository(db, ObjectId, 'recipes');
    const obj = await repo.save({
      _id: 123,
      name: 'moqueca',
      ingredients: 'peixe e pimenta',
      preparation: 'cozinhe',
      userId: '123'
    });

    expect(obj.name).to.eq('moqueca');
  });

  it('Será validado se uma nova receita é criada pelo Repository User', async () => {
    const { ObjectId } = require('mongodb');
    const repo = new Repository(db, ObjectId, 'users');
    const obj = await repo.save({
      _id: repo.nextId(),
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user'
    });

    expect(obj.name).to.eq('Erick Jacquin');
  });
});

describe('3.2 - Testes de Integração: Repository + Model para Recipes', () => {
  let connection;
  let db;
  const { ObjectId } = require('mongodb');
  let repo = undefined;
  beforeEach(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection.db('Cookmaster');
  });

  it('Será validado se uma nova receita é criada pelo Domain/Recipe', async () => {
    repo = new Repository(db, ObjectId, 'recipes');
    const obj = await RecipeDomain.create(repo, {
      name: 'Peroá frito',
      ingredients: 'Peixe Peroá, fubá, sal e óleo.',
      preparation: 'frite',
      userId: '123'
    });

    expect(obj.name).to.eq('Peroá frito');
  });

  it('Não deve ser possível registrar dados errados para Domain/Recipe', async () => {
    repo = new Repository(db, ObjectId, 'users');
    try {
      const obj = await RecipeDomain.create(repo, {
        name: 'Maria Quintino',
        email: 'maria@gmail.com',
        password: '12345678',
        role: 'user'
      });
    } catch (err) {
      expect(err.message).to.eql('Invalid entries. Try again.');
    }
  });
});

describe('3.3 - Testes de Integração: Repository + Model para Users', () => {
  let connection;
  let db;
  const { ObjectId } = require('mongodb');
  let repo = undefined;
  beforeEach(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection.db('Cookmaster');
    repo = new Repository(db, ObjectId, 'users');
  });

  it('Será validado se um novo usuário é criado pelo Domain/User', async () => {
    const obj = await UserDomain.create(repo, {
      name: 'Sophia Quintino',
      email: 'sophia2@gmail.com',
      password: '987654',
      role: 'user'
    });

    expect(obj.name).to.eq('Sophia Quintino');
  });

  it('Não deve ser possível registrar dados errados para Domain/User', async () => {
    try {
      const obj = await RecipeDomain.create(repo, {
        name: '',
        email: undefined,
        password: '12345678',
        role: 'user'
      });
    } catch (err) {
      expect(err.message).to.eql('Invalid entries. Try again.');
    }
  });
});
