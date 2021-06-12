import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { UploadService } from '../uploads/uploads.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private userListenerSubs: Subscription;
  username: string;

  constructor(private userService: UserService, private uploadService: UploadService) { }

  ngOnInit(): void {
    //get whether user is authenticated first
    this.userIsAuthenticated = this.userService.getIsAuthenticated();

    //add a listener to listen whether the user is authenticate or not
    this.userListenerSubs = this.userService
      .getUserStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(this.userIsAuthenticated);
        this.username = this.userService.getUsername();
      });
  }

  onLogout() {
    this.userService.logout(); 
  }

  onProfile() {
    this.userService.showProfile();
  }

  onUploadVideo() {
    this.userService.showUpload();
  }

  ngOnDestroy(): void {
    this.userListenerSubs.unsubscribe();
  }
}
