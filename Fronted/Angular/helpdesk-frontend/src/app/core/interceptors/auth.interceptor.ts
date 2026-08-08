import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.authService.getAccessToken();

    if (token) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    }

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

        if (
          error.status === 401 &&
          error.error?.error?.code === 'TOKEN_EXPIRED'
        ) {

          return this.authService.refreshToken().pipe(

            switchMap(response => {

              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              });

              return next.handle(newRequest);

            }),

            catchError(refreshError => {

              localStorage.clear();

              window.location.href = '/login';

              return throwError(() => refreshError);

            })

          );

        }

        return throwError(() => error);

      })

    );

  }

}
