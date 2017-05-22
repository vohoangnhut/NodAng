import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit , AfterViewInit{

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

            // var ta = document.getElementsByName('textarea');
            //   ta.addEventListener('focus', function(){
            //     autosize(ta);
            //   });

              $(".editable-textarea").each(function () {
                autosize(this);
            });

            //autosize($('#txtAreaTitleBoard'));
  }

}
