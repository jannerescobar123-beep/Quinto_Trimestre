import { Component, OnInit } from '@angular/core';

import {
  UserService,
  User
} from '../../../core/services/user.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  users: User[] = [];

  loading = false;
  error = '';

  selectedRole = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.loading = true;
    this.error = '';

    this.userService
      .getUsers(this.selectedRole)
      .subscribe({

        next: (response) => {

          this.users = response.data;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.error =
            'No fue posible cargar los usuarios.';

          this.loading = false;

        }

      });

  }

  filterUsers(): void {
    this.loadUsers();
  }

  getRoleLabel(role: string): string {

    switch (role) {

      case 'admin':
        return 'Administrador';

      case 'agent':
        return 'Agente';

      case 'client':
        return 'Cliente';

      default:
        return role;

    }

  }

}
