import { CounterButton, NewTabLink } from 'ui';
import { toto } from './toto';

export const metadata = {
  title: 'Store | Kitchen Sink',
};

const Store: () => JSX.Element = () => {
  toto();
  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink Hello</span>
      </h1>
      <CounterButton />
      <p className="description">
        Built With{' '}
        <NewTabLink href="https://turbo.build/repo">Turborepo</NewTabLink> +{' '}
        <NewTabLink href="https://nextjs.org/">Next.js</NewTabLink>
      </p>
    </div>
  );
};

export default Store;
