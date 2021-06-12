import { Component, OnInit, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  food:Query;
  response:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
ll
  search(){

    this.http.get("https://api.nutritionix.com/v1_1/search/" + this.food + "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Citem_description%2Cnf_protein%2Cnf_calories%2Cnf_total_carbohydrate%2Cnf_total_fat&appId=42e8cbe9&appKey=a4e373fe0f10ab1de40cffbffb9db544")
    .subscribe((respone)=>{
      this.response =respone;
      console.log(respone);
    })
  }
}
