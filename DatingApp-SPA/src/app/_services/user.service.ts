import { PaginatedResult } from './../_models/pagination';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

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

    getUsers(
        page?: number,
        itemsPerPage?: number,
        userParams?
    ): Observable<PaginatedResult<User[]>> {
        const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
            User[]
        >();

        let params = new HttpParams();

        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }

        if (userParams != null) {
            params = params.append('minAge', userParams.minAge);
            params = params.append('maxAge', userParams.maxAge);
            params = params.append('gender', userParams.gender);
            params = params.append('orderBy', userParams.orderBy);
        }

        return this.httpClient
            .get<User[]>(this.baseUrl + 'users', {
                observe: 'response',
                params,
            })
            .pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(
                            response.headers.get('Pagination')
                        );
                    }
                    return paginatedResult;
                })
            );
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
