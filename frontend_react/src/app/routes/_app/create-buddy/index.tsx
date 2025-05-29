import { useCreateBuddyStep } from '@/pages/create-buddy/api/use-create-buddy-step';
import { TaaksBuddyLogo } from '@/pages/create-buddy/ui/taaks-buddy-logo';
import { Button } from '@/shared/ui/components/shadcn/button';
import { useCallback } from 'react';
import { createFileRoute } from '@tanstack/react-router';

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
    <div className="bg-background flex h-screen flex-col">
      <div className="relative flex-grow mask-t-from-80% mask-t-to-100% mask-b-from-80% mask-b-to-100%">
        <video
          src="/assets/videos/buddies.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
      </div>

      <div className="bg-background flex h-[340px] flex-shrink-0 flex-col items-center justify-center gap-6 px-3.5 py-5 text-center">
        <TaaksBuddyLogo className="h-12 w-84" />
        <p className="text-2xl font-bold">
          あなたを支える唯一無二の
          <br />
          バディを作成しよう
        </p>
        <p className="text-muted-foreground text-sm">
          TaaksBuddyはあなたを支えるAIバディーです。
          <br />
          あなたの好きなヘアスタイル、服装にカスタマイズしましょう。
        </p>
        <Button
          variant="primary"
          size="lg"
          className="mt-auto w-full max-w-md"
          onClick={handleContinue}
        >
          続行
        </Button>
      </div>
    </div>
  );
}
