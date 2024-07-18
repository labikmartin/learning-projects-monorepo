import { ReactNode } from 'react';

type ExtractProps<T> = T extends (props: infer P) => Promise<JSX.Element>
  ? P
  : never;

export async function renderAsyncComponent<C>(
  render: (component: ReactNode) => void,
  component: C,
  props?: ExtractProps<C>,
) {
  const Component = component as unknown as (props: any) => Promise<ReactNode>;
  const AsyncComponent = await Component(props);
  render(AsyncComponent as unknown as ReactNode);
}
