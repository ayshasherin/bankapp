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
  
  user=this.ds.currentUserName




  constructor(private router: Router, private ds: DatasService, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid){

      let result = this.ds.deposit(acno, pwd, amount)
      if (result) {
        alert(amount + " Credited !! Your New balance is " + result)
      }

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

      let result = this.ds.withdraw(accno, pswd, amounts)

    if (result) {

      alert(amounts + " Debited !! Your New balance is " + result)
    }

    }else{
      alert("Invalid Form")
    }
    


  }

}
