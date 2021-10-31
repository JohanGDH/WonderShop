import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../core/models/session.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/userService/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  saveUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      let user: User = this.form.value;
      
      if (user) {
        this.userService.saveUser(user).subscribe(
          (data) => {
            let userD = JSON.stringify(data);
            alert(`El usuario ${userD} ha sido creado!`);
            this.form.reset();
          },
          (error) => {
            console.log(error.statusText);
            this.form.reset();
          }
        );
      }
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
