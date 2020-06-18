import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
    @Input() member: User;
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private alertify: AlertifyService
    ) {}

    ngOnInit() {}

    sendLike(recipientId: number) {
        this.userService
            .sendLike(this.authService.decodedToken.nameid, recipientId)
            .subscribe(
                (data) => {
                    this.alertify.success(
                        `You have liked the user known as: ${this.member.knownAs}`
                    );
                },
                (error) => this.alertify.error(error)
            );
    }
}
