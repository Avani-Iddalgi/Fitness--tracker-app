
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Upload } from './upload.model';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Injectable({providedIn: 'root'})
export class UploadService{
    private uploads: Upload[] = [];
    private uploadsUpdated = new Subject<Upload[]>();

    constructor(private http: HttpClient, private router: Router){}

    //get upload for all the uploads in data
    getUploads(){
        // return [...this.uploads];
        this.http.get<{message: string, uploads: any}>('http://localhost:3030/fitness/upload')
        .pipe(
            map(uploadData => {
                return uploadData.uploads.map(upload => {
                  return {
                    title: upload.title,
                    content: upload.content,
                    contentType: upload.contentType,
                    id: upload._id,
                    mediaPath: upload.mediaPath,
                    usernmae: upload.usernmae
                  };
                });
              })
        )
        .subscribe(transformUploads =>{
            this.uploads = transformUploads;
            this.uploadsUpdated.next([...this.uploads]);
        });
    }

    //each time listene the update information


    getUploadsByUserId(userId: string) {
      this.http.get<{message: string, uploads: any}>(
        "http://localhost:3030/fitness/uploadByUser/" + userId)
        .pipe(
          map(uploadData => {
              return uploadData.uploads.map(upload => {
                return {
                  title: upload.title,
                  content: upload.content,
                  contentType: upload.contentType,
                  id: upload._id,
                  mediaPath: upload.mediaPath,
                  usernmae: upload.usernmae
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
    //get the new create information
    getUpload(id: string) {
        return this.http.get<{ _id: string; title: string; content: string, imagePath: string, mediaPath: string, contentType: string, userId: string, username: string }>(
          "http://localhost:3030/fitness/upload/" + id
        );
      }
      //create a new post include all video and user information 
    addUpload(title: string, content: string, contentType: string, image: File | null, media: File | null, link: string | null, userId: string, username: string){
        const uploadData = new FormData();
        uploadData.append('title', title);
        uploadData.append('content', content);
        uploadData.append('contentType', contentType);
        uploadData.append('userId', userId);
        uploadData.append('username', username);
        if (image){
          uploadData.append('image', image, title);
        }
        if (media){
          uploadData.append('media', media, title);
        }
        if (link){
          link = link.replace('watch?v=', 'embed/');
          console.log(link);
          uploadData.append('linkData', link);
        }
        this.http.post<{message: string; upload: Upload; uploadId: any, title: any, content: any, contentType: any, userId: string, username: string}>(
            'http://localhost:3030/fitness/upload',
            uploadData
            )
            .subscribe(responseData => {
              console.log(responseData)
                const upload: Upload = {
                    id: responseData.uploadId,
                    title: responseData.title,
                    content: responseData.content,
                    contentType: '',
                    mediaPath: null,
                    //linkData: null,
                    imagePath: null,
                    userId: responseData.userId,
                    username: responseData.username
                  };
                console.log('addUpload !important...')
                this.uploads.push(upload);
                console.log(upload);
                console.log(this.uploads);
                this.uploadsUpdated.next([...this.uploads]);
                this.router.navigate(['fitness/upload']);
            },err => {
              this.uploadsUpdated.next();
              this.router.navigate(['fitness/upload']);
            });
    }
    //update the old post and save new informatiuon in to database
    updateUpload(id: string, title: string, content: string, contentType: string, image: File | null, media: File | null, link: string | null, userId: string, username: string) {

      console.log(id + ' ' + title + ' ' + content + ' ' + contentType + ' ' + media + ' ');
        let uploadData: Upload | FormData;

        if (typeof media === 'object' || typeof image === 'object') {
            uploadData = new FormData();
            uploadData.append('id', userId);
            uploadData.append('title', title);
            uploadData.append('content', content);
            uploadData.append('contentType', contentType);

            if (image){
              uploadData.append('image', image, title);
            }
            if (media){
              console.log("what media?");
              uploadData.append('media', media, title);
            }
            if (link){
              uploadData.append('linkData', link);
            }
          } 
          else {
            if(contentType === 'link'){
            console.log("what hell?");
              uploadData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
                mediaPath: link, 
                //linkData: contentType === 'link'?? link ?? null,
                contentType: contentType,
                userId: userId,
                username: username
              };
            }else if(contentType === 'media'){
              console.log("what hell?");
              uploadData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
                mediaPath: media, 
                //linkData: contentType === 'link'?? link ?? null,
                contentType: contentType,
                userId: userId,
                username: username
              };
            }
          }
        //save the new update stuff from front page
        this.http
          .put("http://localhost:3030/fitness/upload/" + id, uploadData)
          .subscribe(response => {
            const updatedUploads = [...this.uploads];
            const oldUploadIndex = updatedUploads.findIndex(p => p.id === id);
            if(contentType === 'link'){
            const upload: Upload = {
              id: id,
              title: title,
              content: content,
              imagePath: image,
              mediaPath: link,
              contentType: contentType,
              userId: userId,
              username: username
              //linkData: null
              };
            
            updatedUploads[oldUploadIndex] = upload;
            this.uploads = updatedUploads;
            this.uploadsUpdated.next([...this.uploads]);
            //refresh page after each update
            this.router.navigate(["fitness/upload"]);
            }else if(contentType === 'media'){
              const upload: Upload = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
                mediaPath: media,
                contentType: contentType,
                userId: userId,
                username: username
                //linkData: null
                };
              
              updatedUploads[oldUploadIndex] = upload;
              this.uploads = updatedUploads;
              this.uploadsUpdated.next([...this.uploads]);
              //refresh page after each update
              this.router.navigate(["fitness/upload"]);
            }
          });
      }
      //delete the post 
      deleteUpload(uploadId: string) {
        this.http
          .delete("http://localhost:3030/fitness/upload/" + uploadId)
          .subscribe(() => {
            const updatedUploads = this.uploads.filter(upload => upload.id !== uploadId);
            this.uploads = updatedUploads;
            this.uploadsUpdated.next([...this.uploads]);
            this.router.navigate(['fitness/upload']);
          });
      }

}
