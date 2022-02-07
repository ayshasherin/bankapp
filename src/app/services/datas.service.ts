import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  currentUserName: any
  
  currentAcno: any


  //sample database

  users: any = {
    1000: { acno: 1000, uname: "Sanoob", password: "abc0", balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Franklin", password: "abc1", balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Michael", password: "abc2", balance: 5000, transaction: [] },
    1003: { acno: 1003, uname: "Trevor", password: "abc3", balance: 5000, transaction: [] },
  }

  constructor(private http: HttpClient) {

  }



  //to store in local storage

  // saveDetails() {
  //   if (this.users) {
  //     localStorage.setItem("db", JSON.stringify(this.users))
  //   }
  //   if (this.currentUserName) {
  //     localStorage.setItem("cUname", JSON.stringify(this.currentUserName))
  //   }
  //   if(this.currentAcno){
  //     localStorage.setItem("cAcno", JSON.stringify(this.currentAcno))
  //   }
  // }

  // to get values from local storage

  // getDetails() {
  //   if (localStorage.getItem("db")) {
  //     this.users = JSON.parse(localStorage.getItem("db") || "")
  //   }

  //   if (localStorage.getItem("cUname")) {
  //     this.currentUserName = JSON.parse(localStorage.getItem("cUname") || "")

  //   }
  //   if(localStorage.getItem("cAcno")){
  //     this.currentAcno=JSON.parse(localStorage.getItem("cAcno") || "")
  //   }
  // }



  register(acno: any, uname: any, password: any) {

    const data = {
      acno,
      uname,
      password
    }

    //asynchronous 
    return this.http.post('http://localhost:3000/register', data)

  }

  login(acno: any, password: any) {
    const data = {
      acno,
      password
    }

    //asynchronous 
    return this.http.post('http://localhost:3000/login', data)

  }

  getTransactions(acno: any) {

    const data = {

    }

    return this.http.post('http://localhost:3000/transactions/' + acno, data, this.getOptions())

  }


  deposit(acno: any, password: any, amt: any) {


    const data = {
      acno,
      password,
      amt

    }

    //asynchronous 
    return this.http.post('http://localhost:3000/deposit', data, this.getOptions())

  }

  // To add token intothe request header
  getOptions() {
    const token = JSON.parse(localStorage.getItem("token") || "")
    console.log(token);
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }



  withdraw(acno: any, password: any, amt: any) {

    const data = {
      acno,
      password,
      amt

    }
    //asynchronous 
    return this.http.post('http://localhost:3000/withdraw', data, this.getOptions())

  }

  delete(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())

  }

}
