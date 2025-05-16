import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/diary')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">This is Diary</h1>
    </div>
  );
}
