import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/diary/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="h-full"></div>;
}
