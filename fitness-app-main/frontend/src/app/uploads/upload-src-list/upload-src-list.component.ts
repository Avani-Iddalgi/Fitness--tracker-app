import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Upload } from '../upload.model';
import { UploadService } from '../uploads.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import {User} from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-upload-src-list',
  templateUrl: './upload-src-list.component.html',
  styleUrls: ['./upload-src-list.component.scss']
})
export class UploadSrcListComponent implements OnInit, OnDestroy{
  uploads: Upload[] = [];
  isLoading = false;
  private uploadsSub: Subscription;
  private authStatusSub: Subscription;
  
 

  user: User;
  userId: String;
  //build a constructor >?
  constructor(public uploadsService: UploadService, private userService: UserService, private sanitizer: DomSanitizer) {}


  ngOnInit() {
    this.isLoading = true;
    //get the userId first
    this.uploadsService.getUploadsByUserId(localStorage.getItem('userId'));
    //check whether the upload array is changed
    this.uploadsSub = this.uploadsService.getUploadUpdateListener()
      .subscribe((uploads : Upload[]) => {
        this.isLoading = false;
          this.uploads = uploads;
          //make every link url to be safe Url
          this.uploads.forEach(upload => {
            if (upload.contentType === 'link') {
              if (typeof(upload.mediaPath) === 'string') {
                 upload.mediaPath = this.sanitizer.bypassSecurityTrustResourceUrl(upload.mediaPath)
              }
            }
            if(upload.userId !== this.userService.getUserId()){
              return;
            }
          });
      });
     this.authStatusSub = this.userService.getUserStatusListener().subscribe();
  }


  //when delete a video
  onDelete(uploadId: string) {
    this.uploadsService.deleteUpload(uploadId);
  }

  ngOnDestroy(){
    this.uploadsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
