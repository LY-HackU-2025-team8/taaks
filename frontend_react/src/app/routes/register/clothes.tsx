import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register/clothes')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      clothes
      <RegisterNavigation prev_path="/register/hair" />
    </div>
  );
}
