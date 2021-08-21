import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/productService/product.service.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.listProducts().subscribe((response) => {
      this.products = response.products;
    });
  }

  deleteProduct(name: string) {
    this.productService.deleteProduct(name).subscribe((res) => {
      console.log(res);

      if (res) {
        let index = this.products.findIndex((product) => product.name === name);
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }
}
