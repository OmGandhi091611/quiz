import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit{
  questionForm!: FormGroup;
  ngOnInit(): void {}
  constructor(private router : Router, private fb: FormBuilder, private firestore: AngularFirestore) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      correctAnswer: ['', Validators.required],
    });
  }
  back(){
    this.router.navigate(['dashboard']);
  }
  submit() {
    if (this.questionForm.invalid) {
      alert('Insert all the values properly');
      return;
    }
    const question = this.questionForm.value;
    const values = Object.values(question);
    if (values.some(value => value === null)) {
      return;
    }
    this.firestore.collection('questions').add(question).then(() => {
      this.questionForm.reset();
    });
  }
  addOption() {
    this.options.push(this.fb.control('', Validators.required));
  }
  get options() {
    return this.questionForm.get('options') as FormArray;
  }
}
