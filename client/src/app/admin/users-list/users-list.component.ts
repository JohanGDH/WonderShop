import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/userService/user.service';
import { AuthService } from 'src/app/core/services/authService/auth.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[]

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.listUsers().subscribe((response) => {
      this.users = response.users;
    });
  }

  deleteUser(id:string) {
    let token = this.authService.getToken()
    this.userService.deleteUser(id).subscribe(
    res => {
      if (res) {
        let index = this.users.findIndex((user) => user.id === id);
        this.users.splice(index, 1);
        this.users = [...this.users];
      }
    },
    error => {
      console.log(error)
    });
  }
}
