'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { createTicket } from '../actions/create-ticket';

const TicketCreateForm = () => {
  const [error, setError] = useState<string>('');

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Client-side validation
    if (!title?.trim() || !content?.trim()) {
      setError('Title and content are both required');
      return;
    }

    setError('');
    await createTicket(formData);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true,
        });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true,
        });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-y-2">
      {error && (
        <div className="text-sm text-red-500 border border-red-500 rounded p-2 mb-4">
          {error}
        </div>
      )}
      <Label htmlFor="title">Title*</Label>
      <Input
        type="text"
        id="title"
        name="title"
        onKeyDown={handleTitleKeyDown}
      />
      <Label htmlFor="content">Content*</Label>
      <Textarea id="content" name="content" onKeyDown={handleTextareaKeyDown} />
      <Button type="submit">Create Ticket</Button>
    </form>
  );
};

export { TicketCreateForm };
