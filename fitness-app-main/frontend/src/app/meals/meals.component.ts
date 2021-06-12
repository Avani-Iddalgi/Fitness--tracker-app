import { Component, OnInit } from '@angular/core';
import {Food} from '../models/food';  //imports the interface of the class food to be used for holding new input data.
//import {FilterPipe } from '../../app/filter.pipe'


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  title: string = 'Meal Tracker ';

  constructor() { }

  public masterFoodsList:Food[]=[
  	//initial elements in the food meals array
  	new Food("ugali","lunch", 343),
  	new Food("Cereals","Breakfast", 580),
  	new Food("Chapatis","Supper",288),
  	new Food("Pizza","snack",212)
  ];

	// adds food meal items to the list throught the array
	showFood(newFoodFromChild:Food){
    this.masterFoodsList.push(newFoodFromChild);
  }
  //editting the selected meal in the list
  selectedFood:Food=null; //no food selected

  deleteFoodButton(deleteMeal:Food){
    var index:number = this.masterFoodsList.indexOf(deleteMeal);
    this.masterFoodsList.splice(index,1);
  }
  //shows the food to edit when it is called in the
  showFoodDetailToEdit(food:Food){
    this.selectedFood =food;
  }
  // set the food items to unselected
  finishedEditing(){
     this.selectedFood=null;
   }
  
  ngOnInit(): void {
  }

}




 