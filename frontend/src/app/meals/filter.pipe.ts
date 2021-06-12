import { Pipe, PipeTransform } from '@angular/core';
import {Food} from '../models/food';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(input:Food[],caloriesRange){
    var output:Food[]=[];
    if(caloriesRange === "low"){
      for(var i=0;i<input.length;i++){
        if(input[i].calories<500){
          output.push(input[i]);
        }
      }
      return output;
    } else if (caloriesRange === "high"){
      for(var i=0;i<input.length;i++){
        if(input[i].calories>=500){
          output.push(input[i]);
        }
      }
      return output;
    }
    else {
      return input;
    }
  }
}