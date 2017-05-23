import { Component, OnInit, AfterViewInit } from '@angular/core';

import { taskVO } from '../VO/taskVO';
import { boardVO } from '../VO/boardVO';

import { TaskService } from '../service/task.service'

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [ TaskService ]
})
export class TaskComponent implements OnInit , AfterViewInit{

  // lstBoard = lstBoardVO
  // lstTask = lstTaskVO
  lstBoard:boardVO[]
  lstTask:taskVO[]
  constructor(
    private taskService: TaskService
  ){}

  //Call API 
  getLstBoard(){
    this.taskService.getLstBoard()
            .then(lstReturn => this.lstBoard = lstReturn)
  }

   getLstTask(){
    this.taskService.getLstTask()
            .then(lstReturn => this.lstTask = lstReturn)
  }


  ngOnInit() {
    this.getLstBoard()
    this.getLstTask()
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
