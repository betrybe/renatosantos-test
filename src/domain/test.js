const req = require('express/lib/request');
const { connection, ObjectId } = require('../database');
const Repository = require('../repository');
const RecipeDomain = require('./recipe');

connection()
  .then((client) => {
    console.log('Id >>>', ObjectId());

    const repo = new Repository(client, ObjectId, 'recipes');

    const p = RecipeDomain.create(repo, ObjectId, {
      name: 'Peroá frito',
      ingredients: 'Peixe Peroá, fubá, sal e óleo.',
      preparation: 'frite',
      userId: '123'
    });

    p.then((val) => {
      console.log('rodou =>', val);
    }).catch((err) => {
      console.log('erro =>', err);
    });
    return 1;
  })
  .catch((err) => {
    console.log('erro ao conectar >>>', err);
  });
