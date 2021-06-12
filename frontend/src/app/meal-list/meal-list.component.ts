//imports
import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meals.service';
import { UserService } from 'src/app/services/user.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})

export class MealListComponent implements OnInit {

 MealsData :any;

  constructor(
    public apiService: MealService,
    private userService: UserService
  ) {
    
    this.MealsData = [];

   }

  ngOnInit(): void {
    // console.log(this.userService.getUserId())
    this.getAllMeals(localStorage.getItem('userId'));
  }

  //to fetch all the day to day meal record
  getAllMeals(userID) {
    //Get saved list of students
    this.apiService.getItems(userID).subscribe(response => {
      console.log(response);
      this.MealsData = response;
    })
  }

  //to delete a meal from the meal record
  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllMeals(localStorage.getItem('userId'));
    });
  }

 //to download the contents of page as pdf file
 public captureScreen()  
  {  
    let data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('http://localhost:4200/list')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Meal.pdf'); // Generated PDF   
    });
}
}
