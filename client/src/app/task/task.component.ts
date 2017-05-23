import { Component, OnInit, AfterViewInit } from '@angular/core';

import { taskVO } from '../VO/taskVO';
import { boardVO } from '../VO/boardVO';

export const lstBoardVO: boardVO[] = [
  {id: 1, boardId: 'BAD_1', boardNm:'Board 1'},
  {id: 2, boardId: 'BAD_2', boardNm:'Board 2'},
  {id: 3, boardId: 'BAD_3', boardNm:'Board 3'}
];

export const lstTaskVO: taskVO[] = [
  {id: 1, boardId: 'BAD_1', taskId:'TSK_1', taskNm:'Task 1',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_1', taskId:'TSK_2', taskNm:'Task 2',taskSts: 'Complete'},
  {id: 1, boardId: 'BAD_1', taskId:'TSK_3', taskNm:'Task 3',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_1', taskId:'TSK_4', taskNm:'Task 4',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_2', taskId:'TSK_5', taskNm:'Task 5',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_2', taskId:'TSK_6', taskNm:'Task 6',taskSts: 'In Process'}
];

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit , AfterViewInit{

  lstBoard = lstBoardVO
  lstTask = lstTaskVO
  constructor() {}



  ngOnInit() {
  }

  ngAfterViewInit() {
          $("#todo, #inprogress, #inprogress1, #completed").sortable({
                connectWith: ".connectList",
                update: function( event, ui ) {

                    var todo = $( "#todo" ).sortable( "toArray" );
                    var inprogress = $( "#inprogress" ).sortable( "toArray" );
                    var completed = $( "#completed" ).sortable( "toArray" );
                    //console.log("ToDo: " + window.JSON.stringify(todo) + " --- " + "In Progress: " + window.JSON.stringify(inprogress) + " --- " + "Completed: " + window.JSON.stringify(completed));
                }
            }).disableSelection();

            autosize($(".editable-textarea"));
  }

  textArea_keydown(event:any){
    // If the user has pressed enter
    event.target.blur();
    event.preventDefault()
  }

  addNewBoard_enter(event:any) {
    let newBoard = new boardVO();
    newBoard.id = 12;
    newBoard.boardId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
    newBoard.boardNm = event.target.value
    this.lstBoard.push(newBoard);
    event.target.value = '';
    event.target.blur();
  }

   addNewBoard_click() {
    let newBoard = new boardVO();
    newBoard.id = 12;
    newBoard.boardId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
    newBoard.boardNm = $('#txtBoardNm').val()
    this.lstBoard.push(newBoard)
    $('#txtBoardNm').val('')
    $('#txtBoardNm').blur()
  }

  txtBoardNm

  addNewTask_enter(event:any,boardId:string){
    let newTask = new taskVO();
    newTask.id = 12;
    newTask.boardId = boardId;
    newTask.taskNm = event.target.value
    newTask.taskId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
    newTask.taskSts = 'In Process'
    this.lstTask.push(newTask);
    event.target.value = '';
    event.target.blur();
  }

    addNewTask_click(boardId:string){
    let newTask = new taskVO();
    newTask.id = 12;
    newTask.boardId = boardId;
    newTask.taskNm = $('#'+boardId).val()
    newTask.taskId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
    newTask.taskSts = 'In Process'
    this.lstTask.push(newTask);
    $('#'+boardId).val('')
    $('#'+boardId).blur();
  }

  
  

}
