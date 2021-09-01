import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from '../../core/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  User: Partial<User>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  login(event: Event) {
    event.preventDefault();
    console.log(this.form.valid);
    if (this.form.valid) {
      const formV = this.form.value;
      console.log(formV.username, formV.password);
      
      try {
        
        this.authService.login({ username: formV.username, password: formV.password}).subscribe(
          data => {
            this.router.navigate(['/admin']);
            console.log(data);
          },
          error => console.log(error)            
        )        
      } catch (error) {
        console.log(error)
      }
              
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: [, [Validators.required, Validators.minLength(2)]],
      password: [, [Validators.required, Validators.minLength(2)]],
    });
  }
}
