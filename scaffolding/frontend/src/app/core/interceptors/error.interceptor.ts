import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 401) {
                // Since we can't inject the UserService and call logout() [because of circular dependencies]
                // we are just removing the localStorage items and hope that the userService will refresh soon enough.
                // There is maybe a better solution for this but for now this will work just fine.
                localStorage.removeItem('userToken');
                localStorage.removeItem('expiresAt');
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
