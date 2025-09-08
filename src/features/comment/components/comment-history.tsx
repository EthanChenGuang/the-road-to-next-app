'use client';

import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  currentContent: string;
  history: CommentHistoryEntry[];
  onRevert: (version: number) => void;
};

const CommentHistory = ({ 
  currentContent, 
  history, 
  onRevert 
}: CommentHistoryProps) => {
  const [selectedVersions, setSelectedVersions] = useState<[number, number] | null>(null);

  const allVersions = [
    {
      version: 0,
      content: currentContent,
      editedAt: new Date(),
      changeType: 'CURRENT',
      user: null,
      isCurrent: true,
    },
    ...history.map(h => ({ ...h, isCurrent: false }))
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

  const getDiffPreview = (oldContent: string, newContent: string) => {
    if (oldContent === newContent) {
      return <span className="text-muted-foreground">No changes</span>;
    }

    const oldWords = oldContent.split(/(\s+)/);
    const newWords = newContent.split(/(\s+)/);
    
    // Simple diff visualization - show first few changed words
    const preview = [];
    
    for (let i = 0; i < Math.min(oldWords.length, newWords.length, 10); i++) {
      if (oldWords[i] !== newWords[i]) {
        preview.push(
          <span key={i} className="bg-destructive/20 text-destructive px-1 rounded">
            {oldWords[i]}
          </span>,
          <span key={`${i}-new`} className="bg-green-500/20 text-green-700 px-1 rounded ml-1">
            {newWords[i]}
          </span>
        );
        break;
      }
    }
    
    if (preview.length === 0) {
      return <span className="text-muted-foreground">Content modified</span>;
    }
    
    return <div className="flex flex-wrap gap-1">{preview}</div>;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Edit History</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click versions to compare • Click &quot;Revert&quot; to restore a previous version
        </p>
      </div>

      <div className="space-y-3">
        {allVersions.map((entry, index) => {
          const isSelected = selectedVersions && 
            (entry.version >= selectedVersions[0] && entry.version <= selectedVersions[1]);
          const prevEntry = allVersions[index + 1];
          
          return (
            <Card 
              key={entry.version} 
              className={`p-4 cursor-pointer transition-colors ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
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
                    {entry.editedAt.toLocaleString()}
                  </p>
                  {entry.user && (
                    <p className="text-xs text-muted-foreground">
                      by {entry.user.username}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="line-clamp-3 text-muted-foreground">
                    {entry.content.slice(0, 150)}
                    {entry.content.length > 150 && '...'}
                  </div>
                </div>
                
                {prevEntry && (
                  <div className="text-xs">
                    <span className="text-muted-foreground">Changes from previous: </span>
                    {getDiffPreview(prevEntry.content, entry.content)}
                  </div>
                )}
              </div>

              {!entry.isCurrent && (
                <div className="mt-3 pt-2 border-t">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Revert to this version
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Revert</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to revert to version {entry.version}? 
                          This will replace the current comment content and cannot be undone.
                          <br />
                          <br />
                          <strong>Previous content:</strong>
                          <div className="mt-2 p-2 bg-muted rounded text-sm whitespace-pre-wrap">
                            {entry.content.slice(0, 200)}
                            {entry.content.length > 200 && '...'}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onRevert(entry.version)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Revert Comment
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
              const entry = allVersions.find(v => v.version === version);
              return (
                <div key={version} className="space-y-2">
                  <h5 className="text-sm font-medium">
                    {idx === 0 ? 'Older' : 'Newer'} Version ({entry?.isCurrent ? 'Current' : version})
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