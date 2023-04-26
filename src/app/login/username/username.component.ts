import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit{
  constructor(private fireauth : AngularFireAuth, private router : Router) {}
  username! : string;
  errorMessage! : string;
  anotherMessage! : string;
  thirdMessage! : string;
  ngOnInit(): void {}
  updateDisplayName() {
    // const usernameRegex = /^[a-z0-9]+$/;
    // if (!usernameRegex.test(this.username)) {
    //   this.errorMessage = "* Username should be in lower case.";
    //   this.anotherMessage = "* There should be no white spaces.";
    //   this.thirdMessage = "* Only alphanumeric characters allowed."
    //   return;
    // }
    const userPromise = this.fireauth.currentUser;
    userPromise.then((user) => {
      user?.updateProfile({
        displayName : this.username,
      }).then(() => {
        this.router.navigate(['organisation']);
        // console.log(user);
      }).catch((error: any) => {
        console.log(error);
      });
    });
  };
};
