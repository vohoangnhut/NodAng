const boardService = require('../services/board.service')
const taskService = require('../services/task.service')

function homePage(req,res){
    res.render('index.html')
}

const getlstBoard = (req,res) => {
  boardService.selectAllBoard()
    .then((lstBoard)=> {
        res.send(JSON.stringify(lstBoard));
    })
}

const getlstTask = (req,res) => {
  taskService.selectAllTask()
    .then((lstBoard)=> {
        res.send(JSON.stringify(lstBoard));
    })
}

module.exports = {
  homePage
}