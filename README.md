
# Fitness Tracker

Fitness Tracker helps an individual user to track his fitness record.A user can manage ,add video, keep track of every meal and the calories intake.User can also edit the food and it's details.The tracker also has a BMI calculator which gives accurate bmi value according to the weight and height input.

## General functionality:

Authenticate users via JWT (login/signup pages + logout button on settings page)
Video library
Leave comment on video
CRUD Meal Tracker
BMI Calculator
Edit Profile

## Set Up and installation requirements.

* clone repository.
  https://github.com/neu-mis-info6150-spring-2020/final-project-evolution
* Install Angular cli.
* Run nmp install.
* run ng serve 
  ## Steps to run Angular
        1) npm install -g @angular/cli
        2) ng new assignment8--style=scss --routing=true
        3) npm run build
        4) npm start
        5)Run using ng server
        6)Default port 4200
  ## Steps to run the Server
        1) npm init  
        2) npm i express --save 
        3) npm i mongoose --save
        4) Install mongoDb and run the mongod.exe from the installed directory (eg mongod.exe --dbpath "C:\Program Files\MongoDB\data")

NOTE : To run the application make sure your angular ,server and mogo db is up and working.

## The general page breakdown looks like this:

Home page (URL:http://localhost:4200/home)
Home page has features to manage and watch video , add meals
Sign in/Sign up pages (URL: http://localhost:4200/signup/ ,http://localhost:4200/signin/)
Uses JWT (store the token in localStorage)
We have a memu page having all the apllication feature.
We also have a Edit Profile if user wants to make any changes in the profile. (http://localhost:4200/fitness/profile)
where a user is able to change the password and add details.


## Technologies Used
* HTML,
* SCSS,
* JavaScript,
* TypeScript,
* Node.js,
* Angular.


# Submitted by:

    Team :Evolution
    Member : Avani Iddalgi(1087272) ,Siddhartha Raju(1084614),Qi Chen(1061318),Chun Wang(1084146)
