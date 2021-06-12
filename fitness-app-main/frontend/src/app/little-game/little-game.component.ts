import { Component, OnInit } from '@angular/core';
import { EventManager } from'@angular/platform-browser' 
@Component({
  selector: 'app-little-game',
  templateUrl: './little-game.component.html',
  styleUrls: ['./little-game.component.scss']
})
export class LittleGameComponent implements OnInit {

  start:boolean=false;
  isShow:boolean=true;
  foodColors:string[]=['yellow','green','orange','purple','blue','pink','cyan'];
  foodColor:string;
  foodX:number;
  foodY:number;
  snake=[{top:120,left:60},{top:120,left:30},{top:120,left:0}];
  intervalId:any;
  speed:number=600;
  direction:string="right";
  moveX:number=60;
  moveY:number=120;
  maxClientX:number=document.documentElement.clientWidth;
  maxClientY:number=document.documentElement.clientHeight;

startGame(){
    this.start=true;
    this.isShow=false;
    this.intervalId=setInterval(()=>{
    this.snakeMove();
    },this.speed);
   
  }

snakeMove(){
   var snake=document.querySelectorAll(".snake");
   switch(this.direction){
     case 'left':{this.moveX-=30;break;}
     case 'top':{this.moveY-=30;break;}
     case 'right':{this.moveX+=30;break;}
     case 'bottom':{this.moveY+=30;break;}
   } 
   for(var i=snake.length-1;i>0;i--){
      snake[i].setAttribute('style',`${snake[i-1].getAttribute('style')}`);
   }
      snake[0].setAttribute('style',`top:${this.moveY}px ;left:${this.moveX}px;background-color:${this.foodColors[Math.round(Math.random()*6)]}`);
      this.rightPosition();
      this.eatFood();
      this.speedUp(snake.length);
}

setDirection(keyCode){
    switch(keyCode){
      case 37:{
        if(this.direction!="right"){
           this.direction="left";
            }
              break;}
      case 38:{
        if(this.direction!="bottom"){
           this.direction="top";
              }
        break;}
      case 39:{
        if(this.direction!="left"){
          this.direction="right";
        }
        break;}
      case 40:{
        if(this.direction!="top"){
          this.direction="bottom";
        }
        break;}
      case 27:{
        clearInterval(this.intervalId);
        this.start=false;
        document.getElementById("start").innerHTML="暂停游戏";
          break;}
    }
}

beginning(){
    var snake=document.querySelectorAll('.snake');
    for(var i=0;i<snake.length;i++){
      snake[i].setAttribute('style',`top:${this.snake[i].top}px ; left:${this.snake[i].left}px;background-color:${this.foodColors[Math.round(Math.random()*6)]}`);
    }
}

speedUp(len:number){
    if(len<=5){
      this.speed=600;
    }else if(len>5&&len<=10){
      this.speed=400;
    }else{
      this.speed=200;
    }
}

rightPosition(){
    var obj=document.getElementById("start");
    var body=document.getElementById("container");
   if(this.moveX>=this.maxClientX||this.moveY>=this.maxClientY||this.moveX<=0||this.moveY<=0){
        clearInterval(this.intervalId);
        obj.innerHTML="Game Over";
        body.setAttribute("style","background-image:url('https://thumbs.dreamstime.com/b/woman-praying-free-birds-to-nature-sunset-background-woman-praying-free-birds-enjoying-nature-sunset-99680945.jpg')")
        this.start=false;
   }
}

createFood(){
    var food=document.getElementById("food");
    this.foodX=Math.round(Math.random()*this.maxClientX);
    this.foodY=Math.round(Math.random()*this.maxClientY);
    this.foodColor=this.foodColors[Math.round(Math.random()*6)];
    food.setAttribute('style',`top:${this.foodY}px;left:${this.foodX}px;background-color:${this.foodColor}`);
}

eatFood(){
    var distanceX=Math.abs(this.foodX-this.moveX);
    var distanceY=Math.abs(this.foodY-this.moveY);
    if(distanceX<15&&distanceY<15){
      var snake=document.getElementById("snake");
      var snakeBodies=document.querySelectorAll(".snake");
      snake.appendChild(snakeBodies[1].cloneNode());
      this.createFood();
    }
}

  constructor(private eventListener :EventManager) { }

  ngOnInit(): void {
    this.eventListener.addGlobalEventListener('window','keydown',(event:any)=>{
      this.setDirection(event.keyCode);
    });
    this.beginning();
    this.createFood();
  }
}
