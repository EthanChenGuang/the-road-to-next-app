'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { useConfirmDialog } from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { revertComment } from '../actions/revert-comment';

type CommentHistoryEntry = {
  id: string;
  version: number;
  content: string;
  editedAt: Date;
  changeType: string;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
};

type CommentHistoryProps = {
  commentId: string;
  ticketId: string;
  currentContent: string;
  history: CommentHistoryEntry[];
};

type RevertButtonProps = {
  entry: CommentHistoryEntry & { isCurrent?: boolean };
  commentId: string;
  ticketId: string;
};

const RevertButton = ({ entry, commentId, ticketId }: RevertButtonProps) => {
  const [dialogTrigger, dialog] = useConfirmDialog({
    title: 'Confirm Revert',
    description: (data) => {
      const entryData = data as CommentHistoryEntry & { isCurrent?: boolean };
      return (
        <>
          Are you sure you want to revert to version {entryData.version}? This
          will replace the current comment content and cannot be undone.
          <br />
          <br />
          <strong>Previous content:</strong>
          <br />
          <span className="inline-block mt-2 p-2 bg-muted rounded text-sm whitespace-pre-wrap">
            {entryData.content.slice(0, 200)}
            {entryData.content.length > 200 && '...'}
          </span>
        </>
      );
    },
    action: revertComment,
    actionData: entry,
    formFields: {
      commentId,
      ticketId,
      version: entry.version,
    },
    actionButtonProps: {
      className:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    trigger: (
      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
        Revert to this version
      </Button>
    ),
  });

  return (
    <div className="mt-3 pt-2 border-t">
      {dialogTrigger}
      {dialog}
    </div>
  );
};

const CommentHistory = ({
  commentId,
  ticketId,
  currentContent,
  history,
}: CommentHistoryProps) => {
  const [selectedVersions, setSelectedVersions] = useState<
    [number, number] | null
  >(null);

  const allVersions = [
    {
      id: 'current',
      version: 0,
      content: currentContent,
      editedAt: new Date(),
      changeType: 'CURRENT',
      user: null,
      isCurrent: true,
    },
    ...history.map((h) => ({ ...h, isCurrent: false })),
  ];

  const handleVersionSelect = (version: number) => {
    if (!selectedVersions) {
      setSelectedVersions([version, version]);
    } else if (selectedVersions[0] === version) {
      setSelectedVersions(null);
    } else {
      const [first] = selectedVersions;
      setSelectedVersions([Math.min(first, version), Math.max(first, version)]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Edit History</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click versions to compare • Click &quot;Revert&quot; to restore a
          previous version
        </p>
      </div>

      <div className="space-y-3">
        {allVersions.map((entry) => {
          const isSelected =
            selectedVersions &&
            entry.version >= selectedVersions[0] &&
            entry.version <= selectedVersions[1];

          return (
            <Card
              key={entry.version}
              className={`p-4 cursor-pointer transition-colors ${
                isSelected
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => handleVersionSelect(entry.version)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={entry.isCurrent ? 'default' : 'secondary'}>
                    {entry.isCurrent ? 'Current' : `Version ${entry.version}`}
                  </Badge>
                  {entry.changeType === 'REVERT' && (
                    <Badge variant="outline">Reverted</Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {/* {entry.editedAt.toLocaleString()} */}
                    {format(entry.editedAt, 'yyyy-MM-dd HH:mm')}
                  </p>
                  {entry.user && (
                    <p className="text-xs text-muted-foreground">
                      by {entry.user.username}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-base pl-4">
                  <div
                    className={`line-clamp-3 font-medium ${
                      entry.isCurrent
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {entry.content.slice(0, 150)}
                    {entry.content.length > 150 && '...'}
                  </div>
                </div>
              </div>

              {!entry.isCurrent && (
                <RevertButton
                  entry={entry}
                  commentId={commentId}
                  ticketId={ticketId}
                />
              )}
            </Card>
          );
        })}
      </div>

      {selectedVersions && selectedVersions[0] !== selectedVersions[1] && (
        <Card className="p-4 bg-muted/30">
          <h4 className="font-medium mb-2">Comparing Versions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[selectedVersions[1], selectedVersions[0]].map((version, idx) => {
              const entry = allVersions.find((v) => v.version === version);
              return (
                <div key={version} className="space-y-2">
                  <h5 className="text-sm font-medium">
                    {idx === 0 ? 'Older' : 'Newer'} Version (
                    {entry?.isCurrent ? 'Current' : version})
                  </h5>
                  <div className="text-sm bg-background p-3 rounded border whitespace-pre-wrap">
                    {entry?.content}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export { CommentHistory };
