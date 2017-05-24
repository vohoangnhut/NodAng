// const express = require('express')
// const router = express.Router()
const defualtController = require('../controller/defaultController')
module.exports = (app ) => {
        
        app.get('/' ,defualtController.homePage);

        // app.get('/board' ,defualtController.getlstBoard);

        // app.get('/task' ,defualtController.getlstTask);

        app.get('/boardandtask', defualtController.getBoardAndTask)

        app.post('/board', defualtController.createBoard)
        app.post('/task', defualtController.createTask)

          app.put('/board', defualtController.updateBoard)
        
        //app.get('*',defualtController.homePage)

}

// // function isLoggedIn(req, res, next){
// // 	if(req.isAuthenticated())
// // 	        return next();
	
// //         req.flash('error_msg','You are not logged in');
// //         res.redirect('/login');
// // }

function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}