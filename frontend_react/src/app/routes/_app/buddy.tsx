import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/buddy')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>バディのページ</div>;
}
