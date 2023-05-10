import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role!: string;
  username : string = '';
  orgTitle! : string;
  errorMessage!: string;
  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore : AngularFirestore, private route : ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
    })
  }

  // register method
  register(email: string, password: string, displayName: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(async res => {
      const uid = res.user?.uid;
      const emailDomain = email.split('@')[1];
      const domain = this.orgTitle;
      const lowercaseDomain = typeof domain === 'string' ? domain.toLowerCase().replace(/\s/g, '') : '';
      if (emailDomain === `${lowercaseDomain}.com`) {
        this.role = 'admin';
      } else if (emailDomain === `${lowercaseDomain}.org`) {
        this.role = 'teacher';
      } else {
        this.role = 'student';
      }
      if (this.orgTitle) {
        await this.updateProfile(displayName);
        const docRef = this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid);
        await docRef.set({
          email: res.user?.email,
          name: res.user?.displayName,
          role: this.role,
          organisation: this.orgTitle,
        });
        localStorage.setItem('userRole', this.role);
        this.router.navigate(['login'], {queryParams : {orgTitle : this.orgTitle}});
      } else {
        console.error('Error: organisation title is undefined');
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  };
  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('userRole');
      this.router.navigate(['']);
    }, err => {
      alert(err.message);
    })
  }
  // forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['login/verify-email'], {queryParams : {orgTitle : this.orgTitle}});
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
  async updateProfile(displayName: string) {
    const user = await this.fireauth.currentUser;
    await user?.updateProfile({ displayName });
  }
}
