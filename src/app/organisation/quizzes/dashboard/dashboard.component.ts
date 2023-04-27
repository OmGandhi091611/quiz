import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  showError = false;
  formSubmitted: boolean[] = [];
  orgTitle: any;
  quizId: any;
  constructor(private afauth : AngularFireAuth, private firestore : AngularFirestore, private router : Router, private route : ActivatedRoute) {
    this.selectedAnswers = Array(this.mcqDocuments.length).fill(null);
  };
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quizId = params['quizName'];
      this.orgTitle = params['orgTitle']
      this.questionNo = parseInt(params['questionNo'], 10) - 1 || 0;
      if (this.quizId) {
        this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes/${this.quizId}/questions`)
        .valueChanges().subscribe((questions: any[]) => {
          this.mcqDocuments = questions;
          this.currentDocument = this.mcqDocuments[this.questionNo];
          this.formSubmitted = Array(this.mcqDocuments.length).fill(false);
        });
      }
    });
  };
  nextQuestion() {
    if (!this.selectedAnswers[this.questionNo]) {
      this.formSubmitted[this.questionNo] = true;
      this.showError = true;
      return;
    }
    if (this.questionNo < this.mcqDocuments.length - 1) {
      this.questionNo++;
      this.currentDocument = this.mcqDocuments[this.questionNo];
      this.updateUrl();
      this.showError = false;
    } else {
      this.submitAnswers();
    }
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
    this.router.navigate(['organisation/quizzes/dashboard/add-questions'], {queryParams : {orgTitle : this.orgTitle, quizName : this.quizId}});
  }
  onAnswerSelected(questionNo: number, answer: string) {
    this.selectedAnswers[questionNo] = answer;
  }
  submitAnswers() {
    let score = 0;
    let unansweredQuestions = [];
    for (let i = 0; i < this.selectedAnswers.length; i++) {
      if (this.selectedAnswers[i] === null) {
        unansweredQuestions.push(i);
      } else if (this.mcqDocuments[i].correctAnswer === this.selectedAnswers[i]) {
        score++;
      }
    }
    const totalQuestions = this.mcqDocuments.length;
    if (!this.selectedAnswers[this.questionNo]) {
      this.formSubmitted[this.questionNo] = true;
      this.showError = true;
      return;
    }
    else {
      this.afauth.onAuthStateChanged((user) => {
        if (user) {
          const displayName = user?.displayName;
          this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes/${this.quizId}/scores`).doc(displayName!).set({
            score: score,
            username: displayName,
            totalQuestions: totalQuestions,
            email: user.email,
            subject : this.quizId,
          })
        }
      });
      this.router.navigate(['organisation/quizzes/dashboard/submit-answers'], {
        queryParams: {
          questionNo: this.questionNo,
          orgTitle: this.orgTitle,
          quizName: this.quizId
        }
      });
    }
  };
}
