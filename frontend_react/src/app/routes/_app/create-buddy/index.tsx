import { useCreateBuddyStep } from '@/pages/create-buddy/api/use-create-buddy-step';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/shared/ui/components/shadcn/button';
import { TaaksBuddyLogo } from '@/pages/create-buddy/ui/taaks-buddy-logo';
import { useCallback } from 'react';
export const Route = createFileRoute('/_app/create-buddy/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep } = useCreateBuddyStep();
  const navigate = Route.useNavigate();

  const handleContinue = useCallback(() => {
    navigate({ to: nextStep.pathname });
  }, [navigate, nextStep.pathname]);

  return (
    <div className='flex flex-col relative h-screen'>
      <video
        src="/assets/videos/buddies.mp4"
        autoPlay
        loop
        muted
        className='absolute -z-10 top-0 left-0 mask-b-from-80% mask-b-to-100% mask-t-from-80% mask-t-to-100%'
      />

      <div className="mt-auto mb-[env(safe-area-inset-bottom)]">
        <div
          className="flex bg-background flex-col text-center items-center justify-center gap-6 px-3.5 py-5"
        >
          <TaaksBuddyLogo className="w-84 h-12" />
          <p className='text-2xl font-bold'>
            あなたを支える唯一無二の
            <br />
            バディを作成しよう
          </p>
          <p className='text-sm text-muted-foreground'>
            TaaksBuddyはあなたを支えるAIバディーです。
            <br />
            あなたの好きなヘアスタイル、服装にカスタマイズしましょう。
          </p>
          <Button
            variant="primary"
            size="lg"
            className="w-full max-w-md"
            onClick={handleContinue}
          >
            続行
          </Button>
        </div>
      </div>
    </div>
  );
}
