
/**
 * db is var db = new Sequelize(process.env.DATABASE_URL);
 * DataTypes is const Sequelize = require('sequelize')
 */
module.exports = (db,DataTypes) => {

    let attribute = {
            boardId : {
                type: DataTypes.TEXT
            },
            boardNm: {
                type: DataTypes.TEXT
            }
    }

    const options = {
        freezeTableName: true,
    }


    return db.define('BOARD',attribute,options);
}