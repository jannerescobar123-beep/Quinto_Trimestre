import { Component, OnInit } from '@angular/core';

import { TicketService } from '../../../core/services/ticket.service';
import {
  Ticket,
  TicketResponse
} from '../../../models/ticket.model';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  tickets: Ticket[] = [];

  loading = false;

  error = '';

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {

    this.loading = true;

    this.ticketService.getTickets().subscribe({

      next: (response: TicketResponse) => {

        this.tickets = response.data;

        console.log(response);

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.error = 'No fue posible cargar los tickets.';

        this.loading = false;

      }

    });

  }

}