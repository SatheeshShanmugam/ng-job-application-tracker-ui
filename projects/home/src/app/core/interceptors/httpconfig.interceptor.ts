import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { GlobalErrorHandlerService } from "../../shared/services/error-handler.service";

//GlobalHttpInterceptorService is used to intercept all HTTP requests and responses in the application. 
// It is used to handle errors globally and log them using the GlobalErrorHandlerService.
// It implements the HttpInterceptor interface and uses the intercept method to handle HTTP requests and responses. 
// The intercept method takes in a HttpRequest and a HttpHandler and returns an Observable of HttpEvent.
//  It uses the catchError operator to catch any errors that occur during the HTTP request and handle them using the GlobalErrorHandlerService.
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(private errorHandler : GlobalErrorHandlerService   
  ) { }    

  intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {

    const modifiedRequest = req.clone({      
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError(error => {
        console.error("error is intercept", error);
        //Handle Error  
        throw this.errorHandler.handleError(error);         
        })       
    )
  }  
}
    


  


export const GlobalHttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true }
];