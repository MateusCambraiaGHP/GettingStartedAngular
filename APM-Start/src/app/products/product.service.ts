import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productUrl: string = 'api/products/products.json'

    constructor(private http: HttpClient){ }
    
    getProduct(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All:', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMensage= '';
        if(err.error instanceof ErrorEvent){
            errorMensage = `an error occurred: ${err.error.message}`
        }else{
            errorMensage = `Server returned code: ${err.status}, error message is: ${err.message}`
        }
        return throwError(()=> errorMensage)
    }

}