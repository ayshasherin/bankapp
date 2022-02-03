import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {

  @Input() item:string | undefined

  @Output() onDelete=new EventEmitter()

  @Output() onCancel=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  deleteFromChild(){
    this.onDelete.emit(this.item)
  }

  cancelFromChild(){
    this.onCancel.emit()
  }

}
