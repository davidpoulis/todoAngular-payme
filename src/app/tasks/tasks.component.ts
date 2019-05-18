import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service'
import {AuthService} from '../services/auth.service'
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks:any[] = undefined;
  username: string = undefined;
  subscription: Subscription;
  errMess:string = undefined;
  constructor(private auth:AuthService, private taskService:TaskService,
    public dialog: MatDialog) {
   
   }

  ngOnInit() {
    this.subscription = this.auth.getUsername()
    .subscribe(name => { console.log(name); this.username = name; });
    if (this.auth.isLoggedIn()) {
      
      this.taskService.getTasks().subscribe((tasks)=>{
        console.log(tasks)
        this.tasks=tasks
      },err=>console.log(err))
    }
  }
  openAddTask(){
    const addRef = this.dialog.open(AddTaskComponent, {width: '570px', height: '250px'});

    addRef.afterClosed()
      .subscribe(result => {
       this.taskService.postTask(result)
      .subscribe(res => {
        if (res) {
         this.tasks=res;
        
        } else {
          console.log(res);
        }
      },
      error => {
        console.log("err",error);
        this.errMess = error;
      });
      });

  }
  delete(id){
    this.taskService.deleteTask(id).subscribe((tasks)=>{
      this.tasks=tasks;
    },err=>console.log(err))
  }

}
