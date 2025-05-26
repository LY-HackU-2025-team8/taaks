import { cn } from '@/shared/lib/utils';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 font-bold font-button whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        'primary-inverted':
          'bg-primary-foreground text-primary hover:bg-primary-foreground/90',
        destructive:
          'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 text-white',
        outline:
          'border border-primary bg-background hover:bg-accent hover:text-accent-foreground',
        custom:
          'border border-primary-foreground bg-primary-foreground/30 text-custom-foreground hover:bg-primary-foreground/50 dark:bg-primary-foreground/10 dark:hover:bg-primary-foreground/20',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-14 rounded-full px-6',
        sm: 'h-8 gap-1.5 rounded-full px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-16 rounded-xl px-7',
        'icon-sm': "h-6 w-10 rounded-full [&_svg:not([class*='size-'])]:size-4",
        icon: "size-10 rounded-full [&_svg:not([class*='size-'])]:size-7",
        'icon-lg': "size-16 rounded-xl [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
