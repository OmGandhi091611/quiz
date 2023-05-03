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
  userRole : any;
  quizId: any;
  constructor(private router : Router, private firestore : AngularFirestore, private route : ActivatedRoute) {
    this.userRole = localStorage.getItem('userRole')
  };
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orgTitle = params['orgTitle'];
      if (this.orgTitle) {
        this.firestore.collection(`Organisations/${this.orgTitle}/Quizzes`).valueChanges()
        .subscribe((quizzes: any[]) => {
          this.quizzes = quizzes;
        });
      }
    });
  };
  logout() {
    localStorage.removeItem('userRole')
    this.router.navigate(['login'], {queryParams : {orgTitle : this.orgTitle}});
  }
  addQuiz() {
    this.router.navigate(['organisation/quizzes/createquiz'], { queryParams: { orgTitle: this.orgTitle } });
  }
  takeQuiz(quizId: string) {
    this.router.navigate(['organisation/quizzes/dashboard'], { queryParams: { quizName: quizId, orgTitle: this.orgTitle } });
  }
  viewscores(quizId: string) {
      this.router.navigate(['organisation/quizzes/dashboard'], {queryParams: { orgTitle: this.orgTitle, quizName: quizId} });
  }
}
