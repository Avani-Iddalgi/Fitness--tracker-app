import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Video } from 'src/app/video-library/video.model';

import { Upload } from 'src/app//uploads/upload.model';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Injectable({providedIn: 'root'})
export class VideoService{
    private uploads: Upload[] = [];
    private uploadsUpdated = new Subject<Upload[]>();

    constructor(private http: HttpClient, private router: Router){}

    getUploads(){
        // return [...this.uploads];
        this.http.get<{message: string, uploads: any}>('http://localhost:3030/fitness/video_library')
        .pipe(
            map(uploadData => {
                return uploadData.uploads.map(upload => {
                  return {
                    title: upload.title,
                    content: upload.content,
                    contentType: upload.contentType,
                    id: upload._id,
                    mediaPath: upload.mediaPath,
                    userId: upload.userId
                  };
                });
              })
        )
        .subscribe(transformUploads =>{
            this.uploads = transformUploads;
            this.uploadsUpdated.next([...this.uploads]);
        });
    }

    

    getUploadUpdateListener(){
        return this.uploadsUpdated.asObservable();
    }
}