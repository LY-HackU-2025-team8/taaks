import { cn } from '@/shared/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';

export type InlineTextareaProps = React.ComponentProps<typeof TextareaAutosize>;

export const InlineTextarea = ({
  className,
  ...props
}: InlineTextareaProps) => {
  return (
    <TextareaAutosize
      className={cn('resize-none focus:outline-none', className)}
      {...props}
    />
  );
};
