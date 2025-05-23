import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_register/hair')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      hair
      <RegisterNavigation
        next_path="/clothes"
        prev_path="/nickname"
        disabledNext={false}
      />
    </div>
  );
}
