'use client';

import { format } from 'date-fns';
import { LucideCalendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [date, setDate] = useState<Date>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const [open, setOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setOpen(false);
    }
  };

  return (
    <>
      <input
        type="hidden"
        id={id}
        name={name}
        value={date ? format(date, 'yyyy-MM-dd') : ''}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal"
          >
            <CalendarIcon />
            {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            required={true}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export { DatePicker };
