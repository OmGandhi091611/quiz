import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username : string = '';
  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore : AngularFirestore) { }
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email , password).then( res => {
      this.router.navigate(['organisation']);
    }, err => {
        alert(err.message);
        this.router.navigate(['']);
    })
  }

  // register method
  register(email : string, password : string, displayName : string) {
    this.fireauth.createUserWithEmailAndPassword(email , password).then( async res => {
      const uid = res.user?.uid;
      const userRef = this.firestore.collection('users').doc(uid);
      await this.updateProfile(displayName);
      this.router.navigate(['organisation']);
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
  googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.fireauth.signInWithPopup(provider).then(res => {
      const user = res.user;
      const uid = user?.uid;
      if (user?.photoURL !== "null") {
        user?.updateProfile({
          photoURL : "null",
        }).then(() =>{
          this.router.navigate(['./login/username']);
        });
        console.log(user);
        return;
      } else {
        localStorage.setItem('token', JSON.stringify(uid));
        this.router.navigate(['organisation']);
        console.log(user);
      }
    });
  };
  async updateProfile(displayName: string) {
    const user = await this.fireauth.currentUser;
    await user?.updateProfile({ displayName });
  }
}
