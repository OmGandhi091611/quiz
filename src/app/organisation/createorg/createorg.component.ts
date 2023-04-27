import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createorg',
  templateUrl: './createorg.component.html',
  styleUrls: ['./createorg.component.scss']
})
export class CreateorgComponent implements OnInit{
  organisation! : string;
  constructor(private firestore : AngularFirestore, private router : Router) {};
  ngOnInit(): void {};
  addorg() {
    const orgRef = this.firestore.collection('Organisations').doc(this.organisation);
    orgRef.set({ title: this.organisation });
    this.router.navigate(['organisation/quizzes/createquiz'], {queryParams : {orgTitle : this.organisation}});
  }
}
