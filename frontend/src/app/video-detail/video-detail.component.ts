import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Upload } from 'src/app/uploads/upload.model';
import { UploadService } from 'src/app/uploads/uploads.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit, OnDestroy{


  upload: Upload;
  uploadId: string;
  user: User;
  userName: string;
  private uploadsSub: Subscription;

  constructor(public uploadService: UploadService, public userService: UserService,private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
    /**
     * get the video id from url
     */
    route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.uploadId = paramMap.get('id');
        //get a certain upload video by uploadId
        this.uploadService.getUpload(this.uploadId).toPromise().then(uploadData => {
          this.upload = {
            id: uploadData._id,
            title: uploadData.title,
            content: uploadData.content,
            contentType: uploadData.contentType,
            mediaPath: uploadData.mediaPath,
            imagePath: null,
            userId: uploadData.userId,
            username: uploadData.username
          };
          //if the upload content tpye is youtube url, then replace youtube url some character
          if (this.upload.contentType === 'link') {
            this.upload.mediaPath = this.upload.mediaPath.replace('watch?v=', 'embed/');
            this.upload.mediaPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.upload.mediaPath);
          }
        });
      }
    })
  
    

}

  ngOnInit(): void {
      this.uploadsSub = this.uploadService.getUploadUpdateListener().subscribe();
  }

  ngOnDestroy(){
    this.uploadsSub.unsubscribe();
  }
}
