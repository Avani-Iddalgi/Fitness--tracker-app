//imports
import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { MealService } from '../services/meals.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html',
  styleUrls: ['./meal-create.component.scss']
})
export class MealCreateComponent implements OnInit {

  data: Meal
  showMsg: boolean = false;

  //Passing MealService, Userservice,Router service to constructor
  constructor(
    public apiService: MealService,
    private userService: UserService,
    public router: Router
  ) {
    this.data = new Meal();
  }
 
  ngOnInit() {
  }

//  submitForm() adds meal to the list like food ,description, calories,quantity of a particular user
//  We are fetching id of a particular user from getUserId()
  submitForm() {
    let userId : string = localStorage.getItem('userId');
    this.data.User_Id = userId;
    console.log("this is the id" + userId);
    console.log(this.data);
    this.apiService.createMeal(this.data);
    this.showMsg= true;
 }
}