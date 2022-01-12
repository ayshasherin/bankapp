import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  currentUserName: any

  currentAcno:any


  //sample database

  users:any = {
    1000: { acno: 1000, uname: "Sanoob", password: "abc0", balance: 5000,transaction:[]  },
    1001: { acno: 1001, uname: "Franklin", password: "abc1", balance: 5000 ,transaction:[] },
    1002: { acno: 1002, uname: "Michael", password: "abc2", balance: 5000,transaction:[] },
    1003: { acno: 1003, uname: "Trevor", password: "abc3", balance: 5000,transaction:[] },
  }

  constructor() {
    this.getDetails()
  }

  

  //to store in local storage

  saveDetails() {
    if (this.users) {
      localStorage.setItem("db", JSON.stringify(this.users))
    }
    if (this.currentUserName) {
      localStorage.setItem("cUname", JSON.stringify(this.currentUserName))
    }
    if(this.currentAcno){
      localStorage.setItem("cAcno", JSON.stringify(this.currentAcno))
    }
  }

  // to get values from local storage

  getDetails() {
    if (localStorage.getItem("db")) {
      this.users = JSON.parse(localStorage.getItem("db") || "")
    }

    if (localStorage.getItem("cUname")) {
      this.currentUserName = JSON.parse(localStorage.getItem("cUname") || "")

    }
    if(localStorage.getItem("cAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("cAcno") || "")
    }
  }



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
        balance: 5000,
        transaction:[]
      }
      // console.log(db); 
      this.saveDetails()
      return true

    }
  }

  login(acno: any, password: any) {

    let database = this.users

    if (acno in database) {
      if (password == database[acno]["password"]) {
        this.currentAcno=acno
        this.currentUserName = database[acno]["uname"]
        this.saveDetails()
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

  getTransactions(){
    return this.users[this.currentAcno].transaction

  }


  deposit(acno: any, password: any, amt: any) {


    var amount = parseInt(amt)
    let db = this.users

    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] = db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()
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
        if (db[acno]["balance"] > amount) {
          db[acno]["balance"] = db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"DEBIT"
          })
          this.saveDetails()

          return db[acno]["balance"]

        } else {
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
