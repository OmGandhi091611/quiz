import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  // errorMessage! : string;
  // anotherMessage! : string;
  // thirdMessage! : string;
  emailErrorMessage!: string;
  passwordErrorMessage!: string;
  orgTitle: any;
  constructor(private auth: AuthService, private route : ActivatedRoute, private router : Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
    })
  }
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
  logout() {
    this.router.navigate(['login'], {queryParams : {orgTitle : this.orgTitle}});
  }
  dashboard() {
    const userRole = localStorage.getItem('userRole');
    if(userRole === 'admin') {
      this.router.navigate(['register/admin-dashboard'], {queryParams : {orgTitle : this.orgTitle}});
    }
  }
}
