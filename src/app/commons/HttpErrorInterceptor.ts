import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private static handleErrorAction<T extends Observable<any>>(error: HttpErrorResponse, caught: T) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const observable = next.handle(request)
                           .pipe(catchError(HttpErrorInterceptor.handleErrorAction));
    if (!environment.production) {
      observable.subscribe((result: HttpResponse<any>) =>
        console.log('[Request]', request.method, request.url, 'returned', result.body, result),
      );
    }
    return observable;
  }
}