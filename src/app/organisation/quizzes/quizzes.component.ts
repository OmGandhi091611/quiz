import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit{
  orgTitle: any;
  quizzes!: any[];
  selectedOrg: any;
  constructor(private router : Router, private firestore : AngularFirestore, private route : ActivatedRoute) {};
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
      if (this.orgTitle) {
        this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes`).valueChanges()
        .subscribe((quizzes: any[]) => {
          // console.log(quizzes);
          this.quizzes = quizzes;
        });
      }
    });
  };
  logout() {
    this.router.navigate(['organisation']);
  }
  addQuiz() {
    this.router.navigate(['organisation/quizzes/createquiz'], { queryParams: { orgTitle: this.orgTitle } });
  }
  takeQuiz(quizId: string) {
    this.router.navigate(['organisation/quizzes/dashboard'], { queryParams: { quizName: quizId, orgTitle: this.orgTitle } });
  }
}
