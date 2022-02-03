import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})


export class TransactionsComponent implements OnInit {

  acno = ""

  transactions: any

  constructor(private ds: DatasService) {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
    console.log(this.acno);

    this.ds.getTransactions(this.acno)
      .subscribe((result: any) => {
        console.log(result);

        if (result) {
          this.transactions = result.transaction
        }
      }
        ,
        (result) => {
          alert(result.error.message);

        })
    // console.log(this.transactions);


  }

  ngOnInit(): void {
  }

}
