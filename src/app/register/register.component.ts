import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;
  email : string = '';
  password : string = '';
  username : string = '';
  errorMessage! : string;
  anotherMessage! : string;
  thirdMessage! : string;
  emailErrorMessage!: string;
  passwordErrorMessage!: string;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  register() {
    // const usernameRegex = /^[a-z0-9]+$/;
    // if (!usernameRegex.test(this.username)) {
    //   this.errorMessage = "* Username should be in lower case.";
    //   this.anotherMessage = "* There should be no white spaces.";
    //   this.thirdMessage = "* Only alphanumeric characters allowed."
    //   return;
    // }
    if(this.email == '') {
      this.emailErrorMessage = "* Please Enter the email ID."
      return;
    }
    if(this.password == '') {
      this.passwordErrorMessage = "* Please Enter the correct password."
      return;
    }
    this.auth.register(this.email , this.password, this.username);
    this.email = '';
    this.password = '';
    this.username = '';
  }
}
