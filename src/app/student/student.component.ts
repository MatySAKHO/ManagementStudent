import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  showadd!:boolean;
  showupdate!:boolean;
  formValue!:FormGroup
  constructor (private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      prenom:['',Validators.required],
      nom:['',Validators.required],
      sexe:['',Validators.required],
      dateNaissance:['',Validators.required],
      classe:['',Validators.required]
      
    })
  }
  add(){
    this.showadd=true;
    this.showupdate=false;
  }
  update(){
    this.showupdate=true;
    this.showadd=false;
  }
}
