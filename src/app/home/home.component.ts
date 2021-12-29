import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  acno=""
  pwd=""
  amount=""

  accno=""
  pswd=""
  amounts=""




  constructor( private router:Router , private ds:DatasService) { }

  ngOnInit(): void {
    
  }

  deposit(){
    var acno=this.acno
    var pwd=this.pwd
    var amount=this.amount

    let result = this.ds.deposit(acno,pwd,amount)

    if(result){

    alert(amount+ " Credited !! Your New balance is " +result)
    }
  }

  withdraw(){
    var accno=this.accno
    var pswd=this.pswd
    var amounts=this.amounts
    let result = this.ds.withdraw(accno,pswd,amounts)

    if(result){

    alert(amounts+ " Debited !! Your New balance is " +result)
    }

    

  }

}
