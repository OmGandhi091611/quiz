import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  numStudents!: number;
  numTeachers!: number;
  orgTitle: any;
  loading = true;
  constructor (private firestore : AngularFirestore, private route : ActivatedRoute, private router : Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
    })
    this.firestore.collection(`Organisations/${this.orgTitle}/users`, ref => ref.where('role', '==', 'student'))
    .valueChanges().subscribe((students) => {
      this.numStudents = students.length;
    });
  this.firestore.collection(`Organisations/${this.orgTitle}/users`, ref => ref.where('role', '==', 'teacher'))
    .valueChanges().subscribe((teachers) => {
      this.numTeachers = teachers.length;
      this.loading = false;
    });
  };
  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['register'], {queryParams : {orgTitle : this.orgTitle}});
  }
}
