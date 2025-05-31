import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';
import { type PropsWithChildren } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassNameValue } from 'tailwind-merge';

const buddyMessageCardVariant = cva('', {
  variants: {
    variant: {
      'primary-invert': 'bg-primary-foreground text-primary',
      custom: 'bg-custom text-custom-foreground',
    },
  },
  defaultVariants: {
    variant: 'custom',
  },
});

/** Buddyからのメッセージとして描画されるカード */
export const BuddyMessageCard = ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof Card> &
  VariantProps<typeof buddyMessageCardVariant>) => {
  return (
    <Card
      data-slot="buddy-message-card"
      className={cn(
        'relative min-h-40 border-none py-6 pr-40 shadow-none',
        buddyMessageCardVariant({ variant, className })
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
      className={cn('font-line-seed font-bold text-current/70', className)}
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

export const BuddyMessageCardRightElement = ({
  children,
  className,
}: PropsWithChildren<{ className?: ClassNameValue }>) => {
  return (
    <Slot
      className={cn(
        'absolute top-0 -right-8 bottom-0 my-auto size-60',
        className
      )}
    >
      {children}
    </Slot>
  );
};
