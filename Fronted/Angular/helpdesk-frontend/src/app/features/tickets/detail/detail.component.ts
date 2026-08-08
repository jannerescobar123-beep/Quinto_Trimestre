import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TicketService } from '../../../core/services/ticket.service';

import {
  Ticket,
  TicketStatus
} from '../../../models/ticket.model';

import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../models/comment.model';

import {
  UserService,
  Agent
} from '../../../core/services/user.service';


@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  ticket!: Ticket;

  comments: Comment[] = [];

  comment = '';

  loading = false;

  error = '';

  commentLoading = false;

  commentError = '';




  editing = false;

  saving = false;

  editError = '';

  editTitle = '';

  editDescription = '';

  editPriority = '';

  editStatus: TicketStatus = 'open';




  agents: Agent[] = [];

  selectedAgentId = '';

  assigning = false;

  assignError = '';

  assignMessage = '';


  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private commentService: CommentService,
    private userService: UserService
  ) {}




  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadTicket(id);
    }

  }





  loadTicket(id: string): void {

    this.loading = true;

    this.ticketService.getTicketById(id).subscribe({

      next: (response) => {

        this.ticket = response.data;

        this.loading = false;

        this.loadComments();

        this.loadAgents();

      },

      error: (error) => {

        console.error(
          'Error cargando ticket:',
          error
        );

        this.error =
          'No fue posible cargar el ticket.';

        this.loading = false;

      }

    });

  }




  loadComments(): void {

    if (!this.ticket) {
      return;
    }

    this.commentService
      .getComments(this.ticket.id)
      .subscribe({

        next: (response) => {

          this.comments = response.data;

        },

        error: (error) => {

          console.error(
            'Error cargando comentarios:',
            error
          );

        }

      });

  }




  addComment(): void {

    this.commentError = '';

    if (!this.comment.trim()) {

      this.commentError =
        'Escribe un comentario.';

      return;

    }

    if (!this.ticket) {
      return;
    }

    this.commentLoading = true;

    this.commentService
      .createComment(
        this.ticket.id,
        {
          body: this.comment.trim()
        }
      )
      .subscribe({

        next: () => {

          this.comment = '';

          this.commentLoading = false;

          this.loadComments();

        },

        error: (error) => {

          console.error(
            'Error agregando comentario:',
            error
          );

          this.commentError =
            'No fue posible agregar el comentario.';

          this.commentLoading = false;

        }

      });

  }




  startEditing(): void {

    if (!this.ticket) {
      return;
    }

    this.editing = true;

    this.editError = '';

    this.editTitle =
      this.ticket.title;

    this.editDescription =
      this.ticket.description;

    this.editPriority =
      this.ticket.priority;

    this.editStatus =
      this.ticket.status as TicketStatus;

  }


  cancelEditing(): void {

    this.editing = false;

    this.editError = '';

  }



  saveTicket(): void {

    if (!this.ticket) {
      return;
    }

    this.saving = true;

    this.editError = '';

    const body = {

      title: this.editTitle,

      description:
      this.editDescription,

      priority:
      this.editPriority,

      status:
      this.editStatus

    };


    this.ticketService
      .updateTicket(
        this.ticket.id,
        body
      )
      .subscribe({

        next: (response) => {

          this.ticket =
            response.data;

          this.editing = false;

          this.saving = false;

        },

        error: (error) => {

          console.error(
            'Error actualizando ticket:',
            error
          );

          this.editError =
            'No fue posible actualizar el ticket.';

          this.saving = false;

        }

      });

  }



  loadAgents(): void {

    this.userService
      .getAgents()
      .subscribe({

        next: (response) => {

          this.agents =
            response.data;

        },

        error: (error) => {

          console.error(
            'Error cargando agentes:',
            error
          );

        }

      });

  }




  assignTicket(): void {

    this.assignError = '';

    this.assignMessage = '';

    if (!this.ticket) {
      return;
    }

    if (!this.selectedAgentId) {

      this.assignError =
        'Selecciona un agente.';

      return;

    }

    this.assigning = true;

    this.ticketService
      .assignTicket(
        this.ticket.id,
        this.selectedAgentId
      )
      .subscribe({

        next: (response) => {

          this.assigning = false;

          this.assignMessage =
            response.message;

          this.ticket.assignedTo =
            response.data.assignedTo;

          this.ticket.status =
            response.data.status as TicketStatus;

          this.selectedAgentId = '';

        },

        error: (error) => {

          console.error(
            'Error asignando ticket:',
            error
          );

          this.assignError =
            'No fue posible asignar el ticket.';

          this.assigning = false;

        }

      });

  }

}
