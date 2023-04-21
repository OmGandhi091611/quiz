import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitAnswersComponent } from './submit-answers.component';

const routes: Routes = [{ path: '', component: SubmitAnswersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitAnswersRoutingModule { }
