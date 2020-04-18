import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { environment } from './../../../environments/environment';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';

const URL = 'path_to_api';

@Component({
    selector: 'app-photo-edit',
    templateUrl: './photo-edit.component.html',
    styleUrls: ['./photo-edit.component.css'],
})
export class PhotoEditComponent implements OnInit {
    @Input() photos: Photo[];
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.initFileUploader();
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public initFileUploader(): void {
        this.uploader = new FileUploader({
            url:
                environment.apiUrl +
                'users/' +
                this.authService.decodedToken.nameid +
                '/photos',
            authToken: `Bearer ${localStorage.getItem('token')}`,
            isHTML5: true,
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024,
        });

        this.uploader.onAfterAddingFile = (file) =>
            (file.withCredentials = false);

        this.uploader.onSuccessItem = (item, response, status, header) => {
            if (response) {
                const res: Photo = JSON.parse(response);
                this.photos.push(res);
            }
        };
    }
}
