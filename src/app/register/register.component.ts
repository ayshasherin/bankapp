import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname=""

  acno=""

  pwd="" 

  registerForm =this.fb.group({

    uname:[''],
    acno:[''],
    pwd:['']

  })


  constructor(private ds:DatasService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm);

    var uname=this.registerForm.value.uname
    var acno =this.registerForm.value.acno
    var pwd=this.registerForm.value.pwd
    
    let result=this.ds.register(acno,uname,pwd)
    alert("Registered")

    if(result==true){
      alert("Account Registered Successfully") 
      
      this.router.navigateByUrl("")
    }else{
      alert("Account Already Exist")
    }
  }

}
