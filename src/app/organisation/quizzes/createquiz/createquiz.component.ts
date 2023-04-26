import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.scss']
})
export class CreatequizComponent implements OnInit{
  quiz! : string;
  orgTitle! : string
  constructor(private route : ActivatedRoute, private firestore : AngularFirestore, private router : Router) {};
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
    });
  };
  addquiz() {
    const quizName = this.quiz.trim();
    if (quizName) {
      this.route.queryParams.subscribe(params => {
        const orgTitle = params['orgTitle'];
        const orgRef = this.firestore.collection('Organisations').doc(orgTitle);
        orgRef.collection('Quizzes').doc(quizName).set({
          title: quizName
        }).then(() => {
          this.router.navigate(['organisation/quizzes/dashboard/add-questions'], { queryParams: { orgTitle: orgTitle, quizName: quizName } });
          this.quiz = '';
        }).catch(error => {
          console.error('Error creating quiz: ', error);
        });
      });
    }
  }
  logout() {
    this.router.navigate(['organisation/quizzes'], {queryParams: {orgTitle : this.orgTitle}})
  }
}
