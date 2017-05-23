const Sequelize = require('sequelize')
const path = require('path')

const db_sequelize = new Sequelize('mysql://root:Teo54321@localhost:3306/db_node_task');

//CLEARDB_DATABASE_URL=mysql://bc49495ded2948:d61c3548@us-cdbr-iron-east-03.cleardb.net/heroku_635a910a6589203?reconnect=true
//DEV_DATABASE_URL=mysql://root:Teo54321@localhost:3306/db_node

const board = db_sequelize.import(path.join(__dirname,'board.js'))
const task = db_sequelize.import(path.join(__dirname,'task.js'))

const db = {}
db.board = board
db.task = task
db.db_sequelize = db_sequelize

module.exports = db