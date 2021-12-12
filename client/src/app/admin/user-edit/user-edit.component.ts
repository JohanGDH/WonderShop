import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { ClientService } from 'src/app/core/services/clientService/client-service.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { includes } from 'src/app/shared/validators/username.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  usernames: string[] = [];
  form: FormGroup;
  id: string;
  form2: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.form2 = this.formBuilder.group({
      email: ['', [Validators.required]],
    });

    this.activedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.fetchUsernames();
      this.userService.getUser(this.id).subscribe((response) => {
        const user: User = response.user;
        this.usernames = this.usernames.filter(
          (item) => !user.username.toLocaleLowerCase().includes(item)
        );

        this.buildForm();
        this.form.patchValue({
          username: user.username,
          name: user.name,
          actualPassword: 'Ingrese la contraseña actual',
        });
      });
    });
  }

  fetchUsernames() {
    this.userService.listUsers().subscribe((response) => {
      let users: User[] = response.users;
      users.map((user) =>
        this.usernames.push(user.username.toLocaleLowerCase())
      );
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, includes(this.usernames)]],
      name: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  sendRecoveryEmail(event: Event) {
    event.preventDefault();

    if (this.form2.valid) {
      let email: string = this.form2.value;

      this.clientService.sendRecoveryEmail(email).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(`Se ha producido un error. Inténtelo más tarde`);
        }
      );
    }
  }

  saveUser(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      let userEdit: any = this.form.value;
      let currentRolUser = this.authService.getCurrentUser().role;

      if (currentRolUser != 'Administrador') return this.authService.logout();

      this.userService
        .updateUser(this.id, {
          username: userEdit.username,
          name: userEdit.name,
          password: userEdit.newPassword,
        })
        .subscribe(
          (updateUser) => {
            alert(
              `La contraseña del usuario ${userEdit.username} cambio a ${userEdit.newPassword}`
            );
            this.router.navigate(['./admin/']);
          },
          (error) => {
            console.log(error);
            alert(`Se ha producido un error. Inténtelo más tarde`);
          }
        );
    }
  }

  get Username() {
    return this.form.get('username');
  }
}
