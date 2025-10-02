const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hw2_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connessione al database riuscita!');
  })
  .catch(err => {
    console.error('Errore nella connessione al database:', err);
    process.exit(1);
  });

module.exports = sequelize;