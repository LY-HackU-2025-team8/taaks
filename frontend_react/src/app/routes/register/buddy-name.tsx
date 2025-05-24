import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register/buddy-name')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      buddy name
      <RegisterNavigation prev_path="/register/color" />
    </div>
  );
}
