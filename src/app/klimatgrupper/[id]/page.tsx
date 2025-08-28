import GroupDetails from '@/components/groups/GroupDetails';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants';

interface GroupPageProps {
  params: { id: string };
}

export default function GroupPage({ params }: GroupPageProps) {
  return (
    <PageLayout
      showBackButton
      customBackRoute={ROUTES.GROUPS}
      breadcrumbs={[
        { label: 'Klimatgrupper', href: ROUTES.GROUPS },
        { label: `Grupp ${params.id}` }
      ]}
    >
      <GroupDetails groupId={params.id} />
    </PageLayout>
  );
}