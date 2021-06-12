//imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meals.service';
import {Meal} from '../models/meal';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss']
})
export class MealItemComponent implements OnInit {
  id: number;
  data: Meal;

  //calling ActivedRoute ,Router,MealService in the constructor
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: MealService) {  this.data = new Meal(); }

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
 
  //uodate() allows to update any meal record
  update() {
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['list']);
    })
  }

}
