import { Component, OnInit } from '@angular/core';
import {MatDialogRef , MatDialog} from '@angular/material';
import { AuthService } from '../services/auth.service';
import {RegisterComponent} from '../register/register.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: ''};
  errMess: string;
  spinner:boolean = true;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService, private dialog:MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.errMess=null;
    this.spinner=false;
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.spinner=true;
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
  openRegisterForm() {
    const signupRef = this.dialog.open(RegisterComponent, {width: '500px', height: '400px'});

    signupRef.afterClosed()
      .subscribe(result => {
        this.dialogRef.close();

      });
  }
}
