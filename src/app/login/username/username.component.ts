import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit{
  orgTitle: any;
  constructor(private fireauth : AngularFireAuth, private router : Router, private route : ActivatedRoute, private firestore : AngularFirestore) {}
  username! : string;
  // errorMessage! : string;
  // anotherMessage! : string;
  // thirdMessage! : string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
    })
  }
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
      const uid = user?.uid;
      const emailDomain = user?.email?.split('@')[1];
      const domain = this.orgTitle;
      const lowercaseDomain = domain.toLowerCase().replace(/\s/g, '');
      let role = '';
      if(emailDomain === `${lowercaseDomain}.com`) {
        role = 'admin';
      }
      else if(emailDomain === `${lowercaseDomain}.org`) {
        role = 'teacher';
      }
      else if(emailDomain === `${lowercaseDomain}.ac.in`) {
        role = 'student';
      }
      else{
        role = 'student';
      }
      user?.updateProfile({
        displayName : this.username,
      }).then(() => {
        this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid).set({
          email: user?.email,
          name: user?.displayName,
          role: role,
          organisation : this.orgTitle,
        });
        localStorage.setItem('userRole', role);
        this.router.navigate(['organisation/quizzes'], {queryParams : {orgTitle : this.orgTitle}});
        // console.log(user);
      }).catch((error: any) => {
        console.log(error);
      });
    });
  };
};
