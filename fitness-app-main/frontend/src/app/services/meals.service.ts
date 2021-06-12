import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Meal} from '../models/meal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  //API Path
  base_path = 'http://localhost:3030/meal'

  constructor(private http:HttpClient) { }

  //HTTP option and setting header
  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})}

  //Creating a new meal
  createItem(item):Observable<Meal>
  {
    return this.http
    .post<Meal>(this.base_path, JSON.stringify(item),this.httpOptions);
  }

  createMeal(meal: Meal) {
    this.http.post(this.base_path, meal).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  //Get Single meal
  getItem(id):Observable<Meal>{
    return this.http
    .get<Meal>(this.base_path + '/'+id)
  }

  getItems(userID):Observable<Meal>{
    return this.http
    .get<Meal>(this.base_path + '/user/'+ userID)
  }

  // Update item by id
  updateItem(id, item): Observable<Meal> {
    return this.http
      .put<Meal>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
  }
  
  deleteItem(id):Observable<Meal>{
    return this.http
    .delete<Meal>(this.base_path + '/'+id)
  }
}
