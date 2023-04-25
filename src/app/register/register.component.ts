import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;
  username : string = '';
  password : string = '';
  displayName : string = '';
  errorMessage! : string;
  anotherMessage! : string;
  thirdMessage! : string;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  register() {
    const usernameRegex = /^[a-z0-9]+$/;
    if (!usernameRegex.test(this.displayName)) {
      this.errorMessage = "* Username should be in lower case.";
      this.anotherMessage = "* There should be no white spaces.";
      this.thirdMessage = "* Only alphanumeric characters allowed."
      return;
    }
    if(this.username == '') {
      alert('Please enter the email-ID');
      return;
    }
    if(this.password == '') {
      alert('Please enter a valid password');
      return;
    }
    this.auth.register(this.username , this.password, this.displayName);
    this.username = '';
    this.password = '';
    this.displayName = '';
  }
}
