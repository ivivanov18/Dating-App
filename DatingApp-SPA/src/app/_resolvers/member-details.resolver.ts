import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';

@Injectable()
export class MemberDetailsResolver implements Resolve<User> {
    constructor(
        private router: Router,
        private alertify: AlertifyService,
        private userService: UserService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params.id).pipe(
            catchError((error) => {
                this.alertify.error('Problem fetching data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
