import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide = true;
  email : string = '';
  password : string = '';
  emailErrorMessage! : string;
  passwordErrorMessage! : string;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  login() {
    if(this.email == '') {
      this.emailErrorMessage = "* Please Enter the email ID."
      return;
    }
    if(this.password == '') {
      this.passwordErrorMessage = "* Please Enter the correct password."
      return;
    }
    this.auth.login(this.email , this.password);
    this.email = '';
    this.password = '';
  }
  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
