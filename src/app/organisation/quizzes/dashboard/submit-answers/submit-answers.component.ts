import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  scores: any;
  userScore: any;
  totalQuestions: any;
  name! : string;
  quizScores: { name: string, score: number }[] = [];
  viewScores!: boolean;
  userRole: any;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')
    this.route.queryParams.subscribe(params => {
      this.questionNo = parseInt(params['questionNo']);
      this.quizId = params['quizName'];
      this.orgTitle = params['orgTitle'];
      this.viewScores = params['viewScores'] === 'true';
    });
    this.fireauth.authState.subscribe(user => {
      if (user && this.userRole === 'student') {
        const uid = user.uid;
        this.firestore.collection(`Organisations/${this.orgTitle}/users`).doc(uid).valueChanges(['name'])
          .subscribe((userData: any) => {
            this.name = userData.name;
          });
        this.firestore.collection(`Organisations/${this.orgTitle}/users/${uid}/scores`).valueChanges()
          .subscribe((scoresData: any) => {
            this.quizScores = [];
            for (let i = 0; i < scoresData.length; i++) {
              const quizId = Object.keys(scoresData[i])[0];
              const score = scoresData[i][quizId].score;
              this.quizScores.push({ name: quizId, score: score });
            }
          });
      }
      else if (user && this.userRole === 'teacher') {
        this.firestore.collection(`Organisations/${this.orgTitle}/users/scores`).valueChanges()
          .subscribe((scoresData: any) => {
            console.log(scoresData);
            this.quizScores = [];
            for (let i = 0; i < scoresData.length; i++) {
              const uid = Object.keys(scoresData[i])[0];
              const score = scoresData[i][uid].score;
              this.firestore.collection(`Organisations/${this.orgTitle}/users`).doc(uid).valueChanges(['name'])
                .subscribe((userData: any) => {
                  const name = userData.name;
                  this.quizScores.push({ name: name, score: score });
                });
            }
          });
        }
    });
  }
  constructor(private router: Router, private route: ActivatedRoute, private firestore : AngularFirestore, private fireauth : AngularFireAuth) {}
  goBack() {
    this.router.navigate(['organisation/quizzes/dashboard'], {queryParams: { quizName: this.quizId, orgTitle : this.orgTitle, questionNo : this.questionNo + 1}});
  }
}
