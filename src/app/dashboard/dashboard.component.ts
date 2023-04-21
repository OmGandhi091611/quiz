import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  mcqDocuments: any[] = [];
  selectedAnswers: string[] = [];
  currentDocumentIndex = 0;
  currentDocument: any;
  question: any;
  correctAnswer: any;
  constructor(private afauth : AngularFireAuth, private firestore : AngularFirestore, private auth : AuthService, private router : Router, private route : ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentDocumentIndex = parseInt(params['currentDocumentIndex']) || 0;
    });
    this.firestore.collection('questions').valueChanges().subscribe((questions: any[]) => {
      this.mcqDocuments = questions;
      this.currentDocument = this.mcqDocuments[this.currentDocumentIndex];
      this.selectedAnswers = Array(this.mcqDocuments.length).fill(null);
    });
  }
  nextQuestion() {
    if(this.currentDocumentIndex < this.mcqDocuments.length - 1) {
      this.currentDocumentIndex++;
      this.currentDocument = this.mcqDocuments[this.currentDocumentIndex];
      this.updateUrl();
    }
  }
  previousQuestion() {
    if(this.currentDocumentIndex > 0) {
      this.currentDocumentIndex--;
      this.currentDocument = this.mcqDocuments[this.currentDocumentIndex];
      this.updateUrl();
    }
  }
  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { currentDocumentIndex: this.currentDocumentIndex },
      queryParamsHandling: 'merge'
    });
  }
  logout() {
    this.auth.logout();
  }
  isFirst() {
    return this.currentDocumentIndex === 0;
  }

  isLast() {
    return this.currentDocumentIndex === this.mcqDocuments.length - 1;
  }
  onAddQuestions() {
    this.router.navigate(['dashboard/add-questions']);
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
      this.currentDocumentIndex = unansweredQuestions[0];
      this.currentDocument = this.mcqDocuments[this.currentDocumentIndex];
      this.router.navigate(['dashboard'], { queryParams: { currentDocumentIndex: this.currentDocumentIndex }});
      alert(`Please answer question ${this.currentDocumentIndex + 1}`);
    } else {
      this.afauth.onAuthStateChanged((user) => {
        if(user) {
          const displayName = user?.email;
          this.firestore.collection('scores').doc(displayName!).set({
            score : score,
          })
          console.log(displayName);
        }
        else {
          console.log("Error");
        }
      });
      this.router.navigate(['dashboard/submit-answers'], { queryParams: { score: score, totalQuestions: totalQuestions, currentDocumentIndex: this.currentDocumentIndex}});
    }
  }
}
