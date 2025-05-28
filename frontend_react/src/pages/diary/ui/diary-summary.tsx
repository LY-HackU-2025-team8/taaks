import { DATE_DISPLAY_FORMAT } from '@/shared/constants';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';

type DiarySummaryProps = ComponentPropsWithoutChildren<typeof PageSection> & {
  /** Summaryを表示する日付 */
  date: Date;
};

export const DiarySummary = ({ date, ...props }: DiarySummaryProps) => {
  return (
    <PageSection {...props}>
      <PageSectionTitle>
        {format(date, DATE_DISPLAY_FORMAT)}のサマリー
      </PageSectionTitle>
    </PageSection>
  );
};
