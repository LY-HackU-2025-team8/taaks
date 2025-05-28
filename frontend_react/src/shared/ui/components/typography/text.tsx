import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva('font-body', {
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
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    font: {
      default: 'font-body',
      lineSeed: 'font-line-seed',
      notoSans: 'font-noto-sans',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    font: 'default',
  },
});

/** テキストのための汎用コンポーネント */
export type TextProps = React.ComponentProps<'p'> &
  VariantProps<typeof textVariants> & { asChild?: boolean };
export const Text = ({ className, variant, asChild, ...props }: TextProps) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      data-slot="text"
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
};
