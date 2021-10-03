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
	filePath: string;
	file: File;
	product: Product

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
				this.product = response.product[0];
				this.form.patchValue({
					name: this.product.name,
					price: this.product.price,
					stock: this.product.stock,
				});
				if(this.product.features) this.addFeature(this.product.features);
			});
		});
	}

	buildForm() {
		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			price: ['', Validators.required],
			stock: ['', Validators.required],
			image: [null,],
			features: this.formBuilder.array([]),
		});
	}

	saveProduct(event: Event) {

		event.preventDefault();

		let formv = this.form.value;
		let features: any;
		this.featuresForm ? features = {}: features = this.featuresForm;


		formv.features.map((feature: any) => {
			Object.defineProperty(features, feature.featureName, {
				value: feature.featureValue,
				writable: true,
				enumerable: true,
				configurable: true,
			});
		});

		if (this.form.valid) {
			let product: Product = formv;

			product.features = features;
			console.log(formv.features, formv.features.length);

			this.productService.updateProduct(this.name, product)
				.subscribe(
					(newProduct:any) => {
						const ProductStored = newProduct.Producto;

						if(this.file) {console.log(this.file); this.productService.uploadImage(ProductStored.id, this.file)
							.subscribe(
								(data) => {
									console.log(data);
									this.router.navigate(['./admin/']);
								},
								(error) => {
									console.error(error);
									window.location.reload();
								}
							)}
						else this.router.navigate(['./admin/']);
					},
					error => {
						console.error(error);
						window.location.reload();
					});
		};
	}

	get featuresForm(): FormArray {
		return this.form.get('features') as FormArray;
	}

	addFeature(prefeatures?: any) {
		if (prefeatures) {
			for (const key in prefeatures) {
				const feature = this.formBuilder.group({
					featureName: [key, Validators.required],
					featureValue: [prefeatures[key], Validators.required],
				});

				this.featuresForm.push(feature);
			}
			return;
		}

		const feature = this.formBuilder.group({
			featureName: ['', Validators.required],
			featureValue: ['', Validators.required],
		});

		let div: HTMLElement = document.querySelector('#noFeatures');
    		div.style.display = 'none';
		this.featuresForm.push(feature);
	}

	removeFeature(i: number) {
		this.featuresForm.removeAt(i);

		if(this.featuresForm.controls.length == 0) {
			let div: HTMLElement = document.querySelector('#noFeatures');
			div.style.display = 'block';
		}
	}

	imagePreview(e: Event) {

		this.file = (e.target as HTMLInputElement).files[0];
		if (!this.file) return;

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
