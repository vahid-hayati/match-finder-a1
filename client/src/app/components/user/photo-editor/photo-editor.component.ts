import { Component, inject, Input, OnInit } from '@angular/core';
import { Member } from '../../../models/member.model';
import { LoggedIn } from '../../../models/logged-in.model';
import { environment } from '../../../../environments/environment.development';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Photo } from '../../../models/photo.model';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, FileUploadModule, MatButtonModule
  ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent implements OnInit {
  @Input('memberInput') member: Member | undefined; // from user-edit
  loggedInUser: LoggedIn | null | undefined;
  // errorGlob: string | undefined;
  apiUrl: string = environment.apiUrl;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  private accountService = inject(AccountService);
  // private userService = inject(UserService);
  // private snackBar = inject(MatSnackBar);

  constructor() {
    this.loggedInUser = this.accountService.loggedInUserSig();
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event: boolean): void {
    this.hasBaseDropZoneOver = event;
  }

  initializeUploader(): void {
    if (this.loggedInUser) {
      this.uploader = new FileUploader({
        url: this.apiUrl + 'api/user/add-photo',
        authToken: 'Bearer ' + this.loggedInUser.token,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 4_000_000, // bytes / 4MB
      });

      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      }

       this.uploader.onSuccessItem = (item, response) => {
        if (response) {
          const photo: Photo = JSON.parse(response);
          this.member?.photos.push(photo);          
        }
      }
    }
  }
}
