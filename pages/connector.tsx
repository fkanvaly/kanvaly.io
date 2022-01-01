import { useMDXComponent } from 'next-contentlayer/hooks';
import components from 'components/MDXComponents';
import ConnectorLayout from 'layouts/connector';
import { allOtherPages } from '.contentlayer/data';
import type { OtherPage } from '.contentlayer/types';

export default function Connector({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);

  return (
    <ConnectorLayout>
      <Component components={components as any} />
    </ConnectorLayout>
  );
}

export async function getStaticProps() {
  const uses = allOtherPages.find((page) => page.slug === 'connector')!;

  return { props: uses };
}
