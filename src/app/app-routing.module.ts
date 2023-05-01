import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'login/forgot-password', loadChildren: () => import('./login/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'login/verify-email', loadChildren: () => import('./login/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'login/username', loadChildren: () => import('./login/username/username.module').then(m => m.UsernameModule) },
  { path: 'organisation/quizzes', loadChildren: () => import('./organisation/quizzes/quizzes.module').then(m => m.QuizzesModule) },
  { path: 'organisation/createorg', loadChildren: () => import('./organisation/createorg/createorg.module').then(m => m.CreateorgModule) },
  { path: 'organisation/quizzes/createquiz', loadChildren: () => import('./organisation/quizzes/createquiz/createquiz.module').then(m => m.CreatequizModule) },
  { path: 'organisation/quizzes/dashboard', loadChildren: () => import('./organisation/quizzes/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'organisation/quizzes/dashboard/add-questions', loadChildren: () => import('./organisation/quizzes/dashboard/add-questions/add-questions.module').then(m => m.AddQuestionsModule) },
  { path: 'organisation/quizzes/dashboard/submit-answers', loadChildren: () => import('./organisation/quizzes/dashboard/submit-answers/submit-answers.module').then(m => m.SubmitAnswersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
