import { Component, OnInit, OnDestroy, Sanitizer } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import { VideoService } from 'src/app/video-library/video.service';
import {Router} from '@angular/router';
import { Upload } from 'src/app/uploads/upload.model';
import { ThrowStmt } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss']
})
export class VideoLibraryComponent implements OnInit, OnDestroy {

  uploads: Upload[] = [];
  private uploadsSub: Subscription;
 
  constructor(public videosService: VideoService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    //read the video and get authenticate from youtube
    this.videosService.getUploads();
    this.uploadsSub = this.videosService.getUploadUpdateListener()
      .subscribe((uploads : Upload[]) => {
          this.uploads = uploads;
          this.uploads.forEach(upload => {
            if (upload.contentType === 'link') {
              upload.mediaPath = upload.mediaPath.replace('watch?v=', 'embed/');
              upload.mediaPath = this.sanitizer.bypassSecurityTrustResourceUrl(upload.mediaPath);
            }
          });
      });
    }

    handleclick(id:string){
    
      this.router.navigate(["/fitness/video_detail/" + id]);
  
    }
      ngOnDestroy(){
        this.uploadsSub.unsubscribe();
      }
}
