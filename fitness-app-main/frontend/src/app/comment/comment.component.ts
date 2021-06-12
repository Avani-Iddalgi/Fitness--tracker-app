import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  newComment: Comment;
  uploadId: string;
  private userAuthSub: Subscription; 

  constructor(
    private userService: UserService ,
    private commentService: CommentService, 
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }


  //init the comment component
  ngOnInit(): void {
    this.userAuthSub = this.userService.getUserStatusListener().subscribe();
    //get upload id through the url
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.uploadId = paramMap.get('id');
        this.commentService.getComments(this.uploadId).subscribe(comments => {
          this.comments = comments;
          console.log(this.comments);
        })
      }
    })
  }

  //create a new comment
  createNewComment(form: NgForm) {
    //check whether the user is still in login
    if (localStorage.getItem('userId') === undefined) {
      this.snackBar.open("You haven't login yet.", "OK");
      return;
    }
    //assign value to comment's attributes
    let userId: string = localStorage.getItem('userId');
    let uploadId: string = this.uploadId;
    let content: string = form.value.content;
    this.newComment = {userId, uploadId, content} as Comment;
    //call service to save a new upload
    this.commentService.createNewComment({userId, uploadId, content} as Comment);
    this.comments.push(this.newComment);
    form.reset();
  }

  ngOnDestroy() {
    this.userAuthSub.unsubscribe();
  }

}
