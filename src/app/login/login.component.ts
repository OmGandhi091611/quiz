import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide = true;
  username : string = '';
  password : string = '';
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  login() {
    if(this.username == '') {
      alert('Please enter the email-ID');
      return;
    }
    if(this.password == '') {
      alert('Please enter the Password');
      return;
    }
    this.auth.login(this.username , this.password);
    this.username = '';
    this.password = '';
  }
  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}
