
import React from 'react';
// Changed icon import from BookText to ClipboardList
import { ClipboardList } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Trajectory } from '../../models/trajectory';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { CopyToClipboardButton } from '../ui/CopyToClipboardButton'; // Import the button
import { MarkdownCodeBlock } from '../ui/MarkdownCodeBlock';

const markdownComponents: Components = { code: MarkdownCodeBlock };

interface TaskTrajectoryProps {
  trajectory: Trajectory;
}

// Renamed component from ResearchNotesTrajectory to TaskTrajectory
export const TaskTrajectory: React.FC<TaskTrajectoryProps> = ({ trajectory }) => {
  // Updated data extraction logic: Use step_data.task for display, step_data.spec for copying
  const { stepData, created } = trajectory;
  const taskContent = stepData?.task ?? '(No task specification for display)'; // Content for rendering
  const specContent = stepData?.spec ?? ''; // Content for copying, default to empty string
  // Set initial state to true so the collapsible is open by default
  const [isOpen, setIsOpen] = React.useState(true);

  // Format timestamp
  const formattedTime = created
    ? new Date(created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Invalid Date';

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} defaultOpen={true}> {/* Ensure defaultOpen is true */}
        <CollapsibleTrigger asChild>
          <CardHeader className="py-3 px-4 cursor-pointer hover:bg-muted/50 relative"> {/* Added relative positioning */}
            <div className="flex justify-between items-start"> {/* Changed to items-start */}
              {/* Left side: Icon and summary */}
              <div className="flex items-center space-x-3 mr-4"> {/* Added margin-right */}
                {/* Changed icon from BookText to ClipboardList */}
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                {/* Updated title from "Research Notes" to "Task Specification" */}
                <span className="font-medium">Task Specification</span> {/* Added font-medium */}
              </div>
              {/* Right side: Timestamp and Copy Button */}
              <div className="flex items-center space-x-2 absolute top-3 right-4"> {/* Positioned top-right */}
                 <CopyToClipboardButton textToCopy={specContent} />
                <div className="text-xs text-muted-foreground">
                  {formattedTime}
                </div>
                {/* Chevron logic can be kept or removed based on preference, keeping for consistency */}
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
                {/* Changed variable from notes to taskContent (for display) */}
                {taskContent}
              </ReactMarkdown>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
