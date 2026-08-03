import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { TicketResponse } from '../../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTickets(): Observable<TicketResponse> {

    return this.http.get<TicketResponse>(
      `${this.apiUrl}/tickets`
    );

  }

}