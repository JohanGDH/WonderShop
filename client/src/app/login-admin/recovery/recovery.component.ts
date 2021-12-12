import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css'],
})
export class RecoveryComponent implements OnInit {

  RecoveryToken: string;
  form: FormGroup

  constructor(
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params)=> {
      this.RecoveryToken = params.token;
    })

    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if(!this.form.valid) return

    let formV = this.form.value;

    this.authService
      .changePassword(formV.newPassword, this.RecoveryToken)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert('Se ha producido un error, inténtelo más tarde!');
          console.log(error);
        }
      );

  }


}
