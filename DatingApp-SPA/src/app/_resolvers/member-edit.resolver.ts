import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(
        private router: Router,
        private alertify: AlertifyService,
        private userService: UserService,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        console.log(this.authService.decodedToken.nameid);
        return this.userService
            .getUser(this.authService.decodedToken.nameid)
            .pipe(
                catchError((error) => {
                    this.alertify.error('Problem fetching data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
    }
}
