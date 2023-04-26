import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-submit-answers',
  templateUrl: './submit-answers.component.html',
  styleUrls: ['./submit-answers.component.scss']
})
export class SubmitAnswersComponent  implements OnInit{
  questionNo!: number;
  quizId! : string;
  orgTitle! : string;
  totalQuestions!: number;
  scores: any[] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.questionNo = parseInt(params['questionNo']);
      this.quizId = params['quizId']
      this.orgTitle = params['orgTitle'];
    });
    this.firestore.collection('scores', ref => ref.orderBy('score', 'desc')).valueChanges().subscribe((scores) => {
      this.scores = scores;
    })
  }
  constructor(private router: Router, private route: ActivatedRoute, private firestore : AngularFirestore) {
  }
  goBack() {
    this.router.navigate(['organisation/quizzes/dashboard'], {queryParams: { quizId: this.quizId, orgTitle : this.orgTitle}});
  }
}
