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
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  register() {
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
