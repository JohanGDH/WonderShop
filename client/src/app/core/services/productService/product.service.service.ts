import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url: string;

  constructor(
    private http: HttpClient,
  ) {
    this.url = 'http://localhost:6969/API';
  }

  testService() {
    return 'Probando el ProductService'
  }

  listProducts(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/products', {headers});
  }

}
