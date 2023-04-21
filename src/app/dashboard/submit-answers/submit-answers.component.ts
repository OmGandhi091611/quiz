import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-submit-answers',
  templateUrl: './submit-answers.component.html',
  styleUrls: ['./submit-answers.component.scss']
})
export class SubmitAnswersComponent  implements OnInit{
  score!: number;
  totalQuestions!: number;
  currentDocumentIndex!: number;
  username!: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = parseInt(params['score']);
      this.totalQuestions = parseInt(params['totalQuestions']);
      this.currentDocumentIndex = parseInt(params['currentDocumentIndex']);
    });
    this.retriveEmail()
  }
  constructor(private router: Router, private route: ActivatedRoute, private afauth : AngularFireAuth) {
  }
  goBack() {
    this.router.navigate(['dashboard'], {queryParams: {currentDocumentIndex: this.currentDocumentIndex}});
  }
  async retriveEmail() {
    const user = await this.afauth.currentUser;
    if (user) {
      const name = user.displayName!;
      this.username = name;
    }
  }
}
