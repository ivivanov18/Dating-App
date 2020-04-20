import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
    @Output() setPhotoUrl = new EventEmitter();
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    currentMain: Photo;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private alertify: AlertifyService
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

    setMainPhoto(photo: Photo) {
        this.userService
            .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
            .subscribe(
                (next) => {
                    this.currentMain = this.photos.filter(
                        (p) => p.isMain === true
                    )[0];
                    this.currentMain.isMain = false;
                    photo.isMain = true;
                    this.setPhotoUrl.emit(photo.url);
                    this.authService.changeMemberPhoto(photo.url);
                    const { currentUser } = this.authService;
                    currentUser.photoUrl = photo.url;
                    localStorage.setItem('user', JSON.stringify(currentUser));
                },
                (error) => {
                    this.alertify.error(error);
                }
            );
    }
}
