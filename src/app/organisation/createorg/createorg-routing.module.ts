import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateorgComponent } from './createorg.component';

const routes: Routes = [{ path: '', component: CreateorgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateorgRoutingModule { }
