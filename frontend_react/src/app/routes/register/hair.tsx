import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register/hair')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      hair
      <RegisterNavigation
        prev_path="/register/nickname"
      />
    </div>
  );
}
