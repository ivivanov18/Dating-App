import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// const httpOptions = {
//     headers: new HttpHeaders({
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//     }),
// };

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl + 'users');
    }

    getUser(id): Observable<User> {
        return this.httpClient.get<User>(this.baseUrl + 'users/' + id);
    }

    updateUser(id, user: User) {
        return this.httpClient.put(this.baseUrl + 'users/' + id, user);
    }

    setMainPhoto(userId, photoId) {
        return this.httpClient.post(
            this.baseUrl +
                'users/' +
                userId +
                '/photos/' +
                photoId +
                '/setMain',
            null
        );
    }

    deletePhoto(userId, photoId) {
        return this.httpClient.delete(
            this.baseUrl + 'users/' + userId + '/photos/' + photoId
        );
    }
}
