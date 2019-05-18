import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {TaskService} from '../services/task.service'
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task:any={title: '', subtitle: ''};
  errMess: string;
  constructor(public dialogRef: MatDialogRef<AddTaskComponent>
    ,private taskService:TaskService) { }

  ngOnInit() {
    
  }
  onSubmit() {
    console.log('Task: ', this.task);
    this.dialogRef.close(this.task);
 
  }
}
