// export { default } from './Home';
// export * from './Home';
import dynamic from 'next/dynamic';
import Error from '../components/Items/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function DynamicComponent({slug}) {
  const Article = dynamic(
    () =>
      import(`./${slug}`).catch(err => {
        return () => <Error />;
      }),
    {loading: () => <CircularProgress />},
  );
  return <Article />;
}
