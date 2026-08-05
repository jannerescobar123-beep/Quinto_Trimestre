import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TicketService } from '../../../core/services/ticket.service';
import { Comment } from '../../../models/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Ticket,
  TicketDetailResponse
} from '../../../models/ticket.model';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  ticket?: Ticket;
  comments: Comment[] = [];

commentForm: FormGroup;

  loading = false;

  error = '';

  constructor(
  private route: ActivatedRoute,
  private ticketService: TicketService,
  private fb: FormBuilder
) {

  this.commentForm = this.fb.group({

    body: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ]

  });

}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadTicket(id);
    }

  }

  loadTicket(id: string): void {

    this.loading = true;

    this.ticketService.getTicketById(id).subscribe({

      next: (response: TicketDetailResponse) => {

        this.ticket = response.data;
        this.loadComments(id);

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.error = 'No fue posible cargar el ticket.';

        this.loading = false;

      }

    });

  }

  loadComments(ticketId: string): void {

  this.ticketService.getComments(ticketId).subscribe({

    next: response => {

      this.comments = response.data;

    },

    error: error => {

      console.error(error);

    }

  });

}

}