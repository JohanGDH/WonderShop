import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../../models/product.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:6969/API';
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
      .post(this.url + '/products', product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(name: string, changes: Partial<Product>) {

    return this.http
      .put(this.url + `/products/${name}`, changes)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(name: string) {

    return this.http
      .delete(`${this.url}/products/${name}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Ups algo salio mal ' + error.name + ' ' + error.message);
  }
}
