import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface Agent {
  id: string;
  name: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
}

export interface UserResponse {
  data: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getAgents(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(
      `${this.apiUrl}/users?role=agent`
    );
  }

  getUsers(role?: string): Observable<UsersResponse> {

    let url = `${this.apiUrl}/users`;

    if (role) {
      url += `?role=${role}`;
    }

    return this.http.get<UsersResponse>(url);
  }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.apiUrl}/users/${id}`
    );
  }
}
