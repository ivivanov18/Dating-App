import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    jwtHelperService = new JwtHelperService();
    decodedToken: any;
    currentUser: User;

    constructor(private http: HttpClient) {}

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model).pipe(
            map((response: any) => {
                const user = response;
                if (user && user.token) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('user', JSON.stringify(user.user));
                    this.decodedToken = this.jwtHelperService.decodeToken(
                        user.token
                    );
                    this.currentUser = user.user;
                    console.log(this.currentUser);
                }
            })
        );
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelperService.isTokenExpired(token);
    }

    register(model: any) {
        return this.http.post(this.baseUrl + 'register', model);
    }
}
