import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root'}) 
export class UserService {

    private token: string;
    private isAuthenticated = false;
    private userId: string;
    private username: string;
    private tokenTimer: any;
    //as a user status listener
    private userStatusListener = new Subject<boolean>();

    @Input() private user: User = {
        _id: '',
        email: '',
        username: '',
        password: '',
        gender: '',
        weight: 0,
        height: 0
    };

    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    }

    HttpOptions = {
        headers : new HttpHeaders({'content-type': 'application/json'})
    };

    getToken(){
        return this.token;
    }

    getUserId() {
        return this.userId;
    }

    getUsername() {
        return this.username;
    }

    getUser() {
        return this.user;
    }

    getUserStatusListener() {
        return this.userStatusListener.asObservable();
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    //call userService to 
    createUser(user: User){
        this.http.post("http://localhost:3030/user/signup", user).subscribe(response => {
            console.log(response);
            this.snackBar.open("Register successfully.", "OK");
            this.router.navigate(['/signin']);
        }, error => {
            console.log(error);
            this.router.navigate(['/signup']);
            this.userStatusListener.next(false);
        });
    }

    //login part 
    login(user: User) {
        this.http
        .post<{token: string, expiresIn: number, userId: string, username: string}>(
            "http://localhost:3030/user/login", 
            user
        )
          .subscribe(response => {
              //get login token
              const token = response.token;
              this.token = token;
              //if token is valid
              if (token) {
                  //give the user authentication
                  this.isAuthenticated = true;
                  this.userStatusListener.next(true);
                  this.userId = response.userId;
                  this.username = response.username;
                  const expiresInDuration = response.expiresIn;
                  this.setAuthTimer(expiresInDuration);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                  this.saveUserData(token, expirationDate, this.userId, this.username);
                //   this.setAuthTimer(expiresInDuration);
              }
              console.log("login successfully");
              this.router.navigate(['/home']);
          }, error => {
              this.router.navigate(['/signin']);
              this.userStatusListener.next(false);
          });
    }

    //auto Authenticate User
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        //get expiration duration, if duration is greater than 0, then the user is authenticated
        const expiresIn = authInformation.expiratinDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.userStatusListener.next(true);
        }
    }

    //set authenticated timer
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    //show user basic information
    getUserProfile() {
        return this.http.get<{user: User}>("http://localhost:3030/user/userProfile/" + localStorage.getItem('userId'));
    }


    //update profile
    updateProfile(username: string, email: string, newPassword: string, originPassword: string, gender: string, height: number, weight: number) {
        
        //save updateUser information to HttpParams, in order to send a user object to server.
        let updateUser = new HttpParams();
        updateUser = updateUser.append("id", localStorage.getItem('userId'));
        updateUser = updateUser.append("username", username);
        updateUser = updateUser.append('email', email);
        updateUser = updateUser.append("newPassword", newPassword);
        updateUser = updateUser.append('originPassword', originPassword);
        updateUser = updateUser.append("gender", gender);
        updateUser = updateUser.append("height", height.toString());
        updateUser = updateUser.append("weight", weight.toString());

        this.http
         .put<{id: string, username: string, email: string, newPassword: string, originPassword: string, gender: string, height: number, weight: number}>("http://localhost:3030/user/userProfile/" + localStorage.getItem('userId'), updateUser)
         //if update successfully
         .subscribe(response => {
             this.snackBar.open("Update successfully!", "OK", {duration: 2000,});
         }, error => {
            this.router.navigate(['']);
            this.userStatusListener.next(false);
         });

    }

    //logout, clear token, userid, and back to the home page
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.userStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearUserData();
        this.router.navigate(['/']);
        this.userId = null;
        this.user = null;
    }

    //set localstorage data
    private saveUserData(token: string, expiresInDuration: Date, userId: string, username: string) {   
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiresInDuration.toISOString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
    }

    //clear localstorage data
    private clearUserData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }

    //get localstorage data
    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expiratinDate: new Date(expirationDate),
            userId: userId,
            username: username
        }
    }

    //on click profile button
    showProfile() {
        if(this.isAuthenticated) {
            this.router.navigate(['/fitness/profile']);
        }
        else {
            this.router.navigate[''];
        }
    }

    //on click video manage button 
    showUpload() {
        if (this.isAuthenticated) {
            this.router.navigate(['/fitness/upload']);
        }
        else {
            this.router.navigate[''];
        }
    }
}