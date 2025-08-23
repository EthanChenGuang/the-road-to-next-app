import { Ticket } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getTicket = async (ticketId: string): Promise<(Ticket & { user: { username: string } }) | null> => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return ticket;
};
