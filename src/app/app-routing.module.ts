import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'dashboard/add-questions', loadChildren: () => import('./dashboard/add-questions/add-questions.module').then(m => m.AddQuestionsModule) },
  { path: 'dashboard/submit-answers', loadChildren: () => import('./dashboard/submit-answers/submit-answers.module').then(m => m.SubmitAnswersModule) },
  { path: 'login/forgot-password', loadChildren: () => import('./login/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'login/verify-email', loadChildren: () => import('./login/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'login/username', loadChildren: () => import('./login/username/username.module').then(m => m.UsernameModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
