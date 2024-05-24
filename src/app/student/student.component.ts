import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  showadd!:boolean;
  showupdate!:boolean;
  studentModelObj:Student=new Student;
  formValue!:FormGroup
  allstudent!:any;

  constructor (private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
   
      prenom:['',Validators.required],
      nom:['',Validators.required],
      sexe:['',Validators.required],
      dateNaissance:['',Validators.required],
      classe:['',Validators.required]
      
    })
    this.getdata();
  }
  add(){
    this.showadd=true;
    this.showupdate=false;
  }
  edit(data:any){
    this.showupdate=true;
    this.showadd=false;
    this.studentModelObj.id=data.id;
    this.formValue.controls['prenom'].setValue(data.prenom);
    this.formValue.controls['nom'].setValue(data.nom);
    this.formValue.controls['sexe'].setValue(data.sexe);  
    this.formValue.controls['dateNaissance'].setValue(data.dateNaissance);
    this.formValue.controls['classe'].setValue(data.classe);
    //this.studentModelObj.id=data.id;
  }

  //update avec put
  update(){
    this.studentModelObj.prenom=this.formValue.value.prenom;
    this.studentModelObj.nom=this.formValue.value.nom;
    this.studentModelObj.sexe=this.formValue.value.sexe;
    this.studentModelObj.dateNaissance=this.formValue.value.dateNaissance;
    this.studentModelObj.classe=this.formValue.value.classe;
    this.api.updatestudent(this.studentModelObj,this.studentModelObj.id)
    .subscribe(res=>{
      this.formValue.reset();
      this.getdata();
      alert("mise a jour avec succes");
    },
    err=>{
      alert("echec de la mise a jour");
    }
    
  )
  }

  addstudent(){
    this.studentModelObj.prenom=this.formValue.value.prenom;
    this.studentModelObj.nom=this.formValue.value.nom;
    this.studentModelObj.sexe=this.formValue.value.sexe;
    this.studentModelObj.dateNaissance=this.formValue.value.dateNaissance;
    this.studentModelObj.classe=this.formValue.value.classe;

    this.api.poststudent(this.studentModelObj).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      alert("ajouter avec succes");
      this.getdata();
    },
    err=>{
      alert("echec de l'ajout");
    })
}

  getdata(){ 
    this.api.getstudent().subscribe(res=>{
      this.allstudent=res;
    })
  }

  //supprimer avec delete
  deletestudent(data:any){
    if(confirm("etes vous sure de supprimer "+data.prenom))
    this.api.deletestudent(data.id)
  .subscribe(res=>{
      alert("supprimer avec succes");
      this.getdata();
    })
  }
}
