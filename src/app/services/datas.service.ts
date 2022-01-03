import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  currentUserName:any

  users: any = {
    1000: { acno: 1000, uname: "Sanoob", password: "abc0", balance: 5000 },
    1001: { acno: 1001, uname: "Franklin", password: "abc1", balance: 5000 },
    1002: { acno: 1002, uname: "Michael", password: "abc2", balance: 5000 },
    1003: { acno: 1003, uname: "Trevor", password: "abc3", balance: 5000 },
  }

  constructor() { }

  register(acno: any, uname: any, password: any) {
    let db = this.users

    if (acno in db) {
      return false

    }
    else {
      db[acno] = {
        acno,
        uname,
        password,
        balance: 5000
      }
      // console.log(db);
      return true

    }
  }

  login(acno: any, password: any) {

    let database = this.users

    if (acno in database) {
      if (password == database[acno]["password"]) {
        this.currentUserName=database[acno]["uname"]
        return true
        


      } else {
        alert("Invalid Password")
        return false
      }
    }
    else {
      alert("AccountNo. Does'nt Exist")
      return false
    }
  }

  deposit(acno: any, password: any, amt: any) {


    var amount = parseInt(amt)
    let db = this.users

    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] = db[acno]["balance"] + amount
        return db[acno]["balance"]

      } else {
        alert("Incorrect password")
        return false
      }

    }
    else {
      alert("Account doesn't Exist ")
      return false
    }

  }



  withdraw(acno: any, password: any, amt: any) {


    var amount = parseInt(amt)
    let db = this.users

    if (acno in db) {
      if (password == db[acno]["password"]) {
        if(db[acno]["balance"]>amount){
          db[acno]["balance"] = db[acno]["balance"] - amount
          return db[acno]["balance"]

        }else{
          alert("insufficient Blance")
          return false
        }
       

      } else {
        alert("Incorrect password")
        return false
      }

    }
    else {
      alert("Account doesn't Exist ")
      return false
    }

  }


}
