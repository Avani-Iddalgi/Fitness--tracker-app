import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../../models/food';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss']
})
export class EditFoodComponent implements OnInit {
  @Input() foodToEdit: Food; //receives the input from the edit form and takes the blue print of the class Food for the contents to be edited
  @Output() doneClickedSender = new EventEmitter();

  constructor() { }

  ngOnInit(){
  }

doneClicked() {
  this.doneClickedSender.emit();

 }
} 