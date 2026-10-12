
import React from 'react';
import { BookText } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Trajectory } from '../../models/trajectory';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { CopyToClipboardButton } from '../ui/CopyToClipboardButton'; // Import the button
import { MarkdownCodeBlock } from '../ui/MarkdownCodeBlock';

const markdownComponents: Components = { code: MarkdownCodeBlock };

interface ResearchNotesTrajectoryProps {
  trajectory: Trajectory;
}

export const ResearchNotesTrajectory: React.FC<ResearchNotesTrajectoryProps> = ({ trajectory }) => {
  const { toolParameters, created } = trajectory;
  const notes = toolParameters?.notes ?? '(No research notes)';
  // Set initial state to true so the collapsible is open by default
  const [isOpen, setIsOpen] = React.useState(true);

  // Format timestamp
  const formattedTime = created
    ? new Date(created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Invalid Date';

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="py-3 px-4 cursor-pointer hover:bg-muted/50">
            <div className="flex justify-between items-center">
              {/* Left side: Icon and summary */}
              <div className="flex items-center space-x-3">
                <BookText className="h-4 w-4 text-muted-foreground" />
                {/* Use static title */}
                <span>Research Notes</span>
              </div>
              {/* Right side: Timestamp and Copy Button */}
              <div className="flex items-center space-x-2">
                {/* Add the CopyToClipboardButton here */}
                <CopyToClipboardButton textToCopy={"# Research Notes\n\n" + notes} />
                <div className="text-xs text-muted-foreground">
                  {formattedTime}
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-3 px-4">
            {/* Wrap ReactMarkdown with a div and apply classes here */}
            <div className="prose prose-sm dark:prose-invert max-w-none break-words">
              <ReactMarkdown
                // className prop removed from ReactMarkdown component itself
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {notes}
              </ReactMarkdown>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
