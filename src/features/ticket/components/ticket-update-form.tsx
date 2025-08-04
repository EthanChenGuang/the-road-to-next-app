'use client';

import { Ticket } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { updateTicket } from '../actions/update-ticket';

type TicketUpdateFormProps = {
  ticket: Ticket;
};

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  return (
    <form action={updateTicket} className="flex flex-col gap-y-2">
      <input type="hidden" name="ticketId" defaultValue={ticket.id} />
      <Label htmlFor="title">
        Title<sup>*</sup>
      </Label>
      <Input
        type="text"
        id="title"
        name="ticketTitle"
        defaultValue={ticket.title}
      />
      <Label htmlFor="content">
        Content<sup>*</sup>
      </Label>
      <Textarea
        id="content"
        name="ticketContent"
        defaultValue={ticket.content}
      />
      <Button type="submit">Update</Button>
    </form>
  );
};

export { TicketUpdateForm };
