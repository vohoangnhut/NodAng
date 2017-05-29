const board = require('../models').board

const insertBoard = (boardId,boardNm, orderNo) => {
    return board.create({
        boardId : boardId,
        boardNm : boardNm,
        orderNo : orderNo
    })
}

const selectMaxOrderNo = () => {
    return board.max('orderNo', {
        where: {
            //language: language
        }
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
    return board.update({
                    boardNm: boardNm
                }, {
                    where: {boardId: boardId}
                }
    );
}

const updateOrderBoard = (boardId,orderNo) => {
    return board.update({
                    orderNo: orderNo
                }, {
                    where: {boardId: boardId}
                }
    );
}


const selectAllBoard = () => {
    return board.findAll({
         order: [
                    ['orderNo', 'ASC']
                ]
    })
}

module.exports = {
    selectAllBoard,
    insertBoard,
    deleteBoard,
    updateBoard,
    selectMaxOrderNo,
    updateOrderBoard
}