import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register/color')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Color
      <RegisterNavigation prev_path="/register/clothes" />
    </div>
  );
}
