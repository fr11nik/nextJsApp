import Link from 'next/Link';
import Button from '@material-ui/core/Button';

export default About => {
  return (
    <div>
      <Link href='/'>
        <Button variant='contained' color='primary'>
          Home
        </Button>
      </Link>
    </div>
  );
};
