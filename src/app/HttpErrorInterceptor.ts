import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private static handleErrorAction = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    if (environment.production) {
      return throwError('Something bad happened; please try again later.');
    }
    else {
      return throwError(JSON.stringify(error));
    }
  };

  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(HttpErrorInterceptor.handleErrorAction));
  }
}
