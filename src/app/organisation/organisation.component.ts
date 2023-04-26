import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit{
  items!: Observable<any[]>;
  selectedOrg: any;
  constructor(private auth : AuthService, private router : Router, private firestore : AngularFirestore) {};
  ngOnInit(): void {
   this.items = this.firestore.collection('Organisations').valueChanges();
  };
  logout() {
    this.auth.logout();
  }
  selectedOrganisation(org: any) {
    // console.log(org.title);
    this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: org.title } });
  }
  addorganisation() {
    this.router.navigate(['organisation/createorg']);
  }
}
