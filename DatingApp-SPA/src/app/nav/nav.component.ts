import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    model: any = {};

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    login() {
        this.authService.login(this.model).subscribe(
            next => console.log({ next }),
            error => console.log('error while loggin', error)
        );
    }

    logout() {
        localStorage.removeItem('token');
        console.log('clicked');
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    }
}
