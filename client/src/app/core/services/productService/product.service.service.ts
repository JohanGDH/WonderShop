import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../../models/product.model';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:6969/API';
  }

  testService() {
    return 'Probando el ProductService';
  }

  listProducts(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/products', { headers });
  }

  getProduct(name: string): Observable<any> {
    return this.http
      .get<Product>(this.url + `/products/${name}`)
      .pipe(catchError(this.handleError));
  }

  saveProduct(product: Product) {
    return this.http
      .post(this.url + '/save', product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(name: string, changes: Partial<Product>) {
    return this.http
      .put(this.url + `/update/${name}`, changes)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(name: string) {
    return this.http
      .delete(`${this.url}/delete/${name}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Ups algo salio mal' + error);
  }
}
