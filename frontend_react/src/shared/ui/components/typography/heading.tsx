import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva('font-heading font-bold', {
  variants: {
    variant: {
      default: '',
      primary: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      custom: 'text-custom-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type TextProps = React.ComponentProps<'p'> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
  };
export const Heading = ({
  className,
  variant,
  asChild,
  ...props
}: TextProps) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ variant }), className)}
      {...props}
    />
  );
};
