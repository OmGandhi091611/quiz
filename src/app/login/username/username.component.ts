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
  ngOnInit(): void {}
  updateDisplayName() {
    const userPromise = this.fireauth.currentUser;
    userPromise.then((user) => {
      user?.updateProfile({
        displayName : this.username
      }).then(() => {
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('token', JSON.stringify(user.uid));
        this.router.navigate(['dashboard']);
        console.log(user);
      }).catch((error: any) => {
        console.log(error);
      });
    });
  };
};
