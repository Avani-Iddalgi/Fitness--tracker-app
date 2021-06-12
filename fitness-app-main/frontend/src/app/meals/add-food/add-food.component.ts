import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'; //imports to diplay the data
import {Food} from '../../models/food'; //imports the interface of the class food to be used for holding new input data.

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {
  @Output()  addNewFood= new EventEmitter();//to  take the ng serve listed food to the sibing component for listing

  constructor() { }

  addFood(name:string,description:string,calories:number){
    var newFoodObj:Food = new Food(name,description,calories);
    this.addNewFood.emit(newFoodObj);//carries the data to the parent component for display
  }
  
  ngOnInit(): void{
  }

}