import { RiveBuddy } from '@/shared/ui/components/custom/rive-buddy';

const sizeOptions = {
  medium: 'absolute -top-5 -left-1 size-81',
  'large-top': 'absolute -top-1 -left-8 size-95',
  'large-bottom': 'absolute -bottom-6 -left-8 size-95',
};

type BuddyPreviewProps = {
  hairId?: number;
  clothesId?: number;
  motionId?: number;
  faceId?: number;
  size?: keyof typeof sizeOptions;
  color?: string;
};

export const BuddyPreview = ({
  hairId = 1,
  clothesId = 1,
  motionId = 1,
  faceId = 1,
  size = 'medium',
  color = '#EAEBE7',
}: BuddyPreviewProps) => {
  return (
    <div className="flex items-center justify-center p-3.5">
      <div
        className="relative size-71 overflow-hidden rounded-[105px]"
        style={{ background: color }}
      >
        <RiveBuddy
          hairId={hairId}
          clothesId={clothesId}
          motionId={motionId}
          faceId={faceId}
          className={sizeOptions[size ?? 'medium']}
        />
      </div>
    </div>
  );
};
