import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  user = {username: '', password: '',email:''};
  errMess: string;
  spinner:boolean = true;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.errMess=null;
    this.spinner=false;
    this.authService.signUp(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }

}
