const boardService = require('../services/board.service')
const taskService = require('../services/task.service')

function homePage(req,res){
    //res.send(JSON.stringify({"don":"don"}))
    res.render('index.html')
}

function task(req,res){
    //res.send(JSON.stringify({"don":"don"}))
    res.render('index.html')
}

function task2(req,res){
    //res.send(JSON.stringify({"don":"don"}))
    res.render('index.html')
}

function searchTaskByName(req,res){
    const name = req.query.name;
    console.log(`searchTaskByName : ${name}`)
            //select peron by name
    taskService.selectByName(name).then((taskList)=> {
        console.log(`return list : ${taskList}`)
        res.setHeader('Content-Type', 'application/json');
        var json = JSON.stringify(taskList);
        res.end(json);
    })
}


const getBoardAndTask = (req,res) => {

  boardService.selectAllBoard().then(
      (lstBoard)=>{
          taskService.selectAllTask().then(
              (lstTask)=>{
                    const responseObj = {
                            lstBoard : lstBoard,
                            lstTask  : lstTask
                        }

                    res.send(JSON.stringify(responseObj));
              })

      })

   

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
        console.log(lstBoard)
        res.send(JSON.stringify(lstBoard));
    })
}


const createBoard = (req, res) => {
    const name = req.body.name;
    const id = req.body.id;

    boardService.selectMaxOrderNo().then((maxOrderNo)=> {
        if(!maxOrderNo)
            maxOrderNo = 0;
        
        boardService.insertBoard(id,name,maxOrderNo+1).then((board)=>{
                    if(!board)
                        res.end(null);
                    else
                    {
                        console.log('board OrderNo : ' + board.orderNo)
                        res.end(JSON.stringify(board));
                    }
                        
        })


    })

   
    
}

const updateBoardPosition = (req, res) => {
    const lstBoard = req.body.lstBoardId;
    lstBoard.forEach((item, index)=>{
        console.log(item + "--" + index)
        boardService.updateOrderBoard(item,index+1);
    });

    res.end(JSON.stringify('done'))
}

const updateBoard = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

     boardService.updateBoard(id,name).then((board)=>{
        if(!board)
            res.end(null);
        else
            res.end(JSON.stringify(board));
    })
}

const createTask = (req, res) => {
    const boardId = req.body.boardId;
    const taskId = req.body.taskId;
    const taskNm = req.body.taskNm;
    const taskStt = req.body.taskStt;
    const taskNote = req.body.taskNote;
    taskService.insertTask(boardId,taskId,taskNm,taskStt,taskNote).then((task)=>{
        if(!task)
            res.end(null);
        else
            res.end(JSON.stringify(task));
    })
    
}

// const deleteBoardById = (req, res) => {
//     const id = req.params.id; 

//      angularAPIServoce.deletePerson(id)
//         .then((abc)=>{
//             res.end(JSON.stringify(null));
//         })
// }

module.exports = {
  homePage,
  getlstBoard,
  getlstTask,createBoard,updateBoard,
  createTask,getBoardAndTask,searchTaskByName,updateBoardPosition
}