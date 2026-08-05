import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  Ticket,
  TicketResponse,
  TicketDetailResponse
} from '../../models/ticket.model';

import {
  CommentResponse,
  CreateCommentRequest
} from '../../models/comment.model';

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
  'https://sla-api.areasoftccyt.com/api/tickets',
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }
);

  }

  getTicketById(id: string): Observable<TicketDetailResponse> {

    return this.http.get<TicketDetailResponse>(
      `${this.apiUrl}/tickets/${id}`
    );

  }

  getComments(ticketId: string): Observable<CommentResponse> {

  return this.http.get<CommentResponse>(
    `${this.apiUrl}/tickets/${ticketId}/comments`
  );

}

addComment(
  ticketId: string,
  comment: CreateCommentRequest
): Observable<any> {

  return this.http.post(
    `${this.apiUrl}/tickets/${ticketId}/comments`,
    comment
  );

}

}