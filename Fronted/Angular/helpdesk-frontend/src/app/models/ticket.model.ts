export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export type TicketPriority =
  | 'low'
  | 'medium'
  | 'high';

export interface Ticket {

  id: string;

  title: string;

  description: string;

  priority: TicketPriority;

  status: TicketStatus;

  createdBy: string;

  assignedTo: string | null;

  createdAt: string;

  updatedAt: string;

}

export interface TicketResponse {

  data: Ticket[];

  meta: {

    total: number;

    page: number;

    limit: number;

    totalPages: number;

  };

}