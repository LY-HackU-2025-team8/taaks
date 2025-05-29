import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { Link } from '@tanstack/react-router';

type ErrorPageProps = {
  error?: Error;
  reset?: () => void;
};

export const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <PageTitle>{error?.message || '不明なエラー'} </PageTitle>
        </PageTitleContainer>
      </PageHeader>
      <PageMain>
        <PageSection className="flex flex-1 flex-col">
          <PageSectionTitle>エラーの詳細</PageSectionTitle>
          <pre className="overflow-x-auto">
            {error?.stack || 'エラーのスタックトレースがありません。'}
          </pre>
          <div className="mt-auto flex gap-3.5">
            <Button className="flex-1" size="lg" variant="secondary" asChild>
              <Link to="/">トップページに戻る</Link>
            </Button>
            <Button
              className="flex-1"
              size="lg"
              onClick={() => {
                reset?.();
              }}
            >
              エラーをリセットする
            </Button>
          </div>
        </PageSection>
      </PageMain>
    </>
  );
};
