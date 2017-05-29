import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';

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

  lstBoard:boardVO[]
  lstTask:taskVO[]
  constructor(
    private taskService: TaskService
  ){}

  getBoardAndTask(){
    this.taskService.getBoardAndTask()
            .then((lstReturn) => {
              this.lstBoard = lstReturn['lstBoard']
              this.lstTask = lstReturn['lstTask']
            })
  }


  ngOnInit() {
    this.getBoardAndTask()
  }

  updateBoardOrder(listBoardId:string[]){
    this.taskService.updateBoardPosition(listBoardId);
  }

  ngAfterViewInit() {
    let that = this;
          Sortable.create($('#drapableDiv')[0],
                  { draggable: '.drapableTopic',
                    handle: '.boardTitle',
                    dataIdAttr : 'id',
                    group: 'board',
                   onSort : function (evt){    
                                  var currentSortable = evt.to[Object.keys(evt.to)[0]];
                                  var order = currentSortable.toArray();
                                  that.updateBoardOrder(order);
                                }
                  });

            autosize($(".editable-textarea"));

            setTimeout(function(){ 
                 $('.sortable-list').each(function() {
                    Sortable.create(this,
                      { group: 'task', 
                        draggable: '.warning-element',
                        handle: '.warning-element', 
                        dataIdAttr: 'id',
                        onSort : function (evt){    
                                  var currentSortable = evt.to[Object.keys(evt.to)[0]];
                                  var order = currentSortable.toArray();
                                  console.log(order);
                                }
                          });
                  })

             }, 3000);

  }

  initSortable(){
    Sortable.create($('#drapableDiv')[0],
                  { draggable: '.drapableTopic',
                    handle: '.boardTitle',
                    dataIdAttr : 'id',
                    group: 'board',
                   onSort : function (evt){    
                                  var currentSortable = evt.to[Object.keys(evt.to)[0]];
                                  var order = currentSortable.toArray();
                                  this.updateBoardOrder(order);
                                }
                  });

    setTimeout(function(){ 
                 $('.sortable-list').each(function() {
                    Sortable.create(this,
                      { group: 'task', 
                        draggable: '.handler-itemlv',
                        handle: '.handler-itemlv', 
                        dataIdAttr: 'id',
                        onSort : function (evt){    
                                  var currentSortable = evt.to[Object.keys(evt.to)[0]];
                                  var order = currentSortable.toArray();
                                  console.log(order);
                                }
                          });
                  })

             }, 2000);
  }

  

  textArea_keydown(event:any){
    // If the user has pressed enter
    event.target.blur();
    event.preventDefault()
  }

  addNewBoard_enter(event:any) {
    if(!event.target.value)
      return;
    let newBoard = new boardVO();
    newBoard.id = 12;
    newBoard.boardId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
    newBoard.boardNm = event.target.value
   
    event.target.value = '';
    event.target.blur();

    this.taskService.createBoard(newBoard.boardId,newBoard.boardNm).then((boardNew) => { this.lstBoard.push(newBoard);});
    this.initSortable();
  }

   addNewBoard_click() {
     if(!$('#txtBoardNm').val())
      return;
    let newBoard = new boardVO();
    newBoard.id = 12;
    newBoard.boardId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
    newBoard.boardNm = $('#txtBoardNm').val()
    this.lstBoard.push(newBoard)
    $('#txtBoardNm').val('')
    $('#txtBoardNm').blur()
    this.taskService.createBoard(newBoard.boardId,newBoard.boardNm).then((boardNew) => { this.lstBoard.push(newBoard);});
    this.initSortable();
  }

  addNewTask_enter(event:any,boardId:string){
    if(event.target.value)
    {
      let newTask = new taskVO();
      newTask.id = 12;
      newTask.boardId = boardId;
      newTask.taskNm = event.target.value
      newTask.taskId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
      newTask.taskStt = 'In Process'
      
      event.target.value = '';
      event.target.blur();

      this.taskService.createTask(newTask.boardId,newTask.taskId,newTask.taskNm,newTask.taskStt,"demo note")
      .then((taskNew) => {this.lstTask.push(taskNew);this.initSortable();});
    }

    

  }

  addNewTask_click(boardId:string){
    if($('#'+boardId).val())
    {
      let newTask = new taskVO();
      newTask.id = 12;
      newTask.boardId = boardId;
      newTask.taskNm = $('#'+boardId).val()
      newTask.taskId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase()
      newTask.taskStt = 'In Process'
      //this.lstTask.push(newTask);
      $('#'+boardId).val('')
      $('#'+boardId).blur();
      this.taskService.createTask(newTask.boardId,newTask.taskId,newTask.taskNm,newTask.taskStt,"demo note")
      .then((taskNew) => {this.lstTask.push(taskNew);this.initSortable();});
    }



  }


}
