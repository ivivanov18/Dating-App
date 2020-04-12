import {
    Resolve,
    ActivatedRoute,
    Router,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    /**
     *
     */
    constructor(
        private router: Router,
        private alertify: AlertifyService,
        private userService: UserService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        console.log('resolver');
        return this.userService.getUsers().pipe(
            catchError((error) => {
                this.alertify.error('Problem fetching data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
