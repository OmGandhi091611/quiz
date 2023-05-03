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
  // viewScores!: boolean;
  userRole: any;
  score: any;
  role: any;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')
    this.route.queryParams.subscribe(params => {
      this.questionNo = parseInt(params['questionNo']);
      this.quizId = params['quizName'];
      this.orgTitle = params['orgTitle'];
    });

    this.fireauth.authState.subscribe(user => {
      const userRole = localStorage.getItem('userRole');
      if (user && userRole === 'student') {
        const uid = user.uid;
        const displayName = user.displayName;
        this.firestore.collection(`Organisations/${this.orgTitle}/users`).doc(uid).valueChanges(['name', 'role'])
          .subscribe((userData: any) => {
            this.name = userData.name;
            this.role = userData.role;
          });
        this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid).collection('scores').doc(displayName!).valueChanges()
          .subscribe((scoresData: any) => {
            // console.log(scoresData);
            if (Array.isArray(scoresData)) {
              this.quizScores = [];
              scoresData.forEach((scoreData: any) => {
                const quizId = Object.keys(scoreData)[0];
                const score = scoreData[quizId].score;
                this.quizScores.push({ name: quizId, score: score });
              });
            }
          });
      }
      else if (user && userRole === 'teacher') {
        this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes/${this.quizId}/scores`)
        .valueChanges().subscribe((scores: any[]) => {
          this.scores = scores;
        });
      };
    });
  }
  constructor(private router: Router, private route: ActivatedRoute, private firestore : AngularFirestore, private fireauth : AngularFireAuth) {}
  goBack() {
    this.router.navigate(['organisation/quizzes/dashboard'], {queryParams: { quizName: this.quizId, orgTitle : this.orgTitle, questionNo : this.questionNo + 1}});
  }
}
