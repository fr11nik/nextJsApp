import dynamic from 'next/dynamic';
import Error from '../components/Items/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MenuLayout from '../components/Layouts/MenuLayout';

export default function DynamicComponent(props) {
  const Article = dynamic(
    () =>
      import(`./${props.slug}`).catch(err => {
        return () => <Error />;
      }),
    {loading: () => <CircularProgress />},
  );
    return (<Article {...props.personalData} />);
  }
 
