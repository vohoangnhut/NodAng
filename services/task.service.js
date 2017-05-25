const task = require('../models').task


const insertTask = (boardId,taskId,taskNm,taskStt,taskNote) => {
    return task.create({
        boardId     : boardId,
        taskId      : taskId,
        taskNm      : taskNm,
        taskStt     : taskStt,
        taskNote    : taskNote
    })
}

const selectByName = (name) => {
    return task.findAll({
        where: {
            taskNm: {$like: '%'+name+'%'}
        }
    })
}

const deleteTask = (taskId) => {
    return task.destroy({
                where: {
                    taskId: taskId
                }
            });
}

const updateTask = (taskId,taskNm) => {
    return task.update({
                    taskNm: taskNm
                }, {
                    where: {taskId: taskId}
                }
    );
}


const selectAllTask = () => {
    return task.findAll()
}

module.exports = {
    selectAllTask,
    insertTask,
    deleteTask,
    updateTask,
    selectByName
}