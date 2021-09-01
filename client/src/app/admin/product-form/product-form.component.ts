import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from '../../core/services/productService/product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.buildForm();
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
        console.log(formv.features);
        if(formv.features) {
            formv.features.map((feature:any) => {
                Object.defineProperty(features, feature.featureName, {
                    value: feature.featureValue,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
        
            });
        }    
        if (this.form.valid) {
            let product: Product = this.form.value;
            product.features = features;
            console.log(product);
            this.productService.saveProduct(product).subscribe((newProduct) => {
                this.router.navigate(['./admin/']);
                console.log(newProduct);
            });
        }
    }

    get features(): FormArray {
        return this.form.get('features') as FormArray;
    }

    addFeature() {
        const feature = this.formBuilder.group({
            featureName:['', Validators.required],
            featureValue: ['', Validators.required]
        });

        this.features.push(feature);
    }

    removeFeature(i: number) {
        this.features.removeAt(i);
    }

}
