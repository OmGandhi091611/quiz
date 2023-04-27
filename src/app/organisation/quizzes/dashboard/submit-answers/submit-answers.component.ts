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
  scores: any[] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.questionNo = parseInt(params['questionNo']);
      this.quizId = params['quizName']
      this.orgTitle = params['orgTitle'];
    });
    this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes/${this.quizId}/scores`, ref => ref.orderBy('score', 'desc')).valueChanges().subscribe((scores) => {
      this.scores = scores;
    })
  }
  constructor(private router: Router, private route: ActivatedRoute, private firestore : AngularFirestore) {
  }
  goBack() {
    this.router.navigate(['organisation/quizzes/dashboard'], {queryParams: { quizName: this.quizId, orgTitle : this.orgTitle, questionNo : this.questionNo + 1}});
  }
}
