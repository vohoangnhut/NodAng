import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from '../task/task.component';
import { Task2Component } from '../task2/task2.component';


const routes: Routes = [
  { path: '', redirectTo: '/task2', pathMatch: 'full' },
  { path: 'task2',  component: Task2Component },
  { path: 'task',     component: TaskComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}