const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

const dbUsers = require("./auth/users.js")

const seq = new Sequelize('ikt_projekt', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        requestTimeout: 300000,
    },
    dialectOptions: {
        options: { encrypt: true },
    },
    logging: true, //dbConfig.DB_LOGGING,
});


const db = {};
db.Sequelize = Sequelize;
db.seq = seq;
db.QueryTypes = QueryTypes;

db.Auth = {};

db.Auth.User = dbUsers(seq, Sequelize, DataTypes)


//module.exports = checkDB()
module.exports = db;
