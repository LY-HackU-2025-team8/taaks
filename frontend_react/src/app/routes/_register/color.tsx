import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_register/color')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Color
      <RegisterNavigation
        next_path="/buddy-name"
        prev_path="/clothes"
        disabledNext={false}
      />
    </div>
  );
}
