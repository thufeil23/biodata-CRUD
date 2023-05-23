const Sequalize = require("sequelize");
const sequelize = new Sequalize(
    'biodata',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const db = {};

db.Sequalize = sequelize;
db.sequelize = sequelize;
db.biodata = require("./biodata.model")(sequelize,Sequalize);

module.exports = db;