import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private userAuthSub : Subscription;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //add a listener to check whether the user is authenticated or not
    this.userAuthSub = this.userService.getUserStatusListener().subscribe();
  }

  // when submit login
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let email = form.value.email;
    let password = form.value.password;
    this.userService.login({email, password} as User); 
  }

  ngOnDestroy(): void {
    this.userAuthSub.unsubscribe();
  }

}
