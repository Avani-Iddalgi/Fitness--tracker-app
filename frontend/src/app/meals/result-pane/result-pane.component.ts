import { Component, OnInit } from '@angular/core';
import { Input,Output, EventEmitter} from '@angular/core';
import {Food} from '../../models/food';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-result-pane',
  templateUrl: './result-pane.component.html',
  styleUrls: ['./result-pane.component.scss']
})
export class ResultPaneComponent implements OnInit {
  @Input() childFoodlist:Food[];
  @Output() clickSender = new EventEmitter();
  
  editFoodButton(editSelectFood:Food){
    this.clickSender.emit(editSelectFood);
    }

    public caloriesToShow: string ="all";
    onChange(optionFromMenu){
      this.caloriesToShow =optionFromMenu;
    }
        @Output() clickRemove = new EventEmitter();
        deleteFoodButton(editSelectFood){
          this.clickRemove.emit(editSelectFood);
      }

  constructor() { }

  ngOnInit(){
  }
}
