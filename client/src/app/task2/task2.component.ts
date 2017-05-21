import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit {
  isEdit = false;
  name = 'nhut vo'
  constructor() { }

  ngOnInit() {
  }

  bindingName(newValue):void{
    this.name = newValue;
    console.log(newValue)
  }

}
