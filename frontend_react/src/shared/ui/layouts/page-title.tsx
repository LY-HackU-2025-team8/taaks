import { Heading } from '../components/typography/heading';

/** ページのタイトル */
export const PageTitle = (props: React.ComponentProps<'h1'>) => {
  return (
    <Heading className="mr-auto text-2xl" asChild>
      <h1 {...props} />
    </Heading>
  );
};
