import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { UsernameRoutingModule } from './username-routing.module';
import { UsernameComponent } from './username.component';


@NgModule({
  declarations: [
    UsernameComponent
  ],
  imports: [
    CommonModule,
    UsernameRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
  ]
})
export class UsernameModule { }
