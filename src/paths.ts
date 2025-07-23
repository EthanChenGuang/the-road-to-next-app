export const paths = {
  home: '/',
  tickets: '/tickets',
  ticket: (ticketId: number) => `/tickets/${ticketId}`,
  newTicket: '/tickets/new',
};
