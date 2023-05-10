import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';

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
  orgTitle! : string;
  userRole: any;
  errorMessage!: string;
  constructor(private auth: AuthService, private route : ActivatedRoute, private fireauth : AngularFireAuth, private firestore : AngularFirestore, private router : Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
    });
  }
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        const uid = res.user?.uid;
        const userRef = this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid);
        userRef.get().subscribe(async (userDoc) => {
          const role = userDoc.data()?.['role'];
          const orgTitle = userDoc.data()?.['organisation'];
          if(orgTitle) {
            if (role === 'student' || role === 'teacher') {
            this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: this.orgTitle } });
            localStorage.setItem('userRole', role);
          }
          else if(role === 'admin') {
            this.router.navigate(['register'], { queryParams: { orgTitle: this.orgTitle } });
            localStorage.setItem('userRole', role);
          }
          else {
            this.errorMessage = '* User not found.';
            const emailField = document.getElementById('email-field') as HTMLInputElement;
            emailField.focus();
          }
            }
            else {
              this.errorMessage = '* User not found.';
              const emailField = document.getElementById('email-field') as HTMLInputElement;
              emailField.focus();
            }
            this.email = '';
            this.password = '';
        });
      }, (error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          this.errorMessage = '* User not found.';
          const emailField = document.getElementById('email-field') as HTMLInputElement;
          emailField.focus();
        } else {
          return;
        }
        this.router.navigate(['login'], {queryParams : {orgTitle : this.orgTitle}});
            });
        }
  googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.fireauth.signInWithPopup(provider).then(res => {
      const user = res.user;
      if (user?.photoURL !== "null") {
        user?.updateProfile({
          photoURL : "null",
        }).then(() =>{
          this.router.navigate(['./login/username'], {queryParams : {orgTitle : this.orgTitle}});
        });
        return;
      }
      else {
        const uid = res.user?.uid;
        const userRef = this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid);
        userRef.get().subscribe(async (userDoc) => {
          const role = userDoc.data()?.['role'];
          const orgTitle = userDoc.data()?.['organisation'];
          if(orgTitle) {
            if (role === 'student' || role === 'teacher') {
            this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: this.orgTitle } });
            localStorage.setItem('userRole', role);
            }
            else if(role === 'admin') {
              this.router.navigate(['login/admin-dashboard'], { queryParams: { orgTitle: this.orgTitle } });
              localStorage.setItem('userRole', role);
            }
            else {
              this.errorMessage = '* User not found.';
              const emailField = document.getElementById('email-field') as HTMLInputElement;
              emailField.focus();
            }
          }
            else {
              this.errorMessage = '* User not found.';
              const emailField = document.getElementById('email-field') as HTMLInputElement;
              emailField.focus();
            }
        });
      }
    });
  };
  logout() {
    this.auth.logout();
  }
}
