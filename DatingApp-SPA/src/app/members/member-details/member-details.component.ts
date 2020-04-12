import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    NgxGalleryOptions,
    NgxGalleryImage,
    NgxGalleryAnimation,
} from 'ngx-gallery';
import { User } from 'src/app/_models/user';

@Component({
    selector: 'app-member-details',
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
    user: User;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.user = data.user;
        });
        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: false,
            },
        ];

        this.galleryImages = this.getImages();
    }

    getImages(): object[] {
        const images = [];
        for (const photo of this.user.photos) {
            images.push({
                small: photo.url,
                medium: photo.url,
                big: photo.url,
            });
        }
        return images;
    }
}
