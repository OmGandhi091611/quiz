import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-submit-answers',
  templateUrl: './submit-answers.component.html',
  styleUrls: ['./submit-answers.component.scss']
})
export class SubmitAnswersComponent  implements OnInit{
  currentDocumentIndex!: number;
  totalQuestions!: number;
  scores: any[] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentDocumentIndex = parseInt(params['currentDocumentIndex']);
    });
    this.firestore.collection('scores', ref => ref.orderBy('score', 'desc')).valueChanges().subscribe((scores) => {
      this.scores = scores;
    })
  }
  constructor(private router: Router, private route: ActivatedRoute, private firestore : AngularFirestore) {
  }
  goBack() {
    this.router.navigate(['dashboard'], {queryParams: {currentDocumentIndex: this.currentDocumentIndex}});
  }
}
