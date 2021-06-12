import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-view-all',
  templateUrl: './upload-view-all.component.html',
  styleUrls: ['./upload-view-all.component.scss']
})
export class UploadViewAllComponent implements OnInit {

  constructor(private userService: UserService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId') === undefined) {
      this.snackBar.open("You need to login to upload resources.", "OK");
      this.route.navigate(['/home']);
    }
  }

}
