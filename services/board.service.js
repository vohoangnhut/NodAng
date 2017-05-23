const board = require('../models').board

const insertBoard = (boardId,boardNm) => {
    return board.create({
        boardId : boardId,
        boardNm : boardNm
    })
}


const deleteBoard = (boardId) => {
    return board.destroy({
                where: {
                    boardId: boardId
                }
            });
}

const updateBoard = (boardId,boardNm) => {
    return User.update({
                    boardNm: boardNm
                }, {
                    where: {boardId: boardId}
                }
    );
}


const selectAllBoard = () => {
    return board.findAll()
}

module.exports = {
    selectAllBoard,
    insertBoard,
    deleteBoard,
    updateBoard
}