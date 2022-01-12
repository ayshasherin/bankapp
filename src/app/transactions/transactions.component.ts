import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  transactions:any

  constructor(private ds:DatasService) {
    this.transactions=this.ds.getTransactions()
    console.log(this.transactions);
    

   }

  ngOnInit(): void {
  }

}
