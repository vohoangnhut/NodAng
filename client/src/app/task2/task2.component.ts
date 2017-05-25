import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { TaskService } from '../service/task.service';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { taskVO } from '../VO/taskVO';
@Component({
  selector: 'task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css'],
   providers: [TaskService]
})
export class Task2Component implements OnInit, AfterViewInit {

  private availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala"
    ];

  constructor(
    private taskService: TaskService
  ){}

  lstTaskMatch: Observable<taskVO[]>;
  private searchTerms = new Subject<string>();
 // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  

  ngOnInit() {

    this.lstTaskMatch = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.taskService.searchTaskByName(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<taskVO[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<taskVO[]>([]);
      });

  }
  
 

  ngAfterViewInit(){

     $( "#tags" ).autocomplete({
      source: this.availableTags
    });

    // Applied globally on all textareas with the "autoExpand" class
    $(document).one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    }).on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows - 1;
    });

    
    autosize($('#textDemo'));

  }

  

}
