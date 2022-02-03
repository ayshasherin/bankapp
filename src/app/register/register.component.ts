import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname = ""

  acno = ""

  pwd = ""

  registerForm = this.fb.group({

    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })


  constructor(private ds: DatasService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {

    // console.log(this.registerForm);
    if (this.registerForm.get('uname')?.errors) {
      alert("invalid username")
    }

    if (this.registerForm.valid) {

      var uname = this.registerForm.value.uname
      var acno = this.registerForm.value.acno
      var pwd = this.registerForm.value.pwd

      //asynchronous event

      this.ds.register(acno, uname, pwd)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            this.router.navigateByUrl("")

          }
        },
          (result) => {
            alert(result.error.message)
          })
    }
    else {
      alert("invalid form")
    }

  }

}
