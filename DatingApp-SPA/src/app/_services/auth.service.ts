import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
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
    photoUrl = new BehaviorSubject<string>('../../assets/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    constructor(private http: HttpClient) {}

    changeMemberPhoto(newPhotoUrl: string): void {
        this.photoUrl.next(newPhotoUrl);
    }

    login(user: User) {
        return this.http.post(this.baseUrl + 'login', user).pipe(
            map((response: any) => {
                const userCreated = response;
                if (userCreated && userCreated.token) {
                    localStorage.setItem('token', userCreated.token);
                    localStorage.setItem(
                        'user',
                        JSON.stringify(userCreated.user)
                    );
                    this.decodedToken = this.jwtHelperService.decodeToken(
                        userCreated.token
                    );
                    this.currentUser = userCreated.user;
                    this.changeMemberPhoto(userCreated.user.photoUrl);
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
