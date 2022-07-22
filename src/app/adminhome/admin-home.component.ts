import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../utills/api';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

// export interface PeriodicElement {
//   full_name: string;
//   email: string;
//   mobile: string;
// }

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  hide = true;
  dataSource: any;  
  userData: any;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  userId = 0;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    filename: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  });
  

  options = this.formBuilder.group({
    email: '',
    password: '',
    name: '',
    mobile: ''
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _api: ApiService,
    private http: HttpClient,
    private uploadService: FileUploadService
  ) { }

  fileInfos?: Observable<any>;

  get f(){
    return this.form.controls;
  }

  // loginForm = this.formBuilder.group({
  //   userid: '',
  //   file: ''
  // });

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    this._api.getTypeRequest('admin/users/').subscribe((res: any) => {
      this.dataSource = res;
    
      let u = [];
      for(let user of res) {
        u.push({
          value: user.id, viewValue: user.full_name
        })
      }
    
      this.userData = u;

    });

    // this.form ;
  }



  displayedColumns: string[] = ['full_name', 'email', 'mobile'];

  getFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
    }
  }

  getUser(event: any) {
    this.userId = event.value;
  }
  upload(): void {
    

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0)  ;

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, this.userId).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }








  makeRequest(url: string, form: any, settings: any = { toast: true, hideLoader: false }) {

    // let formData = form;
    const uploadData = new FormData(); // Create Form Data object to upload the file in POST FORM

    for (let i in form) {
      if (form[i] instanceof Blob){  //  Check if key value is file
        uploadData.append(i, form[i], form[i].name ? form[i].name : "");
      }
      else
        uploadData.append(i, form[i]);
    }
    
    return this.http.post(url, uploadData)
      .pipe(map((data: any) => {
        //handle api 200 response code here or you wanted to manipulate to response
        return data;
      })
        ,
        catchError((error) => {    // handle error
        
          if (error.status == 404) {
            //Handle Response code here
          }
          return throwError(error);
        })
      );

  }

  submit() {

    this.upload();
    
  }



  onOptionSubmit() {
    let resulta: any;
    console.log(this.options.value);
    if (this.options.valid) {
      this._api.postTypeRequest('admin/createuser/', this.options.value).subscribe((res: any) => {
     
        this.options = this.formBuilder.group({
          email: '',
          password: '',
          name: '',
          mobile: ''
        });

        this._api.getTypeRequest('admin/users/').subscribe((res: any) => {
          this.dataSource = res;
        
          let u = [];
          for(let user of res) {
            u.push({
              value: user.id, viewValue: user.full_name
            })
          }
        
          this.userData = u;
    
        });

      })
     
    }

  }

  onClickLogout() {
    console.log("assd");
    localStorage.removeItem('userData');
    localStorage.removeItem('authtoken');
    localStorage.removeItem('usertype');
    this.router.navigate(['/']);
  }

}
