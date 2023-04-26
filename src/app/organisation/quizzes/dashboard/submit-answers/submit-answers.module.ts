import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { SubmitAnswersRoutingModule } from './submit-answers-routing.module';
import { SubmitAnswersComponent } from './submit-answers.component';


@NgModule({
  declarations: [
    SubmitAnswersComponent
  ],
  imports: [
    CommonModule,
    SubmitAnswersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatRadioModule,
    MatCardModule,
  ]
})
export class SubmitAnswersModule { }
