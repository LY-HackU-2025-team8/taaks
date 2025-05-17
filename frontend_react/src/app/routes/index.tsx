import { SmallCard } from '@/shared/ui/components/custom/small-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold">This is DashBoard</h1>
      <div className="flex gap-4 bg-gray-300 p-4">
        <SmallCard
          title="ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト"
          deadline="15:30"
        />
        <SmallCard
          title="dummy text dummy text dummy text dummy text dummy text"
          deadline="46:49"
        />
      </div>
    </div>
  );
}
