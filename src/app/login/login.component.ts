import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../utills/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  FormBuilder: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _api: ApiService
  ) {}

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  ngOnInit() {
    if(localStorage.getItem('authtoken')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    let resulta: any;
    if (this.loginForm.valid) {
      this._api.postTypeRequest('client/login/', this.loginForm.value).subscribe((res: any) => {
     
        let userType: any = 'client';
        if (res.auth) { 
          let userData = {
            username: res.full_name,
            email: res.email,
            userid: res.id
          }
          if(res.type === 2) {
            userType = 'admin';
          }
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('authtoken', res.auth);
          localStorage.setItem('usertype', userType);
          resulta = res;

          if(userType === 'admin') {
            this.router.navigate(['/adminhome']);
          } else 
            this.router.navigate(['/dashboard']);
        }
      })
     
    }

  }
}
