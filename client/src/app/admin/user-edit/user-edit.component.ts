import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/authService/auth.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.fetchUsernames();
      this.userService.getUser(this.id).subscribe((response) => {
        
        const user: User = response.user;
        this.usernames = this.usernames.filter((item) => !user.username.toLocaleLowerCase().includes(item));
            
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
      actualPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  saveUser(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      let user: any = this.form.value;

      this.authService.login({ username: user.username, password: user.actualPassword })
        .subscribe((data) => {
          const responseUser = data.user.username;
          const currentUser = this.authService.getCurrentUser().username;
          
          this.userService
            .updateUser(this.id, {
              username: user.username,
              name: user.name,
              password: user.newPassword,
            })
            .subscribe(
              (updateUser) => {
                if (currentUser == responseUser) {
                  this.authService.logout();
                  alert(`Vuelva a iniciar sesión :D 
                Su nueva contraseña es: ${user.newPassword}`);
                  return;
                }

                this.router.navigate(['./admin/']);
                console.log(updateUser);
              },
              (error) => {
                console.log(error)
              }
            );
        });
    }
  }

  get Username() {
    return this.form.get('username');
  }
}
