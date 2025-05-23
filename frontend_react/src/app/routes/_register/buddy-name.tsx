import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_register/buddy-name')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      buddy name
      <RegisterNavigation
        next_path="/dashboard"
        prev_path="/color"
        disabledNext={false}
      />
    </div>
  );
}
