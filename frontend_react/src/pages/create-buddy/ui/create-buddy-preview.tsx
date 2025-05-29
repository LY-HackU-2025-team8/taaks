import { CUSTOM_COLORS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';
import { cva, type VariantProps } from 'class-variance-authority';

const createBuddyPreviewVariants = cva('absolute transition-all', {
  variants: {
    size: {
      medium: '-top-5 -left-1 size-81',
      'large-top': '-top-1 -left-8 size-95',
      'large-bottom': '-top-16 -left-8 size-95',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type BuddyPreviewProps = {
  colorId?: number;
} & VariantProps<typeof createBuddyPreviewVariants> &
  React.ComponentProps<typeof RiveBuddy>;

export const CreateBuddyPreview = ({
  colorId = 0,
  size,
  className,
  ...props
}: BuddyPreviewProps) => {
  return (
    <div
      className={cn(
        'bg-custom relative mx-auto mb-7 size-70 overflow-hidden rounded-[105px]',
        CUSTOM_COLORS.get(colorId),
        className
      )}
    >
      <RiveBuddy
        {...props}
        className={cn(createBuddyPreviewVariants({ size }))}
      />
    </div>
  );
};
