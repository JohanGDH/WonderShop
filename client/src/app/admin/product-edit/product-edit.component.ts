import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from '../../core/services/productService/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})

export class ProductEditComponent implements OnInit {
  form: FormGroup;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      this.name = params.id;

      this.productService.getProduct(this.name).subscribe((response) => {
        const product = response.product[0]
        this.form.patchValue({
          name: product.name,
          price: product.price,
          stock: product.stock,
        });

        this.addFeature(product.features);

      });
    });

  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      features: this.formBuilder.array([]),
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    let formv = this.form.value;
    let features = {};
    formv.features.map((feature: any) => {
      Object.defineProperty(features, feature.featureName, {
        value: feature.featureValue,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });
    if (this.form.valid) {
      let product: Product = this.form.value;
      product.features = features;
      this.productService.updateProduct(this.name, product).subscribe((newProduct) => {
        this.router.navigate(['./admin/']);
      });
    }
  }

  get featuresForm(): FormArray {
    return this.form.get('features') as FormArray;
  }

  addFeature(prefeatures?: any) {
    if(prefeatures) {
      for (const key in prefeatures) {
        const feature = this.formBuilder.group({
          featureName: [key, Validators.required],
          featureValue: [prefeatures[key], Validators.required],
        });

        this.featuresForm.push(feature);
      }
      return
    }

    const feature = this.formBuilder.group({
      featureName: ['', Validators.required],
      featureValue: ['', Validators.required],
    });

    this.featuresForm.push(feature);
  }

  removeFeature(i: number) {
      this.featuresForm.removeAt(i);
  }
}
