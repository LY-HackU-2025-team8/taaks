import { Heading } from '../components/typography/heading';

/** セクションのタイトル */
export const PageSectionTitle = (props: React.ComponentProps<'h2'>) => {
  return (
    <Heading asChild>
      <h2 {...props} />
    </Heading>
  );
};
