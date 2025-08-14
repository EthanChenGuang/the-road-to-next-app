import { Ticket, TicketStatus } from '@prisma/client';
import { LucideTrash } from 'lucide-react';
import { toast } from 'sonner';

import { useConfirmDialog } from '@/components/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { deleteTicket } from '../actions/delete-ticket';
import { updateTicketStatus } from '../actions/update-ticket-status';
import { TICKET_STATUS_LABELS } from '../constants';

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  // const deleteButton = (
  //   <ConfirmDialog
  //     action={deleteTicket.bind(null, ticket.id)}
  //     trigger={
  //       <DropdownMenuItem>
  //         <LucideTrash className="h-4 w-4" />
  //         <span>Delete</span>
  //       </DropdownMenuItem>
  //     }
  //   />
  // );

  const handleUpdateTicketStatus = async (status: TicketStatus) => {
    const promise = updateTicketStatus(ticket.id, status);

    toast.promise(promise, {
      loading: 'Updating ticket status...',
    });

    const result = await promise;

    if (result.status === 'ERROR') {
      toast.error(result.message);
    }
    if (result.status === 'SUCCESS') {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={(value) => handleUpdateTicketStatus(value as TicketStatus)}
    >
      {Object.keys(TICKET_STATUS_LABELS).map((status) => (
        <DropdownMenuRadioItem key={status} value={status}>
          {TICKET_STATUS_LABELS[status as keyof typeof TICKET_STATUS_LABELS]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right" align="end">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>

      {deleteDialog}
    </>
  );
};

export { TicketMoreMenu };
