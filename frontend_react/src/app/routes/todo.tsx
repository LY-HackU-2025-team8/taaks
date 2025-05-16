import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/todo')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">This is Todo</h1>
    </div>
  );
}
