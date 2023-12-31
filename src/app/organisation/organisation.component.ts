import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit{
  items!: Observable<any[]>;
  selectedOrg: any;
  userRole: any;
  constructor(private auth : AuthService, private router : Router, private firestore : AngularFirestore) {};
  ngOnInit(): void {
   this.items = this.firestore.collection('Organisations').valueChanges();
   this.userRole = localStorage.getItem('userRole');
  };
  logout() {
    this.auth.logout();
  }
  selectedOrganisation(org: any) {
    this.router.navigate(['login'], {queryParams : {orgTitle : org.title}});
  }
  addorganisation() {
    this.router.navigate(['organisation/createorg']);
  }
}
