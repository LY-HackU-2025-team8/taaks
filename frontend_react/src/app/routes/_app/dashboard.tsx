import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard')({
  component: App,
});

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold">This is DashBoard</h1>
    </div>
  );
}
