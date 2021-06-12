import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private userStatueSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userStatueSub = this.userService.getUserStatusListener().subscribe();
  }

  //click sign up to so this method
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //assign value to a user object
    this.isLoading = true;
    let username:string = form.value.username;
    let email:string = form.value.email;
    let password:string = form.value.password;
    let gender: string = form.value.gender;
    let weight: number = form.value.weight;
    let height: number = form.value.height;
    this.userService.createUser({username, email, password, gender, weight, height} as User);
  }

  ngOnDestroy():void {
    this.userStatueSub.unsubscribe();
  }

}
