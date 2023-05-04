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
  userRole: any;
  constructor(private fireauth : AngularFireAuth, private firestore : AngularFirestore, private router : Router, private route : ActivatedRoute) {
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
    this.userRole = localStorage.getItem('userRole')
  };
  nextQuestion() {
    if (!this.selectedAnswers[this.questionNo] && this.userRole === "student") {
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
    const totalQuestions = this.mcqDocuments.length;
    const userRole = localStorage.getItem('userRole');
    for (let i = 0; i < this.selectedAnswers.length; i++) {
      if (this.selectedAnswers[i] === null) {
        unansweredQuestions.push(i);
      } else if (this.mcqDocuments[i].correctAnswer === this.selectedAnswers[i]) {
        score++;
      }
    }
    if(!this.selectedAnswers[this.questionNo]){
      this.formSubmitted[this.questionNo] = true;
      this.showError = true;
      return;
    }
    this.fireauth.onAuthStateChanged((user) => {
      const uid = user?.uid;
      const userRef = this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid);
        userRef.get().subscribe((userDoc) => {
          const role = userDoc.data()?.['role'];
          if(role === 'student') {
            this.firestore.collection('Organisations').doc(this.orgTitle).collection('Quizzes').doc(this.quizId).collection('scores').doc(uid).set({
              email : user?.email,
              role : userRole,
              name : user?.displayName,
              score : score,
              subject : this.quizId,
            });
            this.firestore.collection('Organisations').doc(this.orgTitle).collection('users').doc(uid).collection('scores').doc(this.quizId).set({
              score : score,
              subject : this.quizId,
              totalQuestions : totalQuestions
            });
          }
        });
    });
    this.router.navigate(['organisation/quizzes/dashboard/submit-answers'], {
      queryParams: {
        questionNo: this.questionNo,
        orgTitle: this.orgTitle,
        quizName: this.quizId
      }
    });
  };
  viewscores() {
      this.router.navigate(['organisation/quizzes/dashboard/submit-answers'], {queryParams: { questionNo: this.questionNo, orgTitle: this.orgTitle, quizName: this.quizId,} });
  }
}
