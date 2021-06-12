import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: User = {
    _id: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    weight: 0,
    height: 0
  };

  isChangePassword = false;
  isHeightChange = false;
  isWeightChange = false;
  isEmailChange = false;
  isUsernameChange = false;
  isGenderChange = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId') === undefined) {
      this.router.navigate(['/home']);
    }
    this.userService.getUserProfile().subscribe(response => {
      this.user.password = response.user.password;
      this.user.email = response.user.email;
      this.user.username = response.user.username;
      this.user.weight = response.user.weight;
      this.user.height = response.user.height;
      this.user.gender = response.user.gender;
      // this.user = response.user;
    });
  }

  changePassword() {
    this.isChangePassword = true;
  }

  updateProfile(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open("Your form is invalid", "OK");
      return;
    }
    let username: string = this.isUsernameChange ? form.value.username : this.user.username;
    let email: string = this.isEmailChange ? form.value.email : this.user.email;
    let newPassword: string = form.value.newPassword;
    let originPassword: string = form.value.currentPassword;
    let gender: string = this.isGenderChange ? form.value.gender : this.user.gender;
    let height: number = this.isHeightChange ? form.value.height : this.user.height;
    let weight: number = this.isWeightChange ? form.value.weight : this.user.weight;
    if (newPassword === undefined) {
      console.log("empty new password");
      console.log(originPassword);
      this.userService.updateProfile(username, email, originPassword, originPassword, gender, height, weight);
      this.snackBar.open("Edit your profile successfully");
      this.router.navigate(['/home']);
    }
    else {
      console.log("have new password");
      console.log(newPassword);
      this.userService.updateProfile(username, email, newPassword, originPassword, gender, height, weight);
    }
  }

  heightChange() {
    this.isHeightChange = true;
  }

  weightChange() {
    this.isWeightChange = true;
  }

  genderChange() {
    this.isGenderChange = true;
  }

  emailChange() {
    this.isEmailChange = true;
  }

  usernameChange() {
    this.isUsernameChange = true;
  }

}
