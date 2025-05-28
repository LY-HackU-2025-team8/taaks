import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';

/** Buddyからのメッセージとして描画されるカード */
export const BuddyMessageCard = ({
  className,
  ...props
}: React.ComponentProps<typeof Card>) => {
  return (
    <Card
      data-slot="buddy-message-card"
      className={cn(
        'bg-custom text-custom-foreground relative border-none py-6 pr-40 shadow-none',
        className
      )}
      {...props}
    />
  );
};

export const BuddyMessageCardHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) => {
  return (
    <CardHeader
      data-slot="buddy-message-card-header"
      className={cn('grid-rows-1 px-6', className)}
      {...props}
    />
  );
};

export const BuddyMessageCardDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof CardDescription>) => {
  return (
    <CardDescription
      data-slot="buddy-message-card-description"
      className={cn('text-custom-foreground/70', className)}
      {...props}
    />
  );
};

export const BuddyMessageCardContent = ({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) => {
  return (
    <CardContent
      data-slot="buddy-message-card-content"
      className={cn(
        'font-line-seed my-auto flex flex-col justify-center px-6 font-bold',
        className
      )}
      {...props}
    />
  );
};
