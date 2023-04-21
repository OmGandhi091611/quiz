import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username : string = '';
  constructor(private fireauth: AngularFireAuth, private router: Router, private afauth: AngularFireAuth) { }
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email , password).then( res => {
        this.router.navigate(['/dashboard']);
    }, err => {
        alert(err.message);
        this.router.navigate(['']);
    })
  }
  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email , password).then( res => {
      this.router.navigate(['/dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }
  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }, err => {
      alert(err.message);
    })
  }
  // forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['login/verify-email']);
    }, err => {
      alert(err.message);
    })
  }
  // send email for verification
  sendEmailForVerification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['login/verify-email']);
    }, (err : any) => {
      alert(err.message)
    })
  }
  // Sign In with Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['./dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    })
  }
  getUserId(): string {
    let userId = '';
    this.afauth.authState.subscribe(user => {
      if(user) {
        userId = user.uid;
      }
    });
    return userId;
  }
}
