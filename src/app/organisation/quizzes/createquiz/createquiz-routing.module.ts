import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatequizComponent } from './createquiz.component';

const routes: Routes = [{ path: '', component: CreatequizComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatequizRoutingModule { }
