import { Heading } from '../components/typography/heading';

export const PageTitle = (props: React.ComponentProps<'h1'>) => {
  return (
    <Heading className="text-2xl" asChild>
      <h1 {...props} />
    </Heading>
  );
};
