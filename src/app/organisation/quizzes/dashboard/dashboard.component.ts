import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  mcqDocuments: any[] = [];
  selectedAnswers: string[] = [];
  questionNo : number = 0;
  currentDocument: any;
  question: any;
  correctAnswer: any;
  showError = false;
  formSubmitted: boolean[] = [];
  orgTitle: any;
  quizId: any;
  constructor(private afauth : AngularFireAuth, private firestore : AngularFirestore, private auth : AuthService, private router : Router, private route : ActivatedRoute) {};
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.questionNo = parseInt(params['questionNo'], 10) - 1 || 0;
      this.quizId = params['quizId'];
      this.orgTitle = params['orgTitle']
      if (this.quizId) {
        this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes/${this.quizId}/questions`)
        .valueChanges().subscribe((questions: any[]) => {
          this.mcqDocuments = questions;
          this.currentDocument = this.mcqDocuments[this.questionNo];
          this.selectedAnswers = Array(this.mcqDocuments.length).fill(null);
          this.formSubmitted = Array(this.mcqDocuments.length).fill(false);
        });
      }
    });
  };
  nextQuestion() {
    if (this.selectedAnswers[this.questionNo] === null) {
      this.showError = true;
      return;
    }
    this.formSubmitted[this.questionNo] = true;
    if (this.questionNo < this.mcqDocuments.length - 1) {
      this.questionNo++;
      this.currentDocument = this.mcqDocuments[this.questionNo];
      this.updateUrl();
      this.showError = false;
    }
    // console.log(`Moving to question ${this.questionNo + 1}`);
  }
  previousQuestion() {
    if(this.questionNo > 0) {
      this.questionNo--;
      this.currentDocument = this.mcqDocuments[this.questionNo];
      this.updateUrl();
    }
  }
  updateUrl() {
    const questionNo = this.questionNo + 1
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { questionNo },
      queryParamsHandling: 'merge'
    });
  }
  logout() {
    this.router.navigate(['organisation/quizzes'], { queryParams: { orgTitle: this.orgTitle } })
  }
  isFirst() {
    return this.questionNo === 0;
  }

  isLast() {
    return this.questionNo === this.mcqDocuments.length - 1;
  }
  onAddQuestions() {
    this.router.navigate(['organisation/quizzes/dashboard/add-questions'], {queryParams : {orgTitle : this.orgTitle, quizId : this.quizId}});
  }
  submitAnswers() {
    let score = 0;
    let unansweredQuestions = [];
    for(let i = 0; i < this.selectedAnswers.length; i++) {
      if(this.selectedAnswers[i] === null) {
        unansweredQuestions.push(i);
      } else if(this.mcqDocuments[i].correctAnswer === this.selectedAnswers[i]) {
        score++;
      }
    }
    const totalQuestions = this.mcqDocuments.length;
    if(unansweredQuestions.length > 0) {
      this.questionNo = unansweredQuestions[0];
      this.currentDocument = this.mcqDocuments[this.questionNo];
      this.router.navigate(['dashboard'], { queryParams: { questionNo: this.questionNo + 1 }});
    } else {
      this.afauth.onAuthStateChanged((user) => {
        if(user) {
          const displayName = user?.displayName;
          this.firestore.collection('scores').doc(displayName!).set({
            score : score,
            username : displayName,
            totalQuestions: totalQuestions,
            email : user.email,
          })
        }
      });
      this.router.navigate(['organisation/quizzes/dashboard/submit-answers'], { queryParams: { score: score, totalQuestions: totalQuestions, questionNo: this.questionNo, orgTitle : this.orgTitle, quizId : this.quizId}});
    }
  }
}
