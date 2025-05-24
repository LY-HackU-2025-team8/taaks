import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/buddy')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>バディのページ</div>;
}
