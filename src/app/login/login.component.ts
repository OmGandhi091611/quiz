import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    })
  }
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      const uid = res.user?.uid;
      const userRef = this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid);
      userRef.get().subscribe((userDoc) => {
        const role = userDoc.data()?.['role'];
        const org = userDoc.data()?.['organisation'];
        localStorage.setItem('userRole', role);
        if (role === 'admin' && org === this.orgTitle) {
          this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: this.orgTitle } });
        }
        else if (role === 'teacher' && org === this.orgTitle) {
          this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: this.orgTitle } });
        }
        else if (role === 'student' && org === this.orgTitle) {
          this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: this.orgTitle } });
        }
        else {
          this.errorMessage = "* User not found";
        }
        this.email = '';
        this.password = '';
        const emailField = document.getElementById('email-field') as HTMLInputElement;
        emailField.focus();
      });
    }, (err) => {
      alert(err.message);
      this.router.navigate(['login']);
    });
  }
  signInWithGoogle() {
    this.auth.googleSignIn();
  }
  logout() {
    this.auth.logout();
  }
}
