import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpErrorResponse,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log('in interceptor');

        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const applicationError = error.headers.get(
                        'Application-Error'
                    );
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modalStateErrors = '';
                    if (
                        serverError.errors &&
                        typeof serverError.errors === 'object'
                    ) {
                        const { errors } = serverError;
                        for (const key in Object.keys(errors)) {
                            if (errors.hasOwnProperty(key)) {
                                modalStateErrors +=
                                    serverError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(
                        modalStateErrors || serverError || 'Server error'
                    );
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: ErrorInterceptor,
};
