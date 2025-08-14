'use client';

import { Ticket } from '@prisma/client';
import { useActionState } from 'react';

import { DatePicker } from '@/components/date-picker';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toCurrency } from '@/utils/currency';

import { upsertTicket } from '../actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket: Ticket | null;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, formAction] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={formAction} actionState={actionState}>
      <input type="hidden" name="ticketId" defaultValue={ticket?.id} />
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="ticketTitle"
        defaultValue={
          actionState.payload?.get('ticketTitle')?.toString() ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} field="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="ticketContent"
        defaultValue={
          actionState.payload?.get('ticketContent')?.toString() ??
          ticket?.content
        }
      />
      <FieldError actionState={actionState} field="content" />
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline" className="mb-2 block">
            Deadline
          </Label>
          <DatePicker
            key={actionState.timestamp}
            id="deadline"
            name="ticketDeadline"
            defaultValue={
              actionState.payload?.get('ticketDeadline')?.toString() ??
              ticket?.deadline
            }
          />
          <FieldError actionState={actionState} field="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty" className="mb-2 block">
            Bounty ($)
          </Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            id="bounty"
            name="ticketBounty"
            defaultValue={
              actionState.payload?.get('ticketBounty')?.toString() ??
              (ticket?.bounty ? toCurrency(ticket.bounty) : '')
            }
          />
          <FieldError actionState={actionState} field="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </Form>
  );
};

export { TicketUpsertForm };
