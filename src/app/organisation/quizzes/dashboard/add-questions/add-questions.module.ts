import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { AddQuestionsRoutingModule } from './add-questions-routing.module';
import { AddQuestionsComponent } from './add-questions.component';


@NgModule({
  declarations: [
    AddQuestionsComponent
  ],
  imports: [
    CommonModule,
    AddQuestionsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})
export class AddQuestionsModule { }
