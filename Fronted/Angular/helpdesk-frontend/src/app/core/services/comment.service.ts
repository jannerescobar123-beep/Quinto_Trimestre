import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  CommentResponse,
  CreateCommentRequest,
  Comment
} from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getComments(ticketId: string): Observable<CommentResponse> {

    return this.http.get<CommentResponse>(
      `${this.apiUrl}/tickets/${ticketId}/comments`
    );

  }

  createComment(
    ticketId: string,
    body: CreateCommentRequest
  ): Observable<Comment> {

    return this.http.post<Comment>(
      `${this.apiUrl}/tickets/${ticketId}/comments`,
      body
    );

  }

}
