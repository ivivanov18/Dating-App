import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    jwtHelperService = new JwtHelperService();
    decodedToken: any;

    constructor(private http: HttpClient) {}

    login(model: any) {
        console.log({ model });
        return this.http.post(this.baseUrl + 'login', model).pipe(
            map((response: any) => {
                const user = response;
                if (user && user.token) {
                    localStorage.setItem('token', user.token);
                    this.decodedToken = this.jwtHelperService.decodeToken(
                        user.token
                    );
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
