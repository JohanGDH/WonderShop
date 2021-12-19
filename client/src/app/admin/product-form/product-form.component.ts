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
    filePath: string;
    file: File;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            stock: ['', Validators.required],
            image: [null],
            features: this.formBuilder.array([]),
        });
    }

    saveProduct(event: Event) {
        event.preventDefault();

        let formv = this.form.value;
        let features = {};

        if (formv.features) {
            formv.features.map((feature: any) => {
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

            this.productService.saveProduct(product)
            .subscribe(
                (newProduct:any) => {
                    const ProductStored = newProduct.Producto;                    
                    this.productService.uploadImage(ProductStored.id, this.file)
                        .subscribe(
                            data => {
                                console.log(data);
                                this.router.navigate(['./admin/']);
                            },
                            error => {
                                console.error(error)
                                window.location.reload();
                            }
                        );
                },
                error => {
						console.error(error);
						window.location.reload();
					});
        };
    }

    get features(): FormArray {
        return this.form.get('features') as FormArray;
    }

    addFeature() {
        const feature = this.formBuilder.group({
            featureName: ['', Validators.required],
            featureValue: ['', Validators.required],
        });

        this.features.push(feature);
    }

    removeFeature(i: number) {
        this.features.removeAt(i);
    }

    imagePreview(e: Event) {

        this.file = (e.target as HTMLInputElement).files[0];

        this.form.patchValue({
            img: this.file,
        });
        this.form.get('image').updateValueAndValidity();

        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
            this.filePath = reader.result as string;
        };

    }
}
