import { ChevronLeftIcon } from '@/shared/ui/components/icons/chevron-left';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';

type CreateBuddyNavigationProps = {
  submitDisabled?: boolean;
  prevStep?: { pathname: string };
} & React.ComponentProps<'nav'>;

export const CreateBuddyNavigation = ({
  submitDisabled = false,
  ...props
}: CreateBuddyNavigationProps) => {
  return (
    <nav {...props}>
      <ul className="flex h-16 items-center gap-2">
        <li className="contents">
          <Button size="icon-lg" asChild>
            <BackButton>
              <ChevronLeftIcon />
            </BackButton>
          </Button>
        </li>
        <li className="contents">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={submitDisabled}
          >
            次へ
          </Button>
        </li>
      </ul>
    </nav>
  );
};
