import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gray h-full">
      <Outlet />
    </div>
  );
}
