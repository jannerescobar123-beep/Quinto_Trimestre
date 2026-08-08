import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  searchText = '';
  selectedStatus = '';
  selectedPriority = '';

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {

    this.loading = true;
    this.error = '';

    this.ticketService.getTickets().subscribe({

      next: (response: TicketResponse) => {

        this.tickets = response.data;

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.error =
          'No fue posible cargar los tickets.';

        this.loading = false;

      }

    });

  }

  viewTicket(id: string): void {

    this.router.navigate([
      '/dashboard',
      'tickets',
      'detail',
      id
    ]);

  }

  getStatusLabel(status: string): string {

    switch (status) {

      case 'open':
        return 'Abierto';

      case 'in_progress':
        return 'En progreso';

      case 'resolved':
        return 'Resuelto';

      case 'closed':
        return 'Cerrado';

      default:
        return status;

    }

  }

  getPriorityLabel(priority: string): string {

    switch (priority) {

      case 'low':
        return 'Baja';

      case 'medium':
        return 'Media';

      case 'high':
        return 'Alta';

      case 'urgent':
        return 'Urgente';

      default:
        return priority;

    }

  }

  filteredTickets(): Ticket[] {

    return this.tickets.filter(ticket => {

      const matchesSearch =
        ticket.title
          .toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          );

      const matchesStatus =
        !this.selectedStatus ||
        ticket.status === this.selectedStatus;

      const matchesPriority =
        !this.selectedPriority ||
        ticket.priority === this.selectedPriority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );

    });

  }

}
