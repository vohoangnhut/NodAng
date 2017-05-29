
/**
 * db is var db = new Sequelize(process.env.DATABASE_URL);
 * DataTypes is const Sequelize = require('sequelize')
 */
module.exports = (db,DataTypes) => {

    let attribute = {
            boardId:{
                type: DataTypes.TEXT
            },
            taskId: { //Id
                type: DataTypes.TEXT
            },
            taskNm: { //Name
                type: DataTypes.TEXT
            },
            taskStt: { //Status
                type: DataTypes.TEXT
            },
            taskNote: { //Note
                type: DataTypes.TEXT
            },
            orderNo: {
                type: DataTypes.INTEGER
            }
    }

    const options = {
        freezeTableName: true,
    }


    return db.define('TASK',attribute,options);
}