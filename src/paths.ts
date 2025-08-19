export const paths = {
  home: '/',
  tickets: '/tickets',
  ticket: (ticketId: string) => `/tickets/${ticketId}`,
  newTicket: '/tickets/new',
  editTicket: (ticketId: string) => `/tickets/${ticketId}/edit`,
  signIn: '/sign-in',
  signUp: '/sign-up',
  passwordForgot: '/password-forgot',
  accountProfile: '/account/profile',
  accountPassword: '/account/password',
};
