import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_register/clothes')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      clothes
      <RegisterNavigation
        next_path="/color"
        prev_path="/hair"
        disabledNext={false}
      />
    </div>
  );
}
