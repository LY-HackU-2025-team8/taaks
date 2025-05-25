import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { ProgressBar } from '@/features/create-buddy/ui/progress-bar';
import { registerSteps } from '@/features/create-buddy/constants/registerSteps';

export const Route = createFileRoute('/register/_with-progress')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const progress = registerSteps.findIndex((step) => currentPath.includes(step)) + 1; 
  return (
    <>
      <ProgressBar className="mt-4 h-12 w-full" progress={progress} />
      <Outlet />
    </>
  );
}
