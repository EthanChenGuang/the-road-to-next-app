export type Ticket = {
  id: number;
  title: string;
  content: string;
  status: TicketStatus;
};

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';
