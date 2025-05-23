import { createFileRoute, Outlet } from '@tanstack/react-router';
import { checkLogin } from '../api/check-login';

export const Route = createFileRoute('/_register')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onError: '/' }),
  component: RouteComponent,
});

// const steps: string[] = ['/nickname', '/hair', '/clothes'];

function RouteComponent() {
  // const location = useLocation();
  // const currentIndex = steps.findIndex((step) =>
  //   location.pathname.endsWith(step)
  // );

  // const next_path: string =
  //   currentIndex < steps.length - 1 ? steps[currentIndex + 1] : '/dashboard';
  // const prev_path: string =
  //   currentIndex > 0 ? steps[currentIndex - 1] : '/account';

  return (
    <div className="bg-background">
      <div className="fixed top-0 right-0 left-0 mt-[env(safe-area-inset-top)] flex items-center justify-center p-3.5">
        <img src="/TaaksBuddy.svg" className="w-42.75" />
      </div>

      <Outlet />
    </div>
  );
}
