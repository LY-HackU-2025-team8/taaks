import { Dashboard } from '@/pages/dashboard/ui/dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard')({
  component: App,
});

function App() {
  return <Dashboard />;
}
