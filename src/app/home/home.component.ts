import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  acno = ""
  pwd = ""
  amount = ""

  accno = ""
  pswd = ""
  amounts = ""

  depositForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],

    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })

  withdrawForm = this.fb.group({

    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],

    amounts: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })
  
  
  user:any
  
  accountno= ""

  lDate:any
  

  constructor(private router: Router, private ds: DatasService, private fb: FormBuilder) {
    this.lDate=new Date()
    if(localStorage.getItem("currentUserName")){
    this.user=JSON.parse(localStorage.getItem("currentUserName") || "" )}
   }

  ngOnInit(): void {

    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl("")
    }

  }

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUserName")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")


  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid){

      this.ds.deposit(acno, pwd, amount)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
        }
      },
        (result) => {
          alert(result.error.message)
        })

    }
    else{
      alert("invalid form")
    }


  }

  withdraw() {
    var accno = this.withdrawForm.value.accno
    var pswd = this.withdrawForm.value.pswd
    var amounts = this.withdrawForm.value.amounts

    if(this.withdrawForm.valid){

      this.ds.withdraw(accno, pswd, amounts)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
        }
      },
        (result) => {
          alert(result.error.message)
        })

    }else{
      alert("Invalid Form")
    }
    
  }

  deleteFromParent(){
    this.accountno = JSON.parse(localStorage.getItem("currentAcno") || "")

  }

  delete(event:any){
    // alert("Message from Parent")
    this.ds.delete(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    (result)=>{
      alert(result.error.message)
    })
  }

  cancel(){
    this.accountno=""
  }

}
