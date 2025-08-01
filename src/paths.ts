export const paths = {
  home: '/',
  tickets: '/tickets',
  ticket: (ticketId: string) => `/tickets/${ticketId}`,
  newTicket: '/tickets/new',
};
