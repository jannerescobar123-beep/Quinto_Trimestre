import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  TicketResponse,
  TicketDetailResponse
} from '../../models/ticket.model';

import {
  CommentResponse,
  CreateCommentRequest
} from '../../models/comment.model';




export interface AssignTicketRequest {
  agentId: string;
}

export interface AssignTicketResponse {
  data: {
    id: string;
    assignedTo: string;
    status: string;
  };
  message: string;
}




export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
}


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



  getTicketById(
    id: string
  ): Observable<TicketDetailResponse> {

    return this.http.get<TicketDetailResponse>(
      `${this.apiUrl}/tickets/${id}`
    );

  }




  getComments(
    ticketId: string
  ): Observable<CommentResponse> {

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




  updateTicket(
    ticketId: string,
    data: UpdateTicketRequest
  ): Observable<TicketDetailResponse> {

    return this.http.patch<TicketDetailResponse>(
      `${this.apiUrl}/tickets/${ticketId}`,
      data
    );

  }




  assignTicket(
    ticketId: string,
    agentId: string
  ): Observable<AssignTicketResponse> {

    return this.http.post<AssignTicketResponse>(
      `${this.apiUrl}/tickets/${ticketId}/assign`,
      {
        agentId: agentId
      }
    );

  }

}
